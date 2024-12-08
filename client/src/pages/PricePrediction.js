import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  maxWidth: 400,
  margin: "0 auto",
}));

export default function PricePrediction() {
  const [days, setDays] = useState(30);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confidence, setConfidence] = useState("medium");

  const handlePrediction = () => {
    setLoading(true);
    setTimeout(() => {
      const basePrediction = 65000;
      const randomFactor = Math.random() * 5000;
      const confidenceFactors = {
        low: 0.8,
        medium: 1,
        high: 1.2,
      };
      const mockPrediction =
        (basePrediction + randomFactor) * confidenceFactors[confidence];
      setPredictedPrice(mockPrediction.toFixed(2));
      setLoading(false);
      setSnackbarOpen(true);
    }, 2000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          Bitcoin Price Prediction
        </Typography>
        <StyledBox>
          <Typography id="days-slider" gutterBottom>
            Days from now: {days}
          </Typography>
          <Slider
            value={days}
            onChange={(e, newValue) => setDays(newValue)}
            aria-labelledby="days-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={365}
          />
          <FormControl fullWidth>
            <InputLabel id="confidence-select-label">
              Confidence Level
            </InputLabel>
            <Select
              labelId="confidence-select-label"
              value={confidence}
              label="Confidence Level"
              onChange={(e) => setConfidence(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePrediction}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <TrendingUpIcon />
            }
          >
            {loading ? "Predicting..." : "Predict Price"}
          </Button>
          {predictedPrice && (
            <Typography variant="h6" align="center">
              Predicted Price: ${predictedPrice}
            </Typography>
          )}
        </StyledBox>
      </StyledPaper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Price prediction completed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
