import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useCalendarStore } from "../store/useCalendarStore";
import { Alert, Box, IconButton, Typography } from "@mui/material";

export const DailyActivity: FC = () => {
  const { selectedDate, selectedActivity, history, updateActivity } =
    useCalendarStore();

  const historyItem = history.find((item) =>
    selectedDate?.isSame(item.date, "day")
  );
  const historyActivity = historyItem?.completedActivities.find(
    (activity) => activity.name === selectedActivity.name
  );

  if (!historyActivity) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Typography>Da li si uspešno završio aktivnost?</Typography>
        <IconButton
          size="large"
          sx={{ fontSize: "1.4rem" }}
          onClick={() =>
            updateActivity(selectedDate!, {
              name: selectedActivity.name,
              completed: true,
            })
          }
        >
          <FaCheck color="limegreen" />
        </IconButton>
        <IconButton
          size="large"
          sx={{ fontSize: "1.4rem" }}
          onClick={() =>
            updateActivity(selectedDate!, {
              name: selectedActivity.name,
              completed: false,
            })
          }
        >
          <IoClose color="red" />
        </IconButton>
      </Box>
    );
  }

  if (historyActivity.completed)
    return (
      <Alert
        icon={<FaCheck color="lightgreen" />}
        severity="success"
        sx={{
          mx: "auto",
          width: "400px",
          justifyContent: "center",
          background: "seagreen",
        }}
      >
        Završeno.
      </Alert>
    );

  return (
    <Alert
      icon={<IoClose color="red" />}
      severity="warning"
      sx={{
        mx: "auto",
        width: "400px",
        justifyContent: "center",
        background: "darksalmon",
        color: "black",
      }}
    >
      Nije završeno.
    </Alert>
  );
};
