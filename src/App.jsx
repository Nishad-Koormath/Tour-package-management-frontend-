import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CountriesPage from "./pages/CountriesPage";
import PackagesPage from "./pages/PackagesPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/packages" element={<PackagesPage />} />


          
        </Routes>
      </Router>
    </>
  );
}

export default App;
