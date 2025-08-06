import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import publicAPI from "../services/publicAPI";

function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    publicAPI
      .get("/packages/")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetchin packages:", err);
        setLoading(false);
        if (err.response?.status === 401) {
          toast.error("Session expired. please login again.");
          navigate("/");
        }
      });
  }, [navigate]);

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      {/* Header */}
      <div className="container py-5">
        <div className="text-center text-white mb-5">
          <div className="mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <svg
                width="40"
                height="40"
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
                <path
                  d="M12 9V15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="display-5 fw-bold mb-3">Tour Packages</h1>
          <p className="lead mb-4 opacity-75">
            Discover amazing travel packages tailored for your perfect getaway
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
            <span className="fw-bold fs-5">{packages.length}</span>
            <span className="ms-2 opacity-75">
              {packages.length === 1 ? "Package" : "Packages"} Available
            </span>
          </div>
        </div>

        {/* Main Content */}
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
                <h5 className="text-dark mb-2">Loading Packages</h5>
                <p className="text-muted">
                  Please wait while we fetch amazing tour packages...
                </p>
              </div>
            </div>
          </div>
        ) : packages.length === 0 ? (
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
                    <path
                      d="M21 16V8C21 6.89 20.11 6 19 6H5C3.89 6 3 6.89 3 8V16C3 17.11 3.89 18 5 18H19C20.11 18 21 17.11 21 16Z"
                      stroke="#6c757d"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 12L12 15L17 12"
                      stroke="#6c757d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 9V15"
                      stroke="#6c757d"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h4 className="text-dark mb-3">No Packages Available</h4>
                <p className="text-muted">
                  We're working on creating amazing tour packages for you. Check
                  back soon!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="col-lg-4 col-md-6">
                <div
                  className="card border-0 h-100 package-card"
                  onClick={()=>navigate(`/packages/${pkg.id}`)}
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  {/* Package Image */}
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: "200px" }}
                  >
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
                        })`,
                      }}
                    >
                      <div className="text-center">
                        <svg
                          width="40"
                          height="40"
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
                        <p className="small mb-0 mt-2">Image</p>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div
                      className="position-absolute top-3 end-3"
                      style={{
                        background: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        borderRadius: "15px",
                        padding: "0.5rem 1rem",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span className="fw-bold">₹{pkg.price}</span>
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{
                        height: "60px",
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.3))",
                      }}
                    ></div>
                  </div>

                  <div className="card-body p-4">
                    <div className="mb-3">
                      <h5 className="card-title fw-bold text-dark mb-2">
                        {pkg.title}
                      </h5>
                      <p className="text-muted small mb-0 lh-base">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-4">
                        <div
                          className="p-2 rounded text-center"
                          style={{ background: "rgba(102, 126, 234, 0.1)" }}
                        >
                          <div className="text-primary fw-bold small">📅</div>
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Duration
                          </small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="p-2 rounded text-center"
                          style={{ background: "rgba(40, 167, 69, 0.1)" }}
                        >
                          <div className="text-success fw-bold small">🏨</div>
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Hotels
                          </small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="p-2 rounded text-center"
                          style={{ background: "rgba(220, 53, 69, 0.1)" }}
                        >
                          <div className="text-danger fw-bold small">🎯</div>
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Activities
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-between py-3 px-3 rounded"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="me-2"
                        >
                          <path
                            d="M9 11H15M9 15H15M17 21L12 16L7 21V5C7 3.89 7.89 3 9 3H15C16.11 3 17 3.89 17 5V21Z"
                            stroke="#667eea"
                            strokeWidth="2"
                          />
                        </svg>
                        <span className="fw-bold text-primary small">
                          View Details
                        </span>
                      </div>
                      <div className="text-success small fw-bold">★ 4.8</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .package-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
        }

        .package-card:hover img {
          transform: scale(1.1);
        }

        .package-card:hover .card-body {
          background: rgba(255, 255, 255, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .package-card {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .package-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .package-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .package-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .package-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        .package-card:nth-child(5) {
          animation-delay: 0.5s;
        }
        .package-card:nth-child(6) {
          animation-delay: 0.6s;
        }

        .spinner-border {
          border-width: 3px;
        }

        .lh-base {
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .display-5 {
            font-size: 2rem !important;
          }

          .container {
            padding-left: 15px;
            padding-right: 15px;
          }

          .col-lg-4 {
            margin-bottom: 1rem;
          }
        }

        /* Text truncation for long descriptions */
        .card-title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-body p {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default PackagesPage;
