import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function BasicSparkLine() {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart
          data={[0, 10, -10, 10, -10, 10, -10, 10, 0]}
          height={100}
        />
      </Box>
    </Stack>
  );
}
