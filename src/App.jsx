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
import CitiesPage from "./pages/CitiesPage";
import AddCities from "./pages/AddCities";
import EditCity from "./pages/EditCity";
import AddPackage from "./pages/AddPackage";
import PackageEditPage from "./pages/EditPackage";
import EnquiryListPage from "./pages/EnquiryListPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/admin/add-country" element={<AddCountryPage />} />
          <Route path="admin/country/:id/edit" element={<EditCountry />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/admin/add-cities" element={<AddCities />} />
          <Route path="/admin/cities/edit/:id" element={<EditCity />} />
          <Route path="/admin/packages/add" element={<AddPackage />} />
          <Route
            path="/admin/packages/edit/:id"
            element={<PackageEditPage />}
          />
          <Route path="admin/enquiries" element={<EnquiryListPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
