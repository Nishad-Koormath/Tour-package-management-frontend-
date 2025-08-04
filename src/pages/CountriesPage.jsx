import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    axiosInstance
      .get("/countries/")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  return (
    <div>
      <h2>Countries</h2>
      {countries.length === 0 ? (
        <p>No countries found</p>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountriesPage;
