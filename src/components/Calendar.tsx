import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { Box, Typography } from "@mui/material";
import { useCalendarStore } from "../store/calendar";

export const Calendar: FC = () => {
  const { date, selectDate } = useCalendarStore();

  return (
    <Box display="flex">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={selectDate}
          defaultValue={dayjs()}
          slots={{ day: ServerDay }}
          slotProps={{
            day: {
              highlightedDays: null,
            },
          }}
        />
      </LocalizationProvider>
      <Typography variant="h3">{date.format("DD MMM, YYYY")}</Typography>
    </Box>
  );
};

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { day, outsideCurrentMonth, ...other } = props;

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      sx={{ ...other.sx }}
    />
  );
}
