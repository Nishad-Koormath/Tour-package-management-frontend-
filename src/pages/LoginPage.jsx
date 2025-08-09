import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div
                className="card shadow-lg border-0"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-5">
                  {/* Header with Icon */}
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L3 7L12 12L21 7L12 2Z"
                          stroke="#667eea"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 17L12 22L21 17"
                          stroke="#667eea"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 12L12 17L21 12"
                          stroke="#667eea"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2
                      className="card-title mb-1"
                      style={{ color: "#333", fontWeight: "600" }}
                    >
                      Welcome Back
                    </h2>
                    <p className="text-muted mb-0">
                      Sign in to your tour management account
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        className="form-label text-muted small fw-bold"
                      >
                        USERNAME
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text bg-light border-end-0"
                          style={{ borderRadius: "10px 0 0 10px" }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                              stroke="#999"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="12"
                              cy="7"
                              r="4"
                              stroke="#999"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <input
                          id="username"
                          type="text"
                          className="form-control border-start-0 ps-0"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          style={{
                            borderRadius: "0 10px 10px 0",
                            boxShadow: "none",
                            fontSize: "16px",
                            padding: "12px 15px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label text-muted small fw-bold"
                      >
                        PASSWORD
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text bg-light border-end-0"
                          style={{ borderRadius: "10px 0 0 10px" }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                              stroke="#999"
                              strokeWidth="2"
                            />
                            <circle cx="12" cy="16" r="1" fill="#999" />
                            <path
                              d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                              stroke="#999"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <input
                          id="password"
                          type="password"
                          className="form-control border-start-0 ps-0"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{
                            borderRadius: "0 10px 10px 0",
                            boxShadow: "none",
                            fontSize: "16px",
                            padding: "12px 15px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-lg text-white fw-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          borderRadius: "10px",
                          padding: "12px",
                          fontSize: "16px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 6px 20px rgba(102, 126, 234, 0.6)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 15px rgba(102, 126, 234, 0.4)";
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  {/* Footer */}
                  <div className="text-center mt-4">
                    <p className="text-muted small mb-0">
                      Secure login to Tour Package Management
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional styling */}
      <style jsx>{`
        .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
        }

        .input-group-text {
          background-color: #f8f9fa !important;
          border: 1px solid #dee2e6 !important;
        }

        .card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95) !important;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 2rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default LoginPage;
