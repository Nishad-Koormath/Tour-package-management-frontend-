import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import CarouselComponent from "../componests/CarouselComponent";
import { Link } from "react-router-dom";
import PackageCard from "../componests/PackageCard";

function HomePage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get("/packages/");
        setPackages(response.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const myImages = [
    {
      src: "https://www.travelandleisure.com/thmb/ip03-TS_bwMVg8elPNZ8pKaEOO8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mt-fuji-japan-MOSTBEAUTIFUL0921-413f7d67bb4f4539a336ebba14f74ed2.jpg",
      title: "My Title 1",
    },
    {
      src: "https://www.travelandleisure.com/thmb/p1Dh0uzZPUk8lQQq2oMhVMUQESk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lofoten-islands-norway-MOSTBEAUTIFUL0921-cd0b88063a8b4a26871a51764db0fcae.jpg",
      title: "My Title 2",
    },
    {
      src: "https://hips.hearstapps.com/bestproducts/assets/17/23/1496678686-rainbow-mountains-china.jpg",
      title: "My Title 3",
    },
  ];

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      {/* Hero Section with Carousel */}
      <div className="position-relative">
        <CarouselComponent images={myImages} />
      </div>

      {/* Top Packages Section */}
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
                  d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h2 className="display-4 fw-bold mb-3">Top Packages</h2>
          <p className="lead mb-4 opacity-75">
            Discover our most popular travel destinations and experiences
          </p>
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
              <h5 className="text-dark mb-2">Loading Packages</h5>
              <p className="text-muted">
                Please wait while we fetch the best packages for you...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Packages Grid */}
            <div
              className="p-4 mb-5"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <div className="row g-4">
                {packages.length > 0 ? (
                  packages.map((pkg, index) => (
                    <div key={pkg.id} className="col-lg-4 col-md-6">
                      <div
                        className="package-card h-100"
                        style={{
                          background: `linear-gradient(135deg, ${
                            index % 3 === 0
                              ? "rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)"
                              : index % 3 === 1
                              ? "rgba(67, 233, 123, 0.1), rgba(56, 249, 215, 0.1)"
                              : "rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1)"
                          })`,
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          borderRadius: "15px",
                          padding: "1.5rem",
                          backdropFilter: "blur(5px)",
                          transition:
                            "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                          animation: `fadeInUp 0.6s ease-out forwards`,
                          animationDelay: `${index * 0.2}s`,
                          opacity: 0,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          (window.location.href = `/packages/${pkg.id}`)
                        }
                      >
                        <PackageCard pkg={pkg} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
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
                      </svg>
                    </div>
                    <h4 className="text-dark mb-3">No Packages Available</h4>
                    <p className="text-muted">
                      We're working on bringing you amazing travel packages.
                      Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* View All Packages Button */}
            <div className="text-center">
              <Link
                to="/packages"
                className="btn btn-lg px-5 py-3 d-inline-flex align-items-center gap-3"
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "50px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(-5px) scale(1.05)";
                  e.target.style.boxShadow =
                    "0 15px 35px rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "none";
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
                View All Packages
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="container pb-5">
        <div
          className="p-5 rounded-4"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <div className="text-center mb-5">
            <h3 className="h2 fw-bold text-dark mb-3">Why Choose Us?</h3>
            <p className="text-muted lead">
              We make your travel dreams come true with exceptional service
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "50%",
                  color: "white",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-dark fw-bold mb-3">Best Quality</h4>
              <p className="text-muted">
                Premium travel experiences with attention to every detail
              </p>
            </div>

            <div className="col-md-4 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                  borderRadius: "50%",
                  color: "white",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="text-dark fw-bold mb-3">24/7 Support</h4>
              <p className="text-muted">
                Round-the-clock customer support for your peace of mind
              </p>
            </div>

            <div className="col-md-4 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #f093fb, #f5576c)",
                  borderRadius: "50%",
                  color: "white",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="text-dark fw-bold mb-3">Best Prices</h4>
              <p className="text-muted">
                Competitive pricing with no hidden costs or surprises
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .package-card {
          position: relative;
        }

        .package-card * {
          pointer-events: none;
        }

        .package-card a {
          pointer-events: all;
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

        .package-card {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .package-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .package-card:nth-child(2) {
          animation-delay: 0.3s;
        }
        .package-card:nth-child(3) {
          animation-delay: 0.5s;
        }

        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem !important;
          }

          .display-4 {
            font-size: 2rem !important;
          }

          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
        }

        /* Carousel overlay positioning */
        .position-relative .position-absolute {
          pointer-events: none;
        }

        .position-relative .position-absolute .btn,
        .position-relative .position-absolute a {
          pointer-events: all;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
