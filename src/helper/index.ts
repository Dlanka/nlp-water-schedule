import type { Member } from "../types/memberType";

export function generateSchedule(startTime = "06:00", members: Member[]) {
  const parse = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const format = (mins: number) => {
    const h = Math.floor(mins / 60) % 24;
    const m = Math.floor(mins % 60);
    // const s = Math.round((mins - Math.floor(mins)) * 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const totalMinutes = 24 * 60;
  const slot = totalMinutes / members.length;
  const start = parse(startTime);
  const result = [];

  for (let i = 0; i < members.length; i++) {
    const s = start + i * slot;
    const e = start + (i + 1) * slot;
    result.push({
      name: members[i]?.name,
      zone: members[i].zone,
      id: members[i].id,
      start: format(s),
      end: format(e),
      duration: `${Math.floor(slot)}m`,
    });
  }

  return result;
}

export function rotateArray<T>(arr: T[], month: number): T[] {
  const offset = month % arr.length;
  return arr.slice(offset).concat(arr.slice(0, offset));
}

export function memberShuffle(members: Member[], depth: number) {
  // const date = new Date();
  // date.setMonth(month);

  // const currentMonth = date.getMonth() + 1; // 1 - 12

  const zoneA = members.filter((m) => m.zone === "A");
  const zoneB = members.filter((m) => m.zone === "B");

  const shuffledA = rotateArray(zoneA, depth);
  const shuffledB = rotateArray(zoneB, depth);

  return { zoneA: shuffledA, zoneB: shuffledB };
}

export function zoneShuffle(
  teams: { zoneA: Member[]; zoneB: Member[] },
  teamOrder: "0" | "1"
) {
  if (teamOrder === "0") {
    return [...teams.zoneA, ...teams.zoneB];
  }

  return [...teams.zoneB, ...teams.zoneA];
}

export function getSettingByMonth(dateStr: string) {
  const date = new Date(dateStr);

  const currentMonth = date.getMonth() + 1;

  return {
    zoneShuffle: currentMonth % 2,
  };
}

export function getMonthName(
  monthNumber: number,
  format: "si-LK" | "en-US" = "en-US"
) {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString(format, { month: "long" });
}

export const toMinute = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function to12Hour(time: string) {
  let [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function getMonthRange(year: number, month: number) {
  // month is 0-indexed in JS (0 = January, 11 = December)
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0); // day 0 of next month = last day of this month
  return { start, end };
}
