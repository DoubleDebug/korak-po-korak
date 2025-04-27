import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";

type CalendarStore = {
  date: Dayjs;
  selectDate: (newDate: Dayjs) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  date: dayjs(),
  selectDate: (newDate: Dayjs) => set({ date: newDate }),
}));
