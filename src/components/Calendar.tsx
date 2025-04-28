import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useCalendarStore } from "../store/useCalendarStore";
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
  const { day, ...other } = props;

  const isHighlighted = useMemo(() => {
    const historyItem = history.find((item) => day.isSame(item.date, "day"));
    if (!historyItem) return false;
    const activity = historyItem.completedActivities.find(
      (item) => item.name === selectedActivity.name
    );
    return !!activity;
  }, [day, history, selectedActivity.name]);

  return (
    <PickersDay
      {...other}
      sx={{ background: isHighlighted ? selectedActivity.color : undefined }}
      day={day}
    />
  );
}
