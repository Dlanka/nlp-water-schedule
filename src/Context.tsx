import React from "react";
import type { Member } from "./types/memberType";
import data from "./data.json";
import type { FormValues, ScheduleValue, SelectObj } from "./types/formTypes";
import {
  generateSchedule,
  getMonthName,
  memberShuffle,
  toMinute,
  zoneShuffle,
} from "./helper";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";

interface ZoneObject {
  zone: string;
  items: ScheduleValue[];
}

interface State {
  members?: Member[];
  scheduleData?: ZoneObject[];
  times?: SelectObj[];
  currentMonth?: number;
  selectedDate?: any;
  months?: SelectObj[];
  contentRef?: any;
  initialFormValues?: FormValues;
  onValueSubmit?: (values: FormValues) => void;
  onGenerateSchedule?: () => void;
  onHtmlToPDF?: () => void;
  handleCapture?: () => void;
}

const date = new Date();
const currentMonth = date.getMonth() + 1;

const initialFormValues: FormValues = {
  year: date.getFullYear(),
  month: currentMonth,
  time: "06:00",
  memberDepth: currentMonth,
  zoneDepth: "0",
};

const times: SelectObj[] = [
  { value: "00:00", label: "00:00" },
  { value: "01:00", label: "01:00" },
  { value: "02:00", label: "02:00" },
  { value: "03:00", label: "03:00" },
  { value: "04:00", label: "04:00" },
  { value: "05:00", label: "05:00" },
  { value: "06:00", label: "06:00" },
];

const months: SelectObj[] = [
  { value: "1", label: getMonthName(0) },
  { value: "2", label: getMonthName(1) },
  { value: "3", label: getMonthName(2) },
  { value: "4", label: getMonthName(3) },
  { value: "5", label: getMonthName(4) },
  { value: "6", label: getMonthName(5) },
  { value: "7", label: getMonthName(6) },
  { value: "8", label: getMonthName(7) },
  { value: "9", label: getMonthName(8) },
  { value: "10", label: getMonthName(9) },
  { value: "11", label: getMonthName(10) },
  { value: "12", label: getMonthName(11) },
];

const AppContext = React.createContext<State>({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => React.useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const contentRef = React.useRef<any>(null);
  const [formValues, setFormValues] =
    React.useState<FormValues>(initialFormValues);
  const [scheduleData, setScheduleData] = React.useState<ZoneObject[] | []>([]);

  const selectedDate = React.useMemo(() => {
    const { year, month } = formValues;

    const d = new Date();
    d.setFullYear(Number(year), Number(month) - 1, 1);
    return d;
  }, [formValues]);

  const fileName = React.useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = selectedDate.getMonth();

    return `${y}-${getMonthName(m, "si-LK")}`;
  }, [selectedDate]);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    copyShadowRoots: false,
    documentTitle: fileName,
  });

  const handleCapture = async () => {
    const element = contentRef.current;

    if (!element) return;

    // Capture the div
    const canvas = await html2canvas(element, {
      scale: 3, // Higher = better quality
      useCORS: true, // if your images are from external URLs
      backgroundColor: "#ffffff", // solid background (helps avoid transparency)
    });

    // Convert canvas to JPEG data URL
    const image = canvas.toDataURL("image/jpeg", 0.95); // 0.95 = quality

    // Trigger download
    const link = document.createElement("a");
    link.href = image;
    link.download = `${fileName}.jpg`;
    link.click();
  };

  const onGenerateSchedule = React.useCallback(() => {
    const { memberDepth, time, zoneDepth } = formValues;
    const members = data.members || [];

    const zones = memberShuffle(members, Number(memberDepth));

    const m = zoneShuffle(zones, zoneDepth);

    const values: ScheduleValue[] = generateSchedule(time, m);

    const grouped: Record<string, ScheduleValue[]> = values.reduce(
      (acc: any, item: any) => {
        if (!acc[item.zone]) acc[item.zone] = [];
        acc[item.zone].push(item);
        return acc;
      },
      {} as Record<string, ScheduleValue[]>
    );

    const zoneName = (z: string) => (z === "A" ? "A කලාපය" : "B කලාපය");

    const result = Object.entries(grouped)
      .sort(([a, itemsA], [b, itemsB]) => {
        const firstA = new Date(`1970-01-01T${itemsA[0].start}:00`);
        const firstB = new Date(`1970-01-01T${itemsB[0].start}:00`);
        return firstA.getTime() - firstB.getTime();
      })
      .map(([zone, items]) => ({ zone: zoneName(zone), items }));

    setScheduleData(result);
  }, [formValues]);

  React.useEffect(() => {
    onGenerateSchedule();
  }, [formValues, onGenerateSchedule]);

  const onValueSubmit = React.useCallback((values: FormValues) => {
    setFormValues(values);
  }, []);

  const values = {
    scheduleData,
    members: data.members,
    times,
    currentMonth,
    months,
    initialFormValues,
    selectedDate,
    contentRef,
    onValueSubmit,
    onGenerateSchedule,
    onHtmlToPDF: handlePrint,
    handleCapture,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
