import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%", // 16:9 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const news = [
  {
    title: "Bitcoin hits new all-time high",
    description:
      "Bitcoin has reached a new milestone with a significant price increase.",
  },
  {
    title: "Elon Musk tweets about Bitcoin again",
    description: "The crypto market reacts to Elon Musk's latest comments.",
  },
  {
    title: "Bitcoin price volatility continues",
    description:
      "Bitcoin's price fluctuates dramatically over the last 24 hours.",
  },
  {
    title: "Bitcoin adoption by major retailers",
    description: "Bitcoin is becoming more accepted by big-name retailers.",
  },
  {
    title: "Bitcoin mining and its environmental impact",
    description:
      "Debate continues over Bitcoin mining's environmental footprint.",
  },
  {
    title: "Bitcoin's role in financial markets",
    description: "Bitcoin's influence on traditional financial markets grows.",
  },
  {
    title: "Bitcoin ETFs approved",
    description:
      "Bitcoin ETFs are now approved, paving the way for institutional investors.",
  },
  {
    title: "Regulations on Bitcoin in the US",
    description:
      "New government regulations on Bitcoin are expected to be announced.",
  },
  {
    title: "Bitcoin and blockchain technology",
    description:
      "Blockchain technology is revolutionizing industries, led by Bitcoin.",
  },
  {
    title: "Bitcoin as a hedge against inflation",
    description:
      "Many see Bitcoin as a safe investment in times of economic uncertainty.",
  },
  {
    title: "Bitcoin's price predictions for the next year",
    description:
      "Experts predict where Bitcoin's price will go in the next 12 months.",
  },
  {
    title: "Bitcoin scams and how to avoid them",
    description:
      "Learn about the latest Bitcoin scams and how to avoid falling victim.",
  },
];

function NewsUpdate() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 6 }}
      >
        Latest Bitcoin News Updates
      </Typography>
      <Grid container spacing={4}>
        {news.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardActionArea>
                <StyledCardMedia
                  image={`/placeholder.svg?height=200&width=300&text=Bitcoin+News+${index + 1}`}
                  title={article.title}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.description}
                  </Typography>
                </StyledCardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NewsUpdate;
