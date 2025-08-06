import React from "react";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={pkg.cover_photo}
        alt={pkg.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{pkg.title}</h2>

        <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {pkg.location}
        </p>

        <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Duration: {pkg.duration}
        </p>

        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          Starting from ₹{pkg.starting_price}
        </p>

        <Link
          to={`/packages/${pkg.id}`}
          className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
