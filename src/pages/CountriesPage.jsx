import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import publicAPI from "../services/publicAPI";
import { isAdmin } from "../utils/auth";
import axiosInstance from "../services/api";

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    publicAPI
      .get("/countries/")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/countries/${selectedId}`);
      setCountries(countries.filter((c) => c.id !== selectedId));
      toast.success("Country deleted successfully!");
      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete country.");
    }
  };

  
  console.log('isAdmin:',isAdmin())

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="text-center text-white mb-5">
          <h1 className="display-5 fw-bold mb-3">Travel Destinations</h1>
          <p className="lead mb-4 opacity-75">
            Discover amazing countries for your next adventure
          </p>
          <div
            className="d-inline-block px-4 py-2"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <span className="fw-bold fs-5">{countries.length}</span>
            <span className="ms-2 opacity-75">
              {countries.length === 1 ? "Destination" : "Destinations"}{" "}
              Available
            </span>
          </div>
        </div>

        {/* Add Button */}
        {isAdmin() && (
          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-light fw-bold shadow-sm"
              onClick={() => navigate("/admin/countries/add")}
            >
              ➕ Add Country
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center text-white">Loading countries...</div>
        ) : countries.length === 0 ? (
          <div className="text-center text-white">No countries found.</div>
        ) : (
          <div className="row g-4">
            {countries.map((country, index) => (
              <div key={country.id} className="col-lg-4 col-md-6">
                <div
                  className="card border-0 h-100 country-card"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="position-relative"
                    style={{
                      height: "120px",
                      background: `linear-gradient(135deg, ${
                        index % 6 === 0
                          ? "#667eea, #764ba2"
                          : index % 6 === 1
                          ? "#f093fb, #f5576c"
                          : index % 6 === 2
                          ? "#4facfe, #00f2fe"
                          : index % 6 === 3
                          ? "#43e97b, #38f9d7"
                          : index % 6 === 4
                          ? "#fa709a, #fee140"
                          : "#a8edea, #fed6e3"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="text-white fw-bold"
                      style={{
                        fontSize: "2.5rem",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {country.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold text-dark mb-1">
                      {country.name}
                    </h5>
                    <p className="text-muted small mb-2">Travel Destination</p>

                    {isAdmin() && (
                      <div className="text-end">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() =>
                            navigate(`/admin/countries/edit/${country.id}`)
                          }
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedId(country.id);
                          }}
                          className="bg-danger text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {showModal && isAdmin() && (
          <div className="fixed inset-0 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50">
            <div
              className="bg-white p-4 rounded-xl shadow-md"
              style={{ width: "300px" }}
            >
              <h5 className="mb-4">
                Are you sure you want to delete this country?
              </h5>
              <div className="d-flex justify-content-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .country-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default CountriesPage;
