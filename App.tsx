import React from "react";
import { AuthProvider } from "./components/context/AuthContext";
import RootLayout from "../app/_layout"; 

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
