import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";
import publicAPI from "../services/publicAPI";
import { toast } from "react-toastify";

function AddCities() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await publicAPI.get("/countries");
        setCountries(res.data);
      } catch (err) {
        toast.error("Failed to load countries");
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !country) {
      toast.warning("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/countries/cities/", {
        name,
        country,
      });
      toast.success("City added successfully");
      navigate("/cities");
    } catch (err) {
      toast.error("Failed to add city");
    } finally {
      setLoading(false);
    }
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
          <h1 className="display-5 fw-bold mb-3">Add New City</h1>
          <p className="lead mb-4 opacity-75">
            Add a new city to your travel destinations
          </p>
        </div>

        {/* Form Container */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  {/* City Name Field */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-2">
                      City Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      placeholder="Enter city name"
                      disabled={loading}
                    />
                  </div>

                  {/* Country Field */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-2">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-input"
                      disabled={loading}
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-3 justify-content-end">
                    <button
                      type="button"
                      onClick={() => navigate("/cities")}
                      className="btn-secondary"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Adding...
                        </>
                      ) : (
                        <>
                          <span className="me-2">➕</span>
                          Add City
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Form Input Styling */
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: rgba(255, 255, 255, 0.95);
        }

        .form-input:disabled {
          background: rgba(0, 0, 0, 0.05);
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* Button Styling */
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
          min-width: 120px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #5a6fd8, #6a42a0);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-primary:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          transform: none;
        }

        .btn-secondary {
          background: rgba(108, 117, 125, 0.1);
          border: 2px solid rgba(108, 117, 125, 0.2);
          color: #6c757d;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(5px);
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(108, 117, 125, 0.15);
          border-color: rgba(108, 117, 125, 0.3);
          color: #495057;
          transform: translateY(-1px);
        }

        .btn-secondary:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* Form Label */
        .form-label {
          color: #495057;
          font-size: 14px;
          margin-bottom: 8px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .card-body {
            padding: 1.5rem !important;
          }

          .btn-primary,
          .btn-secondary {
            font-size: 14px;
            padding: 10px 20px;
          }

          .d-flex {
            flex-direction: column-reverse;
          }

          .d-flex .btn-secondary,
          .d-flex .btn-primary {
            width: 100%;
            margin-bottom: 0.75rem;
          }

          .d-flex .btn-primary {
            margin-bottom: 0;
          }
        }

        /* Loading spinner */
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }
      `}</style>
    </div>
  );
}

export default AddCities;
