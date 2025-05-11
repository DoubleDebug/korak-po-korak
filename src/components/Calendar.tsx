import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { activities } from "../config/activities";
import { useCalendarStore } from "../store/useCalendarStore";
import { generateConicGradientCss } from "../utils/gradient";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";

export const Calendar: FC = () => {
  const { selectedDate, selectDate } = useCalendarStore();

  return (
    <Box display="grid">
      <Typography variant="h3" fontSize="2rem">
        {selectedDate?.format("DD. MMMM, YYYY")}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="rs">
        <DateCalendar
          value={selectedDate}
          onChange={(value) => selectDate(value)}
          defaultValue={dayjs()}
          slots={{ day: ServerDay }}
        />
      </LocalizationProvider>
    </Box>
  );
};

function ServerDay(props: PickersDayProps) {
  const { history, selectedActivity } = useCalendarStore();
  const { day, selected, ...other } = props;

  const isHighlighted = useMemo(() => {
    const historyItem = history.find((item) => day.isSame(item.date, "day"));
    if (!historyItem) return false;
    if (selectedActivity.name === "Sve") return true;
    const activity = historyItem.activities.find(
      (item) => item.name === selectedActivity.name
    );
    return Boolean(activity?.completed);
  }, [day, history, selectedActivity.name]);
  const background = useMemo(() => {
    const historyItem = history.find((item) => day.isSame(item.date, "day"));
    if (!historyItem) return;

    if (selectedActivity.name === "Sve") {
      const colors = historyItem.activities.map((activity) => {
        const act = activities.find(
          (a) => a.name === activity.name && activity.completed
        );
        if (!act) return "none";
        return act.color;
      });
      return generateConicGradientCss(colors);
    }

    if (isHighlighted) return selectedActivity.color;
  }, [
    day,
    history,
    isHighlighted,
    selectedActivity.color,
    selectedActivity.name,
  ]);
  const border = useMemo(() => {
    if (selected) return "1px solid white !important";
    if (day.isSame(dayjs(), "day")) return "2px solid white !important";
    const historyItem = history.find((item) => day.isSame(item.date, "day"));
    const activity = historyItem?.activities.find((item) =>
      selectedActivity.name === "Sve"
        ? true
        : item.name === selectedActivity.name
    );
    if (activity && !activity.completed)
      return `1px solid ${
        activities.find((a) => a.name === activity.name)?.color
      }`;
  }, [day, history, selected, selectedActivity.name]);

  return <PickersDay {...other} sx={{ background, border }} day={day} />;
}
