import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
        padding: "2rem 1rem",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div
              className="text-center p-5"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {/* Success Icon */}
              <div className="mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                    borderRadius: "50%",
                    boxShadow: "0 8px 25px rgba(67, 233, 123, 0.4)",
                    animation: "bounce 1s ease-out 0.5s both",
                  }}
                >
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1
                className="display-5 fw-bold text-dark mb-4"
                style={{
                  lineHeight: "1.2",
                  animation: "fadeInUp 0.8s ease-out 0.2s both",
                }}
              >
                Thank You!
              </h1>

              {/* Subtitle */}
              <h2
                className="h4 text-primary mb-4"
                style={{
                  fontWeight: "600",
                  color: "#667eea !important",
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                }}
              >
                Your Enquiry Has Been Received
              </h2>

              {/* Message */}
              <p
                className="text-muted mb-5 lead"
                style={{
                  lineHeight: "1.6",
                  fontSize: "1.1rem",
                  animation: "fadeInUp 0.8s ease-out 0.6s both",
                }}
              >
                We've successfully received your enquiry and our travel experts
                will contact you shortly to help plan your perfect getaway.
              </p>

              {/* Info Card - Response Time Only */}
              <div
                className="row justify-content-center mb-5"
                style={{ animation: "fadeInUp 0.8s ease-out 0.8s both" }}
              >
                <div className="col-md-8 col-lg-6">
                  <div
                    className="p-3 rounded-3"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 6C11.448 6 11 6.448 11 7V12.414L8.293 15.121C7.902 15.512 7.902 16.145 8.293 16.536C8.684 16.927 9.317 16.927 9.708 16.536L12.708 13.536C12.895 13.349 13 13.089 13 12.828V7C13 6.448 12.552 6 12 6Z"
                          fill="#667eea"
                        />
                      </svg>
                      <div className="text-center">
                        <small
                          className="text-muted d-block"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Response Time
                        </small>
                        <strong className="text-dark small">
                          Within 24 hours
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center"
                style={{ animation: "fadeInUp 0.8s ease-out 1s both" }}
              >
                <Link
                  to="/packages"
                  className="btn btn-lg px-4 py-3 d-inline-flex align-items-center gap-2 text-decoration-none"
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    minWidth: "200px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px) scale(1.02)";
                    e.target.style.boxShadow =
                      "0 12px 30px rgba(102, 126, 234, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.4)";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                  </svg>
                  Browse More Packages
                </Link>

                <Link
                  to="/enquiries"
                  className="btn btn-outline-secondary btn-lg px-4 py-3 d-inline-flex align-items-center gap-2 text-decoration-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    color: "#667eea",
                    border: "2px solid rgba(102, 126, 234, 0.3)",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    minWidth: "200px",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(102, 126, 234, 0.1)";
                    e.target.style.borderColor = "#667eea";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.7)";
                    e.target.style.borderColor = "rgba(102, 126, 234, 0.3)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 11H15M9 15H15M17 21L12 16L7 21V5C7 3.89 7.89 3 9 3H15C16.11 3 17 3.89 17 5V21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  View My Enquiries
                </Link>
              </div>

              {/* Footer Note */}
              <div
                className="mt-4 pt-4"
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                  animation: "fadeInUp 0.8s ease-out 1.2s both",
                }}
              >
                <small className="text-muted">
                  Having questions? Feel free to contact our support team
                  anytime.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles - Add this to your CSS file or styled-jsx */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .min-vh-100 {
          min-height: 100vh;
        }

        .btn:focus {
          box-shadow: none !important;
        }

        @media (max-width: 768px) {
          .display-5 {
            font-size: 2rem !important;
          }

          .container {
            padding-left: 15px;
            padding-right: 15px;
          }

          .btn-lg {
            min-width: 160px !important;
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 576px) {
          .col-md-6 {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ThankYou;
