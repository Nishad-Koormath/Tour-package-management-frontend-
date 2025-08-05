import { useState } from "react";
import { toast } from "react-toastify";
import { enquiriesAPI } from "../services/enquiriesAPI";

const EnquiryForm = ({ scheduleId = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    related_schedule: scheduleId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enquiriesAPI.create(formData);
      toast.success("Enquiry submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        related_schedule: scheduleId,
      });
    } catch (error) {
      toast.error("Failed to submit enquiry.");
      console.error("Submit error:", error);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit} className="enquiry-form">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Enquiry</button>
    </form>
  );
};

export default EnquiryForm;
