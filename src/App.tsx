import "./App.css";
import { FaCheck } from "react-icons/fa6";
import { Calendar } from "./components/Calendar";
import { activities } from "./config/activities";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Box, Chip, Typography } from "@mui/material";
import { useCalendarStore } from "./store/useCalendarStore";

function App() {
  const { selectedActivity, selectActivity } = useCalendarStore();

  return (
    <Box display="grid">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <FaRegCalendarCheck fontSize="1.5rem" />
          <Typography variant="h1" fontSize="1.5rem" textAlign="start">
            Stat tracker
          </Typography>
        </Box>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Gotovo za danas <FaCheck color="limegreen" />
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={6}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {activities.map((category) => (
            <Chip
              sx={{
                scale: 1.25,
                mr: 4,
                "& > svg": { ml: "0.5rem !important" },
              }}
              key={category.name}
              label={category.name}
              variant={
                category.name === selectedActivity ? "filled" : "outlined"
              }
              onClick={() => selectActivity(category.name)}
              icon={category.icon}
            />
          ))}
        </Box>
        <Calendar />
      </Box>
    </Box>
  );
}

export default App;
