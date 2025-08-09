import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import publicAPI from "../services/publicAPI";

const EnquiryForm = ({ scheduleId = null }) => {
  console.log('schedulId:', scheduleId)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    related_schedule: scheduleId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await publicAPI.post("/enquiries/",formData);
      toast.success("Enquiry submitted successfully!");
      navigate("/thankyou");
    } catch (error) {
      toast.error("Failed to submit enquiry.");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="card border-0 shadow-lg"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div className="card-body p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="form-label fw-bold text-dark mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="me-2"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#667eea"
                  strokeWidth="2"
                />
                <circle cx="12" cy="7" r="4" stroke="#667eea" strokeWidth="2" />
              </svg>
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                borderRadius: "15px",
                border: "2px solid #e9ecef",
                padding: "15px 20px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="form-label fw-bold text-dark mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="me-2"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#667eea"
                  strokeWidth="2"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="#667eea"
                  strokeWidth="2"
                />
              </svg>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                borderRadius: "15px",
                border: "2px solid #e9ecef",
                padding: "15px 20px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="form-label fw-bold text-dark mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="me-2"
              >
                <path
                  d="M22 16.92V19.92C22 20.51 21.39 21 20.83 21C9.28 21 0 11.72 0 0.17C0 -0.39 0.49 -1 1.08 -1H4.08C4.67 -1 5.08 -0.39 5.08 0.17V3.09C5.08 3.68 4.67 4.09 4.08 4.09H2.25C3.25 8.92 7.08 12.75 11.91 13.75V11.92C11.91 11.33 12.32 10.92 12.91 10.92H15.83C16.42 10.92 16.83 11.33 16.83 11.92C16.83 17.22 21.28 21.67 26.58 21.67C27.17 21.67 27.58 21.26 27.58 20.67V16.92C27.58 16.33 27.17 15.92 26.58 15.92Z"
                  stroke="#667eea"
                  strokeWidth="2"
                />
              </svg>
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                borderRadius: "15px",
                border: "2px solid #e9ecef",
                padding: "15px 20px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="form-label fw-bold text-dark mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="me-2"
              >
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="#667eea"
                  strokeWidth="2"
                />
              </svg>
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              placeholder="Tell us about your travel requirements..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              style={{
                borderRadius: "15px",
                border: "2px solid #e9ecef",
                padding: "15px 20px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                background: "rgba(255, 255, 255, 0.8)",
                resize: "vertical",
                minHeight: "120px",
              }}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-lg fw-bold text-white"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "15px",
                padding: "15px 30px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2"
                  >
                    <line
                      x1="22"
                      y1="2"
                      x2="11"
                      y2="13"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <polygon
                      points="22,2 15,22 11,13 2,9"
                      stroke="white"
                      strokeWidth="2"
                      fill="white"
                    />
                  </svg>
                  Submit Enquiry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
