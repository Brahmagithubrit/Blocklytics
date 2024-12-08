import * as React from "react";
import axios from "axios";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "credentials", name: "Name, Email, and Password" },
];

const signIn = async (provider) => {
  if (provider.id === "credentials") {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password,
      });
      alert(response.data.message || "Sign-up successful!");
    } catch (error) {
      console.error(
        "Error during sign-up:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred during sign-up. Please try again."
      );
    }
  } else {
    console.log(`Sign in with ${provider.id} not implemented yet`);
  }
};

export default function Sign_up() {
  return (
    <AppProvider>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
