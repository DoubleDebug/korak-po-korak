import "./App.css";
import { Box } from "@mui/material";
import { Header } from "./components/Header";
import { Calendar } from "./components/Calendar";
import { DailyActivity } from "./components/DailyActivity";
import { ActivityFilter } from "./components/ActivityFilter";

function App() {
  return (
    <Box display="grid" mb={4}>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={6}
      >
        <ActivityFilter />
        <Calendar />
        <DailyActivity />
      </Box>
    </Box>
  );
}

export default App;
