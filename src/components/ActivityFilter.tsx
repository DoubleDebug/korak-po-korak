import { FC } from "react";
import { Box, Chip } from "@mui/material";
import { activities } from "../config/activities";
import { useCalendarStore } from "../store/useCalendarStore";

export const ActivityFilter: FC = () => {
  const { selectedActivity, selectActivity } = useCalendarStore();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        rowGap: 2,
      }}
    >
      {activities.map((activity) => (
        <Chip
          sx={{
            scale: 1.25,
            mr: 4,
            "& > svg": { ml: "0.5rem !important" },
          }}
          key={activity.name}
          label={activity.name}
          variant={
            activity.name === selectedActivity.name ? "filled" : "outlined"
          }
          onClick={() => selectActivity(activity)}
          icon={activity.icon}
        />
      ))}
    </Box>
  );
};
