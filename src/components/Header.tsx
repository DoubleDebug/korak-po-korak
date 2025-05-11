import { FC } from "react";
import { FaCheck } from "react-icons/fa6";
import { Box, Typography } from "@mui/material";
import { activities } from "../config/activities";
import { PiSneakerMove } from "react-icons/pi";
import { useCalendarStore } from "../store/useCalendarStore";
import { IoClose } from "react-icons/io5";

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
        <PiSneakerMove color="tomato" fontSize="1.5rem" />
        <Typography variant="h1" fontSize="1.25rem" textAlign="start">
          Korak po korak
        </Typography>
      </Box>
      <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {numOfUnrecordedActivities === 0 && (
          <>
            Gotovo za danas <FaCheck color="limegreen" />
          </>
        )}
        {numOfUnrecordedActivities > 0 && (
          <>
            {numOfUnrecordedActivities} nezabeležene aktivnosti.{" "}
            <IoClose color="red" />
          </>
        )}
      </Typography>
    </Box>
  );
};
