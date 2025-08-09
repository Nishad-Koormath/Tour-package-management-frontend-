import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Your axios setup

export default function ScheduleCreate() {
  const [formData, setFormData] = useState({
    title: "",
    package: "",
    from_date: "",
    to_date: "",
    amount: "",
    description: "",
    schedule_photos: null,
  });

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axiosInstance.get("/packages/")
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scheduleData = new FormData();
    for (let key in formData) {
      scheduleData.append(key, formData[key]);
    }

    axiosInstance.post("/schedules/", scheduleData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        alert("Schedule created successfully!");
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Error creating schedule");
      });
  };

  return (
    <div>
      <h2>Create Schedule</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        <input
          type="text"
          name="title"
          placeholder="Schedule Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          required
        >
          <option value="">Select Package</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
          ))}
        </select>

        <input
          type="date"
          name="from_date"
          value={formData.from_date}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="to_date"
          value={formData.to_date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="file"
          name="schedule_photos"
          onChange={handleChange}
          accept="image/*"
          required
        />

        <button type="submit">Create Schedule</button>
      </form>
    </div>
  );
}
