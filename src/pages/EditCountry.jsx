import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";

function EditCountry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/countries/${id}/`)
      .then((res) => {
        setName(res.data.name);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load country");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    axiosInstance
      .put(`countries/${id}/`, { name })
      .then(() => {
        toast.success("Country updated successfully");
        navigate("/countries");
      })
      .catch(() => {
        toast.error("Update failed");
        setSubmitting(false);
      });
  };

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
          <h1 className="display-5 fw-bold mb-3">Edit Destination</h1>
          <p className="lead mb-4 opacity-75">
            Update travel destination information
          </p>
        </div>

        {/* Back Button */}
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-light fw-bold shadow-sm"
            onClick={() => navigate("/countries")}
            style={{
              borderRadius: "15px",
              padding: "0.75rem 1.5rem",
            }}
          >
            ← Back to Countries
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div
                className="card border-0 shadow-lg text-center p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mb-0">Loading country information...</p>
              </div>
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div
                className="card border-0 shadow-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                {/* Card Header */}
                <div
                  className="position-relative text-center py-4"
                  style={{
                    background: "linear-gradient(135deg, #f093fb, #f5576c)",
                  }}
                >
                  <div
                    className="text-white fw-bold"
                    style={{
                      fontSize: "3rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    ✏️
                  </div>
                  <h3 className="text-white fw-bold mt-2 mb-0">
                    Edit Destination
                  </h3>
                </div>

                {/* Card Body */}
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label 
                        htmlFor="countryName" 
                        className="form-label fw-bold text-dark mb-3"
                        style={{ fontSize: "1.1rem" }}
                      >
                        Country Name
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          id="countryName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control form-control-lg"
                          placeholder="Enter country name..."
                          required
                          disabled={submitting}
                          style={{
                            borderRadius: "15px",
                            border: "2px solid rgba(240, 147, 251, 0.2)",
                            padding: "0.875rem 1.25rem",
                            fontSize: "1rem",
                            background: "rgba(255, 255, 255, 0.9)",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => {
                            e.target.style.border = "2px solid #f093fb";
                            e.target.style.boxShadow = "0 0 0 0.2rem rgba(240, 147, 251, 0.25)";
                          }}
                          onBlur={(e) => {
                            e.target.style.border = "2px solid rgba(240, 147, 251, 0.2)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                        {/* Input Icon */}
                        <div
                          className="position-absolute top-50 end-0 translate-middle-y me-3"
                          style={{
                            color: "#f093fb",
                            opacity: "0.6",
                          }}
                        >
                          📍
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-3">
                      {/* Cancel Button */}
                      <button
                        type="button"
                        onClick={() => navigate("/countries")}
                        className="btn flex-fill fw-bold"
                        disabled={submitting}
                        style={{
                          background: "rgba(108, 117, 125, 0.1)",
                          color: "#6c757d",
                          border: "2px solid rgba(108, 117, 125, 0.2)",
                          borderRadius: "15px",
                          padding: "0.875rem 1.5rem",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!submitting) {
                            e.target.style.background = "rgba(108, 117, 125, 0.2)";
                            e.target.style.transform = "translateY(-1px)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(108, 117, 125, 0.1)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        Cancel
                      </button>

                      {/* Update Button */}
                      <button
                        type="submit"
                        disabled={submitting || !name.trim()}
                        className="btn flex-fill fw-bold"
                        style={{
                          background: "linear-gradient(135deg, #f093fb, #f5576c)",
                          color: "white",
                          border: "none",
                          borderRadius: "15px",
                          padding: "0.875rem 1.5rem",
                          fontSize: "1rem",
                          boxShadow: "0 6px 20px rgba(240, 147, 251, 0.3)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!submitting && name.trim()) {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 8px 25px rgba(240, 147, 251, 0.5)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "0 6px 20px rgba(240, 147, 251, 0.3)";
                        }}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            💾 Update Country
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Help Text */}
                  <div className="text-center mt-4">
                    <small 
                      className="text-muted"
                      style={{ opacity: "0.7" }}
                    >
                      💡 Changes will be saved immediately after clicking update
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info Card */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6 col-md-8">
            <div
              className="text-center p-4"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-white">
                <small className="opacity-75">
                  ⚠️ Note: Updating country name will affect all related travel packages
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .form-control:focus {
          outline: none;
        }

        .btn:disabled {
          opacity: 0.6;
          transform: none !important;
          box-shadow: 0 6px 20px rgba(240, 147, 251, 0.2) !important;
        }

        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .card-body {
            padding: 2rem 1.5rem !important;
          }
          
          .d-flex.gap-3 {
            flex-direction: column;
            gap: 1rem !important;
          }
        }

        .spinner-border {
          color: #f093fb !important;
        }
      `}</style>
    </div>
  );
}

export default EditCountry;