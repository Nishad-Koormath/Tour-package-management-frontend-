import EnquiryForm from "../componests/EnquiryForm";

function EnquiryPage() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
        padding: "40px 0",
      }}
    >
      <div className="container">
        {/* Header Section */}
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
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M9 9H15M9 13H15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="display-5 fw-bold mb-3">Submit Your Enquiry</h1>
          <p className="lead mb-4 opacity-75">
            Get in touch with us for personalized tour packages and travel
            assistance
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-md-4">
                  <div
                    className="p-3 rounded"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 16.92V19.92C22 20.51 21.39 21 20.83 21C9.28 21 0 11.72 0 0.17C0 -0.39 0.49 -1 1.08 -1H4.08C4.67 -1 5.08 -0.39 5.08 0.17V3.09C5.08 3.68 4.67 4.09 4.08 4.09H2.25C3.25 8.92 7.08 12.75 11.91 13.75V11.92C11.91 11.33 12.32 10.92 12.91 10.92H15.83C16.42 10.92 16.83 11.33 16.83 11.92C16.83 17.22 21.28 21.67 26.58 21.67C27.17 21.67 27.58 21.26 27.58 20.67V16.92C27.58 16.33 27.17 15.92 26.58 15.92Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <h6 className="fw-bold mb-1">Quick Response</h6>
                    <small className="opacity-75">24/7 Support</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="p-3 rounded"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 11H15M9 15H15M17 21L12 16L7 21V5C7 3.89 7.89 3 9 3H15C16.11 3 17 3.89 17 5V21Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <h6 className="fw-bold mb-1">Custom Packages</h6>
                    <small className="opacity-75">Tailored for You</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="p-3 rounded"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="mb-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L3 7L12 12L21 7L12 2Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M3 17L12 22L21 17"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M3 12L12 17L21 12"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <h6 className="fw-bold mb-1">Best Prices</h6>
                    <small className="opacity-75">Guaranteed</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <EnquiryForm />
          </div>
        </div>

        {/* Footer Info */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 text-center">
            <div
              className="p-4 rounded"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-2"
                    >
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <polyline
                        points="22,6 12,13 2,6"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                    <h6 className="fw-bold mb-1">Email Us</h6>
                    <small className="opacity-75">info@tourmanager.com</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-2"
                    >
                      <path
                        d="M22 16.92V19.92C22 20.51 21.39 21 20.83 21C9.28 21 0 11.72 0 0.17C0 -0.39 0.49 -1 1.08 -1H4.08C4.67 -1 5.08 -0.39 5.08 0.17V3.09C5.08 3.68 4.67 4.09 4.08 4.09H2.25C3.25 8.92 7.08 12.75 11.91 13.75V11.92C11.91 11.33 12.32 10.92 12.91 10.92H15.83C16.42 10.92 16.83 11.33 16.83 11.92C16.83 17.22 21.28 21.67 26.58 21.67C27.17 21.67 27.58 21.26 27.58 20.67V16.92C27.58 16.33 27.17 15.92 26.58 15.92Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                    <h6 className="fw-bold mb-1">Call Us</h6>
                    <small className="opacity-75">+91 98765 43210</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-2"
                    >
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                    <h6 className="fw-bold mb-1">Visit Us</h6>
                    <small className="opacity-75">Kozhikode, Kerala</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-control:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
          background: rgba(255, 255, 255, 0.95) !important;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6) !important;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

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

        .container > * {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @media (max-width: 768px) {
          .display-5 {
            font-size: 2rem !important;
          }

          .container {
            padding-left: 15px;
            padding-right: 15px;
          }

          .lead {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default EnquiryPage;
