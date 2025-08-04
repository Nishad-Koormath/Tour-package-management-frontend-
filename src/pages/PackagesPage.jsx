import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/api";

function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    axiosInstance
      .get("/packages/")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => {
        console.error("Error fetchin packages:", err);
        if (err.response?.status === 401) {
          toast.error("Session expired. please login again.");
          navigate("/");
        }
      });
  }, [navigate]);

  return (
    <div>
      <h2>Tour Packages</h2>
      {packages.length === 0 ? (
        <p>No packags available</p>
      ) : (
        <div
          sstyle={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <h4>{pkg.title}</h4>
              <p>{pkg.description}</p>
              <p>Price: ₹{pkg.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default PackagesPage;