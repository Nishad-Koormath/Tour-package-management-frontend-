import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        <div className="container">
          {/* Brand */}
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center me-2"
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "12px",
                color: "white",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            TravelHub
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "12px",
              padding: "0.5rem",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-2">
                <Link
                  className={`nav-link px-3 py-2 rounded-pill fw-semibold transition-all ${
                    isActive("/") ? "active-link" : "nav-link-custom"
                  }`}
                  to="/"
                  style={{
                    ...(isActive("/")
                      ? {
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                        }
                      : {
                          color: "#667eea",
                          transition: "all 0.3s ease",
                        }),
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-1"
                  >
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <polyline
                      points="9,22 9,12 15,12 15,22"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li className="nav-item me-2">
                <Link
                  className={`nav-link px-3 py-2 rounded-pill fw-semibold ${
                    isActive("/packages") ? "active-link" : "nav-link-custom"
                  }`}
                  to="/packages"
                  style={{
                    ...(isActive("/packages")
                      ? {
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                        }
                      : {
                          color: "#667eea",
                          transition: "all 0.3s ease",
                        }),
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-1"
                  >
                    <path
                      d="M21 16V8C21 6.89 20.11 6 19 6H5C3.89 6 3 6.89 3 8V16C3 17.11 3.89 18 5 18H19C20.11 18 21 17.11 21 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 12L12 15L17 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 9V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Packages
                </Link>
              </li>
              <li className="nav-item me-2">
                <Link
                  className={`nav-link px-3 py-2 rounded-pill fw-semibold ${
                    isActive("/enquiries") ? "active-link" : "nav-link-custom"
                  }`}
                  to="/enquiries"
                  style={{
                    ...(isActive("/enquiries")
                      ? {
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                        }
                      : {
                          color: "#667eea",
                          transition: "all 0.3s ease",
                        }),
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-1"
                  >
                    <path
                      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60568 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Enquiry
                </Link>
              </li>

              {/* Authentication Section */}
              <li className="nav-item ms-2">
                {token ? (
                  <div className="d-flex align-items-center">
                    <Link
                      className={`nav-link px-3 py-2 rounded-pill fw-semibold me-2 ${
                        isActive("/admin") ? "active-link" : "nav-link-custom"
                      }`}
                      to="/admin"
                      style={{
                        ...(isActive("/admin")
                          ? {
                              background:
                                "linear-gradient(135deg, #667eea, #764ba2)",
                              color: "white",
                            }
                          : {
                              color: "#667eea",
                              transition: "all 0.3s ease",
                            }),
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-1"
                      >
                        <path
                          d="M12 15C15.866 15 19 12.31 19 9C19 5.69 15.866 3 12 3C8.13401 3 5 5.69 5 9C5 12.31 8.13401 15 12 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Admin
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-danger rounded-pill px-3 py-2 fw-semibold"
                      style={{
                        borderColor: "#dc3545",
                        color: "#dc3545",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-1"
                      >
                        <path
                          d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polyline
                          points="16,17 21,12 16,7"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="21"
                          y1="12"
                          x2="9"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    className="btn rounded-pill px-4 py-2 fw-semibold"
                    to="/login"
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "white",
                      border: "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="me-1"
                    >
                      <path
                        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="10,17 15,12 10,7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="15"
                        y1="12"
                        x2="3"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .nav-link-custom:hover {
          background: rgba(102, 126, 234, 0.1) !important;
          color: #667eea !important;
          transform: translateY(-2px);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-outline-danger:hover {
          background: #dc3545 !important;
          color: white !important;
        }

        .navbar-brand:hover {
          transform: translateY(-2px);
        }

        body {
          padding-top: 80px; /* Account for fixed navbar */
        }

        @media (max-width: 768px) {
          .navbar-nav {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 15px;
            padding: 1rem;
            margin-top: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          .nav-item {
            margin-bottom: 0.5rem;
          }

          .nav-link {
            text-align: center;
          }
        }

        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}

export default Navbar;
