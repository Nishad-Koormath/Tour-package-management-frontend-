import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import publicAPI from "../services/publicAPI";
import { isAdmin } from "../utils/auth";
import axiosInstance from "../services/api";

function PackageDetailPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    publicAPI
      .get(`/packages/${id}/`)
      .then((res) => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching package details:", err);
        setLoading(false);
        if (err.response?.status === 404) {
          toast.error("Package not found");
          navigate("/packages");
        }
      });
  }, [id, navigate]);

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/packages/${pkg.id}/`);
      toast.success("Package deleted successfully!");
      setShowModal(false);
      navigate("/packages");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete package.");
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
        {/* Back Button */}
        <div className="mb-4">
          <button className="back-btn" onClick={() => navigate("/packages")}>
            <span className="btn-icon">←</span>
            <span className="btn-text">Back to Packages</span>
          </button>
        </div>

        {loading ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div
                className="p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="spinner-border mb-3"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "#667eea",
                  }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="text-dark mb-2">Loading Package Details</h5>
                <p className="text-muted">
                  Please wait while we fetch the package information...
                </p>
              </div>
            </div>
          </div>
        ) : !pkg ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div
                className="p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <div className="mb-4">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#6c757d"
                      strokeWidth="2"
                    />
                    <line
                      x1="12"
                      y1="8"
                      x2="12"
                      y2="12"
                      stroke="#6c757d"
                      strokeWidth="2"
                    />
                    <line
                      x1="12"
                      y1="16"
                      x2="12.01"
                      y2="16"
                      stroke="#6c757d"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h4 className="text-dark mb-3">Package Not Found</h4>
                <p className="text-muted">
                  The package you're looking for doesn't exist or has been
                  removed.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="package-detail-card"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  animation: "slideUpFadeIn 0.6s ease-out forwards",
                }}
              >
                {/* Header Section */}
                <div
                  className="text-center text-white p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))",
                  }}
                >
                  <div className="mb-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center mx-auto"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50%",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 16V8C21 6.89 20.11 6 19 6H5C3.89 6 3 6.89 3 8V16C3 17.11 3.89 18 5 18H19C20.11 18 21 17.11 21 16Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M7 12L12 15L17 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <h1 className="h3 fw-bold mb-2">{pkg.title}</h1>
                  <div
                    className="d-inline-block px-3 py-2"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "25px",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <span className="fw-bold fs-4">₹{pkg.price}</span>
                  </div>
                </div>

                {/* Image Section */}
                <div className="position-relative" style={{ height: "300px" }}>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback for broken images */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-none align-items-center justify-content-center text-white"
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                    }}
                  >
                    <div className="text-center">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <circle
                          cx="8.5"
                          cy="8.5"
                          r="1.5"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M21 15L16 10L5 21"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="mb-0 mt-2">Package Image</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  {/* Description */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-dark mb-3">
                      About This Package
                    </h5>
                    <p
                      className="text-muted lh-base"
                      style={{ fontSize: "1rem" }}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Package Details Grid */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <div
                        className="p-3 rounded text-center h-100"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.05))",
                          border: "1px solid rgba(102, 126, 234, 0.2)",
                        }}
                      >
                        <div className="mb-2">
                          <span style={{ fontSize: "1.5rem" }}>📅</span>
                        </div>
                        <div className="fw-bold text-primary mb-1">
                          {pkg.duration || "Flexible"}
                        </div>
                        <small className="text-muted">Duration</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        className="p-3 rounded text-center h-100"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(40, 167, 69, 0.05))",
                          border: "1px solid rgba(40, 167, 69, 0.2)",
                        }}
                      >
                        <div className="mb-2">
                          <span style={{ fontSize: "1.5rem" }}>🏨</span>
                        </div>
                        <div className="fw-bold text-success mb-1">
                          {pkg.hotels || "Included"}
                        </div>
                        <small className="text-muted">Accommodation</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        className="p-3 rounded text-center h-100"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05))",
                          border: "1px solid rgba(220, 53, 69, 0.2)",
                        }}
                      >
                        <div className="mb-2">
                          <span style={{ fontSize: "1.5rem" }}>🎯</span>
                        </div>
                        <div className="fw-bold text-danger mb-1">
                          {pkg.activities || "Various"}
                        </div>
                        <small className="text-muted">Activities</small>
                      </div>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div
                    className="d-flex align-items-center justify-content-between p-3 rounded mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2"
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          stroke="#667eea"
                          strokeWidth="2"
                          fill="#667eea"
                        />
                      </svg>
                      <div>
                        <span className="fw-bold text-primary">
                          Highly Rated Package
                        </span>
                        <div className="small text-muted">
                          Based on customer reviews
                        </div>
                      </div>
                    </div>
                    <div className="text-warning fw-bold h5 mb-0">★ 4.8</div>
                  </div>

                  {/* Admin Actions */}
                  {isAdmin() && (
                    <div
                      className="p-4 rounded"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))",
                        border: "1px solid rgba(255, 193, 7, 0.2)",
                      }}
                    >
                      <h6 className="fw-bold text-warning mb-3">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="me-2"
                        >
                          <path
                            d="M12 1L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 1Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        Admin Actions
                      </h6>
                      <div className="d-flex gap-2 flex-wrap">
                        <button
                          className="admin-btn edit-btn"
                          onClick={() =>
                            navigate(`/admin/packages/edit/${pkg.id}`)
                          }
                        >
                          <span className="btn-icon">✏️</span>
                          <span className="btn-text">Edit Package</span>
                        </button>
                        <button
                          className="admin-btn delete-btn"
                          onClick={() => setShowModal(true)}
                        >
                          <span className="btn-icon">🗑️</span>
                          <span className="btn-text">Delete Package</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                  Are you sure you want to delete the package "{pkg.title}"?
                  This action cannot be undone.
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
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .package-detail-card:hover img {
          transform: scale(1.05);
        }

        /* Back Button */
        .back-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #667eea;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          background: rgba(255, 255, 255, 1);
          color: #5a67d8;
        }

        .back-btn:active {
          transform: translateY(0);
        }

        /* Admin Buttons */
        .admin-btn {
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .edit-btn {
          background: linear-gradient(135deg, #ffc107, #ff8f00);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
          background: linear-gradient(135deg, #e0a800, #ff6f00);
        }

        .delete-btn {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }

        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
          background: linear-gradient(135deg, #c82333, #a71e2a);
        }

        .admin-btn:active {
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

        .spinner-border {
          border-width: 3px;
        }

        .lh-base {
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }

          .back-btn {
            padding: 10px 20px;
            font-size: 12px;
          }

          .btn-text {
            display: none;
          }

          .admin-btn {
            padding: 8px 16px;
            font-size: 12px;
          }

          .admin-btn .btn-text {
            display: none;
          }

          .h3 {
            font-size: 1.5rem !important;
          }

          .fs-4 {
            font-size: 1.25rem !important;
          }

          .row.g-3 > * {
            margin-bottom: 1rem;
          }

          .modal-content {
            width: 95%;
            margin: 20px;
          }

          .modal-header {
            padding: 16px 20px 0;
          }

          .modal-body {
            padding: 12px 20px;
          }

          .modal-footer {
            padding: 0 20px 20px;
            flex-direction: column;
          }

          .modal-btn {
            width: 100%;
            margin-bottom: 8px;
          }

          .modal-btn:last-child {
            margin-bottom: 0;
          }
        }

        /* Hover effects for detail cards */
        .row.g-3 > div > div {
          transition: all 0.3s ease;
        }

        .row.g-3 > div > div:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

export default PackageDetailPage;
