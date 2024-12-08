import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const walletData = {
  balance: "1.2345 BTC",
  transactions: [
    { id: "TX12345", amount: "-0.2345 BTC", status: "Completed" },
    { id: "TX67890", amount: "+0.5000 BTC", status: "Pending" },
  ],
};

export default function WalletTracker() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Wallet Tracker
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Wallet Balance: {walletData.balance}
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Transaction History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {walletData.transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
