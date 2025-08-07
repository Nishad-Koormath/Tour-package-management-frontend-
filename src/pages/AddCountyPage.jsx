import { useState } from "react";
import axiosInstance from "../services/api";

function AddCountryPage() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    try {
      const response = await axiosInstance.post("/countries/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Country added successfully!");
      setName("");
    } catch (err) {
      toast.error("Error adding country");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Country</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Country
        </button>
      </form>
    </div>
  );
};

export default AddCountryPage;

