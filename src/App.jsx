import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CountriesPage from "./pages/CountriesPage";
import PackagesPage from "./pages/PackagesPage";
import EnquiryPage from "./pages/EnquiryPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import ThankYou from "./pages/ThanksPage";
import HomePage from "./pages/HomePage";
import Navbar from "./componests/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/enquiries" element={<EnquiryPage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
