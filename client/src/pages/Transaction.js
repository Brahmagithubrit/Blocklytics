import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const steps = ["Enter Transaction ID", "View Details", "Confirm Transaction"];

export default function TransactionPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const mockDetails = {
        id: transactionId,
        amount: "0.123 BTC",
        status: "Completed",
        date: "2024-11-15",
        sender: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        recipient: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
        fee: "0.0001 BTC",
      };
      setTransactionDetails(mockDetails);
      setLoading(false);
      setActiveStep(1);
    }, 1500);
  };

  const handleConfirm = () => {
    setActiveStep(2);
    setSnackbarOpen(true);
  };

  const handleBack = () => {
    setActiveStep(0); // Go back to step 0 (Enter Transaction ID)
    setTransactionDetails(null); // Clear transaction details
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label="Transaction ID"
              variant="standard"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={!transactionId || loading}
              sx={{ ml: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </Box>
        );
      case 1:
        return (
          transactionDetails && (
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transaction Details:
                </Typography>
                <Typography>ID: {transactionDetails.id}</Typography>
                <Typography>Amount: {transactionDetails.amount}</Typography>
                <Typography>Status: {transactionDetails.status}</Typography>
                <Typography>Date: {transactionDetails.date}</Typography>
                <StyledDivider />
                <Typography>Sender: {transactionDetails.sender}</Typography>
                <Typography>
                  Recipient: {transactionDetails.recipient}
                </Typography>
                <Typography>Fee: {transactionDetails.fee}</Typography>
                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    startIcon={<ReceiptIcon />}
                    sx={{ mr: 2 }}
                  >
                    Confirm Transaction
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBack}
                    startIcon={<CloseIcon />}
                  >
                    Back
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          )
        );
      case 2:
        return (
          <Box sx={{ textAlign: "center" }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Transaction Confirmed
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Your transaction has been successfully confirmed and recorded on
              the blockchain.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
           Transaction Tracker
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
      </StyledPaper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Transaction confirmed successfully!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
}
