import * as React from "react";
import axios from "axios";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "credentials", name: "Email and Password" },
];

const signIn = async (provider) => {
  if (provider.id === "credentials") {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data?.message || error.message
      );
    }
  } else {
    console.log(`Sign in with ${provider.id} not implemented yet`);
  }
};

export default function Login() {
  return (
    <AppProvider>
      <SignInPage text={signIn} signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
