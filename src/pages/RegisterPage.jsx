import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/accounts/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName
      });
      
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      if (error.response?.data) {
        const serverErrors = error.response.data;
        setErrors(serverErrors);
        
        // Show specific error messages
        if (serverErrors.username) {
          toast.error(`Username: ${serverErrors.username[0]}`);
        } else if (serverErrors.email) {
          toast.error(`Email: ${serverErrors.email[0]}`);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center py-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
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
                          d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                          stroke="#667eea"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="8.5"
                          cy="7"
                          r="4"
                          stroke="#667eea"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="17,11 19,13 23,9"
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
                      Create Account
                    </h2>
                    <p className="text-muted mb-0">
                      Join our tour management platform
                    </p>
                  </div>

                  {/* Register Form */}
                  <form onSubmit={handleRegister}>
                    {/* First Name and Last Name Row */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="firstName"
                          className="form-label text-muted small fw-bold"
                        >
                          FIRST NAME
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
                            id="firstName"
                            name="firstName"
                            type="text"
                            className={`form-control border-start-0 ps-0 ${errors.firstName ? 'is-invalid' : ''}`}
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            style={{
                              borderRadius: "0 10px 10px 0",
                              boxShadow: "none",
                              fontSize: "16px",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {errors.firstName && (
                          <small className="text-danger">{errors.firstName}</small>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="lastName"
                          className="form-label text-muted small fw-bold"
                        >
                          LAST NAME
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
                            id="lastName"
                            name="lastName"
                            type="text"
                            className={`form-control border-start-0 ps-0 ${errors.lastName ? 'is-invalid' : ''}`}
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            style={{
                              borderRadius: "0 10px 10px 0",
                              boxShadow: "none",
                              fontSize: "16px",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {errors.lastName && (
                          <small className="text-danger">{errors.lastName}</small>
                        )}
                      </div>
                    </div>

                    {/* Username */}
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
                              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                              stroke="#999"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                              stroke="#999"
                              strokeWidth="2"
                            />
                          </svg>
                        </span>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          className={`form-control border-start-0 ps-0 ${errors.username ? 'is-invalid' : ''}`}
                          placeholder="Choose a username"
                          value={formData.username}
                          onChange={handleInputChange}
                          style={{
                            borderRadius: "0 10px 10px 0",
                            boxShadow: "none",
                            fontSize: "16px",
                            padding: "12px 15px",
                          }}
                        />
                      </div>
                      {errors.username && (
                        <small className="text-danger">{errors.username}</small>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label text-muted small fw-bold"
                      >
                        EMAIL ADDRESS
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
                              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                              stroke="#999"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <polyline
                              points="22,6 12,13 2,6"
                              stroke="#999"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{
                            borderRadius: "0 10px 10px 0",
                            boxShadow: "none",
                            fontSize: "16px",
                            padding: "12px 15px",
                          }}
                        />
                      </div>
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>

                    {/* Password Row */}
                    <div className="row mb-4">
                      <div className="col-md-6">
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
                            name="password"
                            type="password"
                            className={`form-control border-start-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{
                              borderRadius: "0 10px 10px 0",
                              boxShadow: "none",
                              fontSize: "16px",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {errors.password && (
                          <small className="text-danger">{errors.password}</small>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label text-muted small fw-bold"
                        >
                          CONFIRM PASSWORD
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
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={`form-control border-start-0 ps-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            style={{
                              borderRadius: "0 10px 10px 0",
                              boxShadow: "none",
                              fontSize: "16px",
                              padding: "12px 15px",
                            }}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <small className="text-danger">{errors.confirmPassword}</small>
                        )}
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        disabled={isLoading}
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
                          opacity: isLoading ? 0.8 : 1,
                        }}
                        onMouseOver={(e) => {
                          if (!isLoading) {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow =
                              "0 6px 20px rgba(102, 126, 234, 0.6)";
                          }
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 15px rgba(102, 126, 234, 0.4)";
                        }}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Footer */}
                  <div className="text-center mt-4">
                    <p className="text-muted small mb-2">
                      Already have an account?{" "}
                      <span
                        className="text-primary"
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                        onClick={() => navigate("/login")}
                      >
                        Sign in here
                      </span>
                    </p>
                    <p className="text-muted small mb-0">
                      Secure registration for Tour Package Management
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

        .form-control.is-invalid {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }

        .input-group-text {
          background-color: #f8f9fa !important;
          border: 1px solid #dee2e6 !important;
        }

        .card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95) !important;
        }

        .text-primary:hover {
          color: #667eea !important;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 2rem !important;
          }
          
          .col-md-6 {
            margin-bottom: 1rem;
          }
          
          .col-md-6:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default RegisterPage;