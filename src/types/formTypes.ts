export interface SelectObj {
  label: string;
  value: string;
}

export interface FormValues {
  year: string | number;
  month: number | string;
  time: string;
  memberDepth: number | string;
  zoneDepth: "0" | "1";
}

export interface ScheduleValue {
  name: number | string;
  zone: number | string;
  id: number | string;
  start: string;
  end: string;
  duration: string;
  zoneOrder?: number;
}
