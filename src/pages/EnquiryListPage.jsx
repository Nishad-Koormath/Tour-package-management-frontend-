import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";

const EnquiryListPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/enquiries/")
      .then((res) => {
        setEnquiries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching enquiries:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <div className="container py-5">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9H15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13H12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="display-4 fw-bold mb-3">Customer Enquiries</h1>
          <p className="lead mb-4 opacity-75">
            Manage and review all customer enquiries and requests
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
            <span className="fw-bold fs-5">{enquiries.length}</span>
            <span className="ms-2 opacity-75">
              {enquiries.length === 1 ? "Enquiry" : "Enquiries"} Total
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="p-5"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                display: "inline-block",
              }}
            >
              <div
                className="spinner-border mb-3"
                style={{
                  width: "3rem",
                  height: "3rem",
                  color: "#667eea",
                  borderWidth: "3px",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5 className="text-dark mb-2">Loading Enquiries</h5>
              <p className="text-muted">
                Please wait while we fetch all customer enquiries...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Enquiries Content */}
            <div
              className="p-4"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              {enquiries.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                        stroke="#6c757d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="text-dark mb-3">No Enquiries Found</h4>
                  <p className="text-muted">
                    No customer enquiries have been submitted yet. Check back
                    later!
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="d-none d-lg-block">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                              border: "1px solid rgba(102, 126, 234, 0.2)",
                            }}
                          >
                            <th className="fw-bold text-primary border-0 py-3">
                              Name
                            </th>
                            <th className="fw-bold text-primary border-0 py-3">
                              Email
                            </th>
                            <th className="fw-bold text-primary border-0 py-3">
                              Phone
                            </th>
                            <th className="fw-bold text-primary border-0 py-3">
                              Message
                            </th>
                            <th className="fw-bold text-primary border-0 py-3">
                              Related Schedule
                            </th>
                            <th className="fw-bold text-primary border-0 py-3">
                              Created At
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiries.map((enquiry, index) => (
                            <tr
                              key={enquiry.id}
                              className="enquiry-row"
                              style={{
                                animation: `fadeInUp 0.6s ease-out forwards`,
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0,
                              }}
                            >
                              <td className="border-0 py-3">
                                <div className="fw-bold text-dark">
                                  {enquiry.name}
                                </div>
                              </td>
                              <td className="border-0 py-3">
                                <span className="text-muted">
                                  {enquiry.email}
                                </span>
                              </td>
                              <td className="border-0 py-3">
                                <span className="text-muted">
                                  {enquiry.phone}
                                </span>
                              </td>
                              <td className="border-0 py-3">
                                <div
                                  className="text-muted"
                                  style={{
                                    maxWidth: "200px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                  title={enquiry.message}
                                >
                                  {enquiry.message}
                                </div>
                              </td>
                              <td className="border-0 py-3">
                                <span className="text-muted">
                                  {enquiry.related_schedule || "N/A"}
                                </span>
                              </td>
                              <td className="border-0 py-3">
                                <small className="text-muted">
                                  {new Date(
                                    enquiry.created_at
                                  ).toLocaleDateString()}
                                  <br />
                                  <span className="opacity-75">
                                    {new Date(
                                      enquiry.created_at
                                    ).toLocaleTimeString()}
                                  </span>
                                </small>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Card View */}
                  <div className="d-lg-none">
                    <div className="row g-4">
                      {enquiries.map((enquiry, index) => (
                        <div key={enquiry.id} className="col-12">
                          <div
                            className="enquiry-card p-4 h-100"
                            style={{
                              background: `linear-gradient(135deg, ${
                                index % 3 === 0
                                  ? "rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05)"
                                  : index % 3 === 1
                                  ? "rgba(67, 233, 123, 0.05), rgba(56, 249, 215, 0.05)"
                                  : "rgba(240, 147, 251, 0.05), rgba(245, 87, 108, 0.05)"
                              })`,
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                              borderRadius: "15px",
                              backdropFilter: "blur(5px)",
                              transition:
                                "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                              animation: `fadeInUp 0.6s ease-out forwards`,
                              animationDelay: `${index * 0.1}s`,
                              opacity: 0,
                            }}
                          >
                            <div className="d-flex align-items-start mb-3">
                              <div
                                className="d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  background: `linear-gradient(135deg, ${
                                    index % 3 === 0
                                      ? "#667eea, #764ba2"
                                      : index % 3 === 1
                                      ? "#43e97b, #38f9d7"
                                      : "#f093fb, #f5576c"
                                  })`,
                                  borderRadius: "50%",
                                  color: "white",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                }}
                              >
                                {enquiry.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="fw-bold text-dark mb-1">
                                  {enquiry.name}
                                </h6>
                                <small className="text-muted">
                                  {new Date(
                                    enquiry.created_at
                                  ).toLocaleDateString()}
                                </small>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="row g-2">
                                <div className="col-12">
                                  <div className="d-flex align-items-center mb-2">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="me-2 text-primary"
                                    >
                                      <path
                                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <polyline
                                        points="22,6 12,13 2,6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <small className="text-muted">
                                      {enquiry.email}
                                    </small>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-flex align-items-center mb-2">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="me-2 text-success"
                                    >
                                      <path
                                        d="M22 16.92V19.92C22 20.92 21.11 21.92 20 21.92C8.85 21.92 0 13.07 0 1.92C0 0.92 1 0 2 0H5C6.11 0 7 0.89 7 2V5C7 6.11 6.11 7 5 7H3C3 13.07 7.93 18 14 18V16C14 14.89 14.89 14 16 14H19C20.11 14 21 14.89 21 16V19.92Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <small className="text-muted">
                                      {enquiry.phone}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <h6 className="fw-bold text-dark mb-2">
                                Message:
                              </h6>
                              <p
                                className="text-muted mb-0"
                                style={{ fontSize: "14px", lineHeight: "1.5" }}
                              >
                                {enquiry.message}
                              </p>
                            </div>

                            {enquiry.related_schedule && (
                              <div
                                className="p-2 rounded"
                                style={{
                                  background: "rgba(102, 126, 234, 0.1)",
                                  border: "1px solid rgba(102, 126, 234, 0.2)",
                                }}
                              >
                                <small className="text-primary fw-bold">
                                  Related Schedule: {enquiry.related_schedule}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Custom Styles */}
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

        .enquiry-row:hover {
          background: rgba(102, 126, 234, 0.05) !important;
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .enquiry-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .table {
          border-collapse: separate;
          border-spacing: 0 8px;
        }

        .table tbody tr {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .table tbody tr:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .table tbody tr td:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .table tbody tr td:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem !important;
          }

          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
        }

        .spinner-border {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default EnquiryListPage;
