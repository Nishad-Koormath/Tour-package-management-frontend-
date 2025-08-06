import React from "react";
import { MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg, index = 0 }) => {
  const gradientColors = [
    "rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)",
    "rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1)",
    "rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1)",
    "rgba(67, 233, 123, 0.1), rgba(56, 249, 215, 0.1)",
    "rgba(250, 112, 154, 0.1), rgba(254, 225, 64, 0.1)",
    "rgba(168, 237, 234, 0.1), rgba(254, 214, 227, 0.1)",
  ];

  return (
    <div
      className="package-card group"
      style={{
        background: `linear-gradient(135deg, ${gradientColors[index % 6]})`,
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        animationDelay: `${index * 0.1}s`,
        animation: "fadeInUp 0.8s ease-out forwards",
        opacity: 0,
        transform: "translateY(30px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
      }}
    >
      {/* Image Section */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "250px",
          background: "rgba(255, 255, 255, 0.1)",
          margin: "1rem",
          borderRadius: "15px",
        }}
      >
        <img
          src={pkg.cover_photo}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          style={{
            borderRadius: "15px",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            console.error("Failed to load package image");
          }}
        />

        {/* Overlay Gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "80px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
            borderRadius: "0 0 15px 15px",
          }}
        />

        {/* Price Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-2 text-white font-bold"
          style={{
            background: "linear-gradient(135deg, #43e97b, #38f9d7)",
            borderRadius: "25px",
            fontSize: "0.9rem",
            boxShadow: "0 4px 15px rgba(67, 233, 123, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          ₹{pkg.starting_price ? pkg.starting_price.toLocaleString() : "N/A"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-2">
        {/* Title */}
        <h2
          className="text-xl font-bold text-gray-800 mb-3 line-clamp-2"
          style={{
            lineHeight: "1.3",
            minHeight: "2.6em",
          }}
        >
          {pkg.title}
        </h2>

        {/* Package Details */}
        <div className="space-y-3 mb-4">
          {/* Location */}
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "50%",
                color: "white",
              }}
            >
              <MapPin size={16} />
            </div>
            <div className="flex-1">
              <small
                className="text-gray-500 block"
                style={{ fontSize: "0.75rem" }}
              >
                Location
              </small>
              <span className="text-gray-800 font-medium text-sm">
                {pkg.location || "Not specified"}
              </span>
            </div>
          </div>

          {/* Duration */}
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                borderRadius: "50%",
                color: "white",
              }}
            >
              <Calendar size={16} />
            </div>
            <div className="flex-1">
              <small
                className="text-gray-500 block"
                style={{ fontSize: "0.75rem" }}
              >
                Duration
              </small>
              <span className="text-gray-800 font-medium text-sm">
                {pkg.duration || "Contact for details"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/packages/${pkg.id}`}
          className="btn-primary group-hover:scale-105 transition-all duration-300 w-full flex items-center justify-center gap-3"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "15px",
            padding: "0.875rem 1.5rem",
            fontWeight: "600",
            fontSize: "0.95rem",
            textDecoration: "none",
            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.5)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.3)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          View Details
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>

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

        .package-card {
          animation-fill-mode: forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .package-card {
            margin: 0 0 1rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PackageCard;
