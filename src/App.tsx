import "./App.css";
import { useState } from "react";
import { Calendar } from "./components/Calendar";
import { Box, Chip, Typography } from "@mui/material";

function App() {
  const [categories, setCategories] = useState(["Workout", "Eat healthy"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Workout");

  return (
    <Box display="grid" sx={{ background: "red" }}>
      <Typography variant="h1">Stat tracker</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            variant={category === selectedCategory ? "filled" : "outlined"}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </Box>
      <Calendar />
    </Box>
  );
}

export default App;
