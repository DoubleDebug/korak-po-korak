import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { activities } from "../config/activities";
import { useCalendarStore } from "../store/useCalendarStore";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import { getContrastColor } from "../utils/contrast-color";

export const DailyActivity: FC = () => {
  const {
    selectedDate,
    selectedActivity,
    history,
    updateActivity,
    removeActivity,
  } = useCalendarStore();

  const historyItem = history.find((item) =>
    selectedDate?.isSame(item.date, "day")
  );
  const historyActivity = historyItem?.activities.find(
    (activity) => activity.name === selectedActivity.name
  );

  if (selectedActivity.name === "Sve") {
    return (
      <Box display="flex" flexDirection="column" gap={1}>
        {historyItem?.activities.map((activity) => (
          <Box
            key={activity.name}
            display="flex"
            alignItems="center"
            width="min-content"
            mx="auto"
          >
            <Alert
              icon={<FaCheck color="lightgreen" />}
              severity="success"
              sx={{
                mx: "auto",
                width: "400px",
                justifyContent: "center",
                background: activities.find((act) => act.name === activity.name)
                  ?.color,
                color: getContrastColor(
                  activities.find((act) => act.name === activity.name)?.color
                ),
              }}
            >
              {activity.completed ? "Završeno." : "Nije završeno."}
            </Alert>
            <IconButton
              onClick={() => removeActivity(selectedDate!, activity.name)}
            >
              <IoClose />
            </IconButton>
          </Box>
        ))}
      </Box>
    );
  }

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
      <Box display="flex" alignItems="center" width="min-content" mx="auto">
        <Alert
          icon={<FaCheck color="lightgreen" />}
          severity="success"
          sx={{
            mx: "auto",
            width: "400px",
            justifyContent: "center",
            background: selectedActivity.color,
            color: getContrastColor(selectedActivity.color),
          }}
        >
          Završeno.
        </Alert>
        <IconButton
          onClick={() => removeActivity(selectedDate!, selectedActivity.name)}
        >
          <IoClose />
        </IconButton>
      </Box>
    );

  return (
    <Box display="flex" alignItems="center" width="min-content" mx="auto">
      <Alert
        icon={<IoClose color="red" />}
        severity="warning"
        sx={{
          mx: "auto",
          width: "400px",
          justifyContent: "center",
          background: activities.find(
            (act) => act.name === selectedActivity.name
          )?.color,
          color: getContrastColor(
            activities.find((act) => act.name === selectedActivity.name)?.color
          ),
        }}
      >
        Nije završeno.
      </Alert>
      <IconButton
        onClick={() => removeActivity(selectedDate!, selectedActivity.name)}
      >
        <IoClose />
      </IconButton>
    </Box>
  );
};
