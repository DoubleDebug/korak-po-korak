import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
import { persist } from "zustand/middleware";
import { activities, Activity } from "../config/activities";

type ActivityRecord = {
  name: string;
  completed: boolean;
  note?: string;
};

type CalendarStore = {
  selectedDate: Dayjs | null;
  selectDate: (newDate: Dayjs | null) => void;
  selectedActivity: Activity;
  selectActivity: (newActivity: Activity) => void;
  history: {
    date: string;
    activities: ActivityRecord[];
  }[];
  updateActivity: (date: Dayjs, record: ActivityRecord) => void;
  removeActivity: (date: Dayjs, activityName: string) => void;
};

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      selectedDate: dayjs(),
      selectDate: (newDate) => set({ selectedDate: newDate }),
      selectedActivity: activities[0],
      selectActivity: (newActivity) => set({ selectedActivity: newActivity }),
      history: [],
      removeActivity: (date, activityName) =>
        set((state) => ({
          history: state.history.map((item) =>
            date.isSame(item.date, "day")
              ? {
                  ...item,
                  activities: item.activities.filter(
                    (a) => a.name !== activityName
                  ),
                }
              : item
          ),
        })),
      updateActivity: (date, record) =>
        set((state) => {
          const existingRecord = state.history.find((item) =>
            date.isSame(item.date, "day")
          );
          if (existingRecord) {
            return {
              history: state.history.map((item) =>
                date.isSame(item.date, "day")
                  ? {
                      ...item,
                      activities: Array.from(
                        new Set([...item.activities, record])
                      ),
                    }
                  : item
              ),
            };
          }
          return {
            history: [
              ...state.history,
              { date: date.toISOString(), activities: [record] },
            ],
          };
        }),
    }),
    {
      name: "calendar-history",
      partialize: (state) => ({ history: state.history }),
    }
  )
);
