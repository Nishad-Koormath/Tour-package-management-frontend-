import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import publicAPI from "../services/publicAPI";
import { isAdmin } from "../utils/auth";
import axiosInstance from "../services/api";

function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    publicAPI
      .get("/countries/cities")
      .then((res) => {
        setCities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
        setLoading(false);
      });
  }, []);

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/cities/${selectedId}/`);
      setCities(cities.filter((c) => c.id !== selectedId));
      toast.success("City deleted successfully!");
      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete city.");
    }
  };

  console.log("isAdmin:", isAdmin());

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
          <h1 className="display-5 fw-bold mb-3">Cities</h1>
          <p className="lead mb-4 opacity-75">
            Discover amazing cities around the world
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
            <span className="fw-bold fs-5">{cities.length}</span>
            <span className="ms-2 opacity-75">
              {cities.length === 1 ? "City" : "Cities"} Available
            </span>
          </div>
        </div>

        {/* Add Button */}
        {isAdmin() && (
          <div className="d-flex justify-content-end mb-4">
            <button
              className="add-city-btn"
              onClick={() => navigate("/admin/add-city")}
            >
              <span className="btn-icon">➕</span>
              <span className="btn-text">Add City</span>
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center text-white">Loading cities...</div>
        ) : cities.length === 0 ? (
          <div className="text-center text-white">No cities found.</div>
        ) : (
          <div className="row g-4">
            {cities.map((city, index) => (
              <div key={city.id} className="col-lg-4 col-md-6">
                <div
                  className="card border-0 h-100 city-card"
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
                        index % 8 === 0
                          ? "#667eea, #764ba2"
                          : index % 8 === 1
                          ? "#f093fb, #f5576c"
                          : index % 8 === 2
                          ? "#4facfe, #00f2fe"
                          : index % 8 === 3
                          ? "#43e97b, #38f9d7"
                          : index % 8 === 4
                          ? "#fa709a, #fee140"
                          : index % 8 === 5
                          ? "#a8edea, #fed6e3"
                          : index % 8 === 6
                          ? "#ffecd2, #fcb69f"
                          : "#ff9a9e, #fecfef"
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
                      {city.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold text-dark mb-3">
                      {city.name}
                    </h5>

                    {isAdmin() && (
                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                          className="action-btn edit-btn"
                          onClick={() =>
                            navigate(`/admin/city/${city.id}/edit`)
                          }
                        >
                          <span className="btn-icon">✏️</span>
                          <span className="btn-text">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedId(city.id);
                          }}
                          className="action-btn delete-btn"
                        >
                          <span className="btn-icon">🗑️</span>
                          <span className="btn-text">Delete</span>
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
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this city? This action cannot
                  be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  className="modal-btn cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="modal-btn confirm-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .city-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease;
        }

        /* Add City Button */
        .add-city-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .add-city-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
          background: linear-gradient(135deg, #218838, #1abc9c);
        }

        .add-city-btn:active {
          transform: translateY(0);
        }

        /* Action Buttons (Edit/Delete) */
        .action-btn {
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 500;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          min-width: 80px;
          justify-content: center;
        }

        .edit-btn {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
        }

        .edit-btn:hover {
          background: linear-gradient(135deg, #0056b3, #004085);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
        }

        .delete-btn {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
        }

        .delete-btn:hover {
          background: linear-gradient(135deg, #c82333, #bd2130);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
        }

        .action-btn:active {
          transform: translateY(0);
        }

        .btn-icon {
          display: inline-block;
          font-size: 14px;
        }

        .btn-text {
          font-weight: 600;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          backdrop-filter: blur(5px);
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 400px;
          overflow: hidden;
          transform: scale(1);
          transition: all 0.3s ease;
        }

        .modal-header {
          padding: 20px 24px 0;
        }

        .modal-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .modal-body {
          padding: 16px 24px;
          color: #666;
          line-height: 1.5;
        }

        .modal-body p {
          margin: 0;
        }

        .modal-footer {
          padding: 0 24px 24px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .modal-btn {
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 80px;
        }

        .cancel-btn {
          background: #f8f9fa;
          color: #6c757d;
          border: 1px solid #dee2e6;
        }

        .cancel-btn:hover {
          background: #e9ecef;
          color: #495057;
        }

        .confirm-btn {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
        }

        .confirm-btn:hover {
          background: linear-gradient(135deg, #c82333, #bd2130);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .action-btn {
            padding: 6px 12px;
            font-size: 11px;
            min-width: 70px;
          }

          .btn-text {
            display: none;
          }

          .add-city-btn {
            padding: 10px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default CitiesPage;
