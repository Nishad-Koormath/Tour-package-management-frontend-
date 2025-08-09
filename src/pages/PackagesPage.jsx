import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import publicAPI from "../services/publicAPI";
import { isAdmin } from "../utils/auth";

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
        <div className="text-center text-white mb-5 header-section">
          <div className="mb-4">
            <div className="header-icon-container">
              <div className="icon-background">
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
          </div>
          <h1 className="display-4 fw-bold mb-3 title-text">Tour Packages</h1>
          <p className="lead mb-4 opacity-90 subtitle-text">
            Discover amazing travel packages tailored for your perfect getaway
          </p>
          <div className="package-counter">
            <span className="counter-number">{packages.length}</span>
            <span className="counter-text">
              {packages.length === 1 ? "Package" : "Packages"} Available
            </span>
          </div>
        </div>

        {/* Add Package Button - Only visible to admins */}
        {isAdmin() && (
          <div className="d-flex justify-content-end mb-4">
            <button
              className="add-package-btn"
              onClick={() => navigate("/admin/packages/add")}
            >
              <div className="btn-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="btn-text">Add Package</span>
            </button>
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="loading-container">
                <div className="loading-spinner">
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                </div>
                <h5 className="text-dark mb-3 mt-4 fw-bold">
                  Loading Packages
                </h5>
                <p className="text-muted">
                  Please wait while we fetch amazing tour packages...
                </p>
              </div>
            </div>
          </div>
        ) : packages.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="empty-state">
                <div className="empty-icon">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 16V8C21 6.89 20.11 6 19 6H5C3.89 6 3 6.89 3 8V16C3 17.11 3.89 18 5 18H19C20.11 18 21 17.11 21 16Z"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 12L12 15L17 12"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="text-dark mb-3 fw-bold">
                  No Packages Available
                </h4>
                <p className="text-muted">
                  We're working on creating amazing tour packages for you. Check
                  back soon!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="package-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="package-card"
                  onClick={() => navigate(`/packages/${pkg.id}`)}
                >
                  {/* Package Image */}
                  <div className="image-container">
                    <img
                      src={pkg.photos}
                      alt={pkg.title}
                      className="package-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />

                    {/* Fallback gradient background */}
                    <div
                      className="image-fallback"
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
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
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
                    </div>

                    {/* Price Badge */}
                    <div className="price-badge">
                      <span className="currency">₹</span>
                      <span className="amount">
                        {pkg.schedules && pkg.schedules.length > 0
                          ? pkg.schedules[0].amount?.toLocaleString()
                          : "N/A"}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="hover-overlay">
                      <div className="overlay-content">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 12L12 15L9 12M12 15V9"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="2"
                            strokeOpacity="0.3"
                          />
                        </svg>
                        <span>View Details</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <div className="content-header">
                      <h5 className="package-title">{pkg.title}</h5>
                      <p className="package-description">{pkg.description}</p>
                    </div>

                    <div className="action-bar">
                      <div className="action-content">
                        <div className="action-icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M9 11H15M9 15H15M17 21L12 16L7 21V5C7 3.89 7.89 3 9 3H15C16.11 3 17 3.89 17 5V21Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <span className="action-text">Explore Package</span>
                      </div>
                      <div className="arrow-icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        /* Header Styles */
        .header-section {
          position: relative;
          z-index: 2;
        }

        .header-icon-container {
          perspective: 1000px;
        }

        .icon-background {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .title-text {
          background: linear-gradient(135deg, #ffffff, #f8f9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .subtitle-text {
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .package-counter {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 16px 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .counter-number {
          font-weight: 700;
          font-size: 1.5rem;
          color: #ffffff;
          margin-right: 12px;
        }

        .counter-text {
          font-weight: 500;
          opacity: 0.9;
        }

        /* Add Package Button */
        .add-package-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          color: white;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          text-decoration: none;
          border: 2px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .add-package-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .add-package-btn:hover::before {
          left: 100%;
        }

        .add-package-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, #059669, #047857);
        }

        .btn-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .add-package-btn:hover .btn-icon-wrapper {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(180deg);
        }

        /* Loading Styles */
        .loading-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .loading-spinner {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }

        .spinner-ring {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 6px solid transparent;
          border-radius: 50%;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .spinner-ring:nth-child(1) {
          border-top-color: #667eea;
          animation-delay: -0.45s;
        }

        .spinner-ring:nth-child(2) {
          border-top-color: #764ba2;
          animation-delay: -0.3s;
        }

        .spinner-ring:nth-child(3) {
          border-top-color: #f093fb;
          animation-delay: -0.15s;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Empty State */
        .empty-state {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .empty-icon {
          margin-bottom: 2rem;
          opacity: 0.6;
        }

        /* Packages Grid */
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .package-item {
          animation: fadeInUp 0.6s ease-out both;
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

        /* Package Card */
        .package-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .package-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.05),
            rgba(118, 75, 162, 0.05)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .package-card:hover::before {
          opacity: 1;
        }

        .package-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        /* Image Container */
        .image-container {
          position: relative;
          height: 240px;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
        }

        .package-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .package-card:hover .package-image {
          transform: scale(1.1);
        }

        .image-fallback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .price-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          font-weight: 600;
          font-size: 14px;
          z-index: 3;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .currency {
          opacity: 0.8;
          margin-right: 2px;
        }

        .hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .package-card:hover .hover-overlay {
          opacity: 1;
        }

        .overlay-content {
          color: white;
          text-align: center;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .package-card:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-content svg {
          margin-bottom: 8px;
        }

        /* Card Content */
        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        .content-header {
          flex: 1;
          margin-bottom: 1rem;
        }

        .package-title {
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .package-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        .action-bar {
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.1),
            rgba(118, 75, 162, 0.1)
          );
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .package-card:hover .action-bar {
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.15),
            rgba(118, 75, 162, 0.15)
          );
          border-color: rgba(102, 126, 234, 0.3);
        }

        .action-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-icon {
          color: #667eea;
        }

        .action-text {
          color: #667eea;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .arrow-icon {
          color: #667eea;
          transition: transform 0.3s ease;
        }

        .package-card:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .packages-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .display-4 {
            font-size: 2rem !important;
          }

          .container {
            padding-left: 15px;
            padding-right: 15px;
          }

          .add-package-btn {
            padding: 12px 24px;
          }

          .btn-text {
            display: none;
          }

          .package-counter {
            padding: 12px 24px;
          }

          .counter-number {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .packages-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .image-container {
            height: 200px;
          }

          .card-content {
            padding: 1.25rem;
          }

          .icon-background {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
}

export default PackagesPage;