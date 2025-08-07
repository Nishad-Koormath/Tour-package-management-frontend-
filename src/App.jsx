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
import AddCountryPage from "./pages/AddCountry";
import EditCountry from "./pages/EditCountry.JSX";

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
          <Route path="/admin/add-country" element={<AddCountryPage />} />
          <Route path="admin/country/:id/edit" element={<EditCountry/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
