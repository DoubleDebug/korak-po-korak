import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
import { persist } from "zustand/middleware";
import { activities, Activity } from "../config/activities";

type CalendarStore = {
  selectedDate: Dayjs | null;
  selectDate: (newDate: Dayjs | null) => void;
  selectedActivity: Activity;
  selectActivity: (newActivity: Activity) => void;
  history: {
    date: string;
    completedActivities: { name: string; note?: string }[];
  }[];
};

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      selectedDate: dayjs(),
      selectDate: (newDate) => set({ selectedDate: newDate }),
      selectedActivity: activities[0],
      selectActivity: (newActivity) => set({ selectedActivity: newActivity }),
      history: [],
    }),
    {
      name: "calendar-history",
      partialize: (state) => ({ history: state.history }),
    }
  )
);
