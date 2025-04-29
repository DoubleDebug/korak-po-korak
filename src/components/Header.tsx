import { FC } from "react";
import { FaCheck } from "react-icons/fa6";
import { Box, Typography } from "@mui/material";
import { FaRegCalendarCheck } from "react-icons/fa";

export const Header: FC = () => {
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
        Gotovo za danas <FaCheck color="limegreen" />
      </Typography>
    </Box>
  );
};
