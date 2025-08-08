import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";

function EditPackage() {
  const navigate = useNavigate();
  const { id } = useParams(); // package id from route

  const [formData, setFormData] = useState({
    title: "",
    source_country: "",
    source_city: "",
    destination_country: "",
    destination_city: "",
    description: "",
    terms: "",
    photos: null,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPhoto, setCurrentPhoto] = useState("");

  // Fetch countries, cities, and existing package data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, citiesRes, packageRes] = await Promise.all([
          axiosInstance.get("/countries/"),
          axiosInstance.get("/countries/cities/"),
          axiosInstance.get(`/packages/${id}/`),
        ]);

        setCountries(countriesRes.data);
        setCities(citiesRes.data);

        // Set form data from API
        const packageData = packageRes.data;
        setFormData({
          title: packageData.title,
          source_country: packageData.source_country,
          source_city: packageData.source_city,
          destination_country: packageData.destination_country,
          destination_city: packageData.destination_city,
          description: packageData.description,
          terms: packageData.terms,
          photos: null, // keep null, user can change if needed
        });

        // Store current photo URL for display
        setCurrentPhoto(packageData.image || packageData.photos);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load package data");
        if (err.response?.status === 404) {
          navigate("/packages");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("source_country", formData.source_country);
    formDataObj.append("source_city", formData.source_city);
    formDataObj.append("destination_country", formData.destination_country);
    formDataObj.append("destination_city", formData.destination_city);
    formDataObj.append("terms", formData.terms);

    if (formData.photos) {
      formDataObj.append("photos", formData.photos);
    }

    try {
      await axiosInstance.put(`/packages/${id}/`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Package updated successfully");
      navigate("/packages");
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.error("Failed to update package");
    }
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          className="text-center p-5"
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
          <h5 className="text-dark mb-2">Loading Package Details</h5>
          <p className="text-muted">
            Please wait while we fetch the package information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <div className="container py-5">
        {/* Back Button */}
        <div className="mb-4">
          <button className="back-btn" onClick={() => navigate("/packages")}>
            <span className="btn-icon">←</span>
            <span className="btn-text">Back to Packages</span>
          </button>
        </div>

        {/* Header */}
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
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="display-5 fw-bold mb-3">Edit Tour Package</h1>
          <p className="lead mb-4 opacity-75">
            Update and enhance your travel package details
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
            <span className="fw-bold fs-6">✏️ Package Editor</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "25px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                animation: "slideUpFadeIn 0.6s ease-out forwards",
              }}
            >
              <div className="card-body p-5">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* Package Title */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">Package Information</h5>
                    <div className="form-group">
                      <label className="form-label">Package Title</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter an attractive package title"
                        required
                      />
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">Travel Route</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Source Country</label>
                        <select
                          className="form-control custom-select"
                          name="source_country"
                          value={formData.source_country}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose departure country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Source City</label>
                        <select
                          className="form-control custom-select"
                          name="source_city"
                          value={formData.source_city}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose departure city</option>
                          {cities
                            .filter(
                              (city) =>
                                city.country ===
                                parseInt(formData.source_country)
                            )
                            .map((city) => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
                          Destination Country
                        </label>
                        <select
                          className="form-control custom-select"
                          name="destination_country"
                          value={formData.destination_country}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose destination country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Destination City</label>
                        <select
                          className="form-control custom-select"
                          name="destination_city"
                          value={formData.destination_city}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose destination city</option>
                          {cities
                            .filter(
                              (city) =>
                                city.country ===
                                parseInt(formData.destination_country)
                            )
                            .map((city) => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">Package Details</h5>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control custom-textarea"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Describe the package highlights, activities, and what makes it special..."
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">Terms & Conditions</label>
                        <textarea
                          className="form-control custom-textarea"
                          name="terms"
                          value={formData.terms}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Enter terms and conditions, cancellation policy, what's included/excluded..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">Package Photo</h5>

                    {/* Current Photo Preview */}
                    {currentPhoto && (
                      <div className="current-photo-preview mb-3">
                        <label className="form-label">Current Photo</label>
                        <div
                          className="current-photo-container"
                          style={{
                            position: "relative",
                            borderRadius: "12px",
                            overflow: "hidden",
                            height: "200px",
                            border: "2px solid #e9ecef",
                          }}
                        >
                          <img
                            src={currentPhoto}
                            alt="Current package photo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-none align-items-center justify-content-center text-white"
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea, #764ba2)",
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
                              <p className="small mb-0 mt-2">Current Image</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* New Photo Upload */}
                    <div className="upload-area">
                      <input
                        type="file"
                        className="form-control custom-file-input"
                        name="photos"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      <div className="upload-placeholder">
                        <div className="upload-icon">🔄</div>
                        <p className="mb-1">
                          {currentPhoto
                            ? "Click to upload new photo (optional)"
                            : "Click to upload package photo"}
                        </p>
                        <small className="text-muted">
                          JPG, PNG or GIF (Max 5MB)
                          {currentPhoto && (
                            <>
                              <br />
                              Leave empty to keep current photo
                            </>
                          )}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3 justify-content-end">
                    <button
                      type="button"
                      className="btn-custom btn-secondary"
                      onClick={() => navigate("/packages")}
                    >
                      <span className="btn-icon">❌</span>
                      <span className="btn-text">Cancel</span>
                    </button>
                    <button type="submit" className="btn-custom btn-primary">
                      <span className="btn-icon">💾</span>
                      <span className="btn-text">Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Back Button */
        .back-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #667eea;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          background: rgba(255, 255, 255, 1);
          color: #5a67d8;
        }

        .back-btn:active {
          transform: translateY(0);
        }

        /* Section Styling */
        .form-section {
          position: relative;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .form-section:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .section-title {
          color: #667eea;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title::before {
          content: "";
          width: 4px;
          height: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        /* Form Controls */
        .form-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .custom-input,
        .custom-select,
        .custom-textarea {
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #fff;
        }

        .custom-input:focus,
        .custom-select:focus,
        .custom-textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
          outline: none;
        }

        .custom-textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* Current Photo Preview */
        .current-photo-preview {
          margin-bottom: 20px;
        }

        .current-photo-container {
          transition: all 0.3s ease;
        }

        .current-photo-container:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        /* File Upload Styling */
        .upload-area {
          position: relative;
          border: 2px dashed #dee2e6;
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .upload-area:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .custom-file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          border: none !important;
          background: transparent !important;
        }

        .upload-placeholder {
          pointer-events: none;
        }

        .upload-icon {
          font-size: 2rem;
          margin-bottom: 12px;
          opacity: 0.7;
        }

        /* Custom Buttons */
        .btn-custom {
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          min-width: 140px;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #5a6fd8, #6c42a0);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #6c757d, #495057);
          color: white;
          box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
          background: linear-gradient(135deg, #5a6268, #343a40);
        }

        .btn-custom:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 16px;
        }

        .btn-text {
          font-weight: 600;
        }

        /* Loading Spinner */
        .spinner-border {
          width: 3rem;
          height: 3rem;
          border-width: 0.3em;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }

          .card-body {
            padding: 30px 20px !important;
          }

          .back-btn {
            padding: 10px 20px;
            font-size: 12px;
          }

          .back-btn .btn-text {
            display: none;
          }

          .btn-custom {
            padding: 10px 20px;
            font-size: 13px;
            min-width: 120px;
          }

          .upload-area {
            padding: 30px 15px;
          }

          .d-flex.gap-3 {
            flex-direction: column;
          }

          .btn-custom {
            width: 100%;
          }

          .display-5 {
            font-size: 2rem !important;
          }

          .current-photo-container {
            height: 150px !important;
          }
        }

        /* Form Validation Styling */
        .form-control:invalid {
          border-color: #dc3545;
        }

        .form-control:valid {
          border-color: #28a745;
        }

        /* Smooth Transitions */
        * {
          transition: all 0.3s ease;
        }

        /* Custom Scrollbar */
        .custom-textarea::-webkit-scrollbar {
          width: 6px;
        }

        .custom-textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .custom-textarea::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .custom-textarea::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}

export default EditPackage;
