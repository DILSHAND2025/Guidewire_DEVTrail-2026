import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GigShieldProvider } from "./context/GigShieldContext";
import Dashboard from "./pages/dashboard";
import Claims from "./pages/claims";
import Navbar from "./components/navbar";
import ClaimModal from "./components/ClaimModal";

export default function App() {
  console.log("App component called");
  return (
    <GigShieldProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/claims" element={<Claims />} />
        </Routes>
        <ClaimModal />
      </BrowserRouter>
    </GigShieldProvider>
  );
}