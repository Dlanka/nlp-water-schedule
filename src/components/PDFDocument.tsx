import { Download, Printer } from "lucide-react";
import Document from "./document";
import Table from "./Table";
import { useAppContext } from "../Context";
import { getMonthName, getMonthRange } from "../helper";

const PDFDocument = () => {
  const { selectedDate, handlePrint, handleCapture } = useAppContext();

  console.log(selectedDate);

  const date = new Date(selectedDate);
  const y = date.getFullYear();
  const m = date.getMonth();

  const days = getMonthRange(y, m);

  return (
    <Document>
      <div className="text-center pt-2 pb-8 text-xl font-normal ">
        {y} {getMonthName(m, "si-LK")} {new Date(days.start).getDate()} සිට{" "}
        {new Date(days.end).getDate()} දක්වා ජලය බෙදාදීමෙ කාලසටහන
      </div>
      <Table />

      <div className="absolute z-50 top-0 -right-12 flex flex-col print:hidden gap-2">
        <button
          onClick={handlePrint}
          title="Save as a PDF"
          className="size-10 text-blue-700 bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center rounded-md cursor-pointer"
        >
          <Printer />
        </button>
        <button
          onClick={handleCapture}
          title="Save as a Image"
          className="size-10 text-blue-700 bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center rounded-md cursor-pointer"
        >
          <Download />
        </button>
      </div>
    </Document>
  );
};

export default PDFDocument;
