import { FC } from "react";
import { FaCheck } from "react-icons/fa6";
import { Box, Typography } from "@mui/material";
import { activities } from "../config/activities";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useCalendarStore } from "../store/useCalendarStore";

export const Header: FC = () => {
  const { selectedDate, history } = useCalendarStore();
  const historyItem = history.find((item) =>
    selectedDate?.isSame(item.date, "day")
  );
  const numOfUnrecordedActivities = historyItem
    ? activities.length - 1 - historyItem.activities.length
    : activities.length - 1;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <FaRegCalendarCheck fontSize="1.5rem" />
        <Typography variant="h1" fontSize="1.5rem" textAlign="start">
          Statistika
        </Typography>
      </Box>
      <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {numOfUnrecordedActivities === 0 && (
          <>
            Gotovo za danas <FaCheck color="limegreen" />
          </>
        )}
        {numOfUnrecordedActivities > 0 && (
          <>{numOfUnrecordedActivities} nezabeležene aktivnosti.</>
        )}
      </Typography>
    </Box>
  );
};
