import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import publicAPI from "../services/publicAPI";

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please login first");
      navigate("/");
      return;
    }

    publicAPI
      .get("/countries/")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div 
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif'
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
                border: "2px solid rgba(255, 255, 255, 0.3)"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2"/>
                <path d="M12 2A15.3 15.3 0 0 1 16 12A15.3 15.3 0 0 1 12 22A15.3 15.3 0 0 1 8 12A15.3 15.3 0 0 1 12 2Z" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h1 className="display-5 fw-bold mb-3">Travel Destinations</h1>
          <p className="lead mb-4 opacity-75">
            Discover amazing countries for your next adventure
          </p>
          <div 
            className="d-inline-block px-4 py-2"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}
          >
            <span className="fw-bold fs-5">{countries.length}</span>
            <span className="ms-2 opacity-75">
              {countries.length === 1 ? 'Destination' : 'Destinations'} Available
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
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
              >
                <div 
                  className="spinner-border mb-3"
                  style={{ 
                    width: "3rem", 
                    height: "3rem",
                    color: "#667eea"
                  }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="text-dark mb-2">Loading Destinations</h5>
                <p className="text-muted">Please wait while we fetch amazing places...</p>
              </div>
            </div>
          </div>
        ) : countries.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div 
                className="p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
              >
                <div className="mb-4">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#6c757d" strokeWidth="2"/>
                    <line x1="2" y1="12" x2="22" y2="12" stroke="#6c757d" strokeWidth="2"/>
                    <path d="M12 2A15.3 15.3 0 0 1 16 12A15.3 15.3 0 0 1 12 22A15.3 15.3 0 0 1 8 12A15.3 15.3 0 0 1 12 2Z" stroke="#6c757d" strokeWidth="2"/>
                  </svg>
                </div>
                <h4 className="text-dark mb-3">No Destinations Found</h4>
                <p className="text-muted">We're working on adding amazing travel destinations. Check back soon!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {countries.map((country, index) => (
              <div key={country.id} className="col-lg-4 col-md-6">
                <div 
                  className="card border-0 h-100 country-card"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    cursor: "pointer",
                    overflow: "hidden"
                  }}
                >
                  {/* Country Image/Pattern Header */}
                  <div 
                    className="position-relative"
                    style={{
                      height: "120px",
                      background: `linear-gradient(135deg, ${
                        index % 6 === 0 ? '#667eea, #764ba2' :
                        index % 6 === 1 ? '#f093fb, #f5576c' :
                        index % 6 === 2 ? '#4facfe, #00f2fe' :
                        index % 6 === 3 ? '#43e97b, #38f9d7' :
                        index % 6 === 4 ? '#fa709a, #fee140' :
                        '#a8edea, #fed6e3'
                      })`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div 
                      className="text-white fw-bold"
                      style={{ 
                        fontSize: "2.5rem",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                      }}
                    >
                      {country.name.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* Decorative Pattern */}
                    <div 
                      className="position-absolute top-0 end-0 w-100 h-100 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    ></div>
                  </div>

                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title fw-bold text-dark mb-1">
                          {country.name}
                        </h5>
                        <p className="text-muted small mb-0">Travel Destination</p>
                      </div>
                      <span 
                        className="badge"
                        style={{
                          background: "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                          borderRadius: "10px",
                          padding: "0.5rem 0.75rem"
                        }}
                      >
                        ID: {country.id}
                      </span>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div 
                          className="p-2 rounded text-center"
                          style={{ background: "rgba(102, 126, 234, 0.1)" }}
                        >
                          <div className="text-primary fw-bold">✈️</div>
                          <small className="text-muted">Flights</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div 
                          className="p-2 rounded text-center"
                          style={{ background: "rgba(40, 167, 69, 0.1)" }}
                        >
                          <div className="text-success fw-bold">🏨</div>
                          <small className="text-muted">Hotels</small>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="d-flex align-items-center justify-content-center py-2 rounded"
                      style={{ 
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                        border: "1px solid rgba(102, 126, 234, 0.2)"
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" stroke="#667eea" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="#667eea" strokeWidth="2"/>
                      </svg>
                      <span className="fw-bold text-primary small">Explore Destination</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .country-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
        }

        .country-card:hover .card-body {
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

        .country-card {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .country-card:nth-child(1) { animation-delay: 0.1s; }
        .country-card:nth-child(2) { animation-delay: 0.2s; }
        .country-card:nth-child(3) { animation-delay: 0.3s; }
        .country-card:nth-child(4) { animation-delay: 0.4s; }
        .country-card:nth-child(5) { animation-delay: 0.5s; }
        .country-card:nth-child(6) { animation-delay: 0.6s; }

        .spinner-border {
          border-width: 3px;
        }

        @media (max-width: 768px) {
          .display-5 {
            font-size: 2rem !important;
          }
          
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default CountriesPage;