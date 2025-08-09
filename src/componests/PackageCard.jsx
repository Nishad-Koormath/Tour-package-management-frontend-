import React from "react";
import { MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }) => {
  const firstSchedule =
    pkg.schedules && pkg.schedules.length > 0 ? pkg.schedules[0] : null;

  return (
    <div className="package-card-container">
      <div className="package-card">
        {/* Image Container */}
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
          <div className="image-fallback">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="white" strokeWidth="2"/>
              <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2"/>
            </svg>
          </div>

          {/* Price Badge */}
          {firstSchedule && (
            <div className="price-badge">
              <span className="currency">₹</span>
              <span className="amount">{firstSchedule.amount?.toLocaleString()}</span>
            </div>
          )}



          {/* Hover Overlay */}
          <div className="hover-overlay">
            <div className="overlay-content">
              <div className="view-icon">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="overlay-text">Explore Package</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card-content">
          <div className="content-header">
            <h3 className="package-title">{pkg.title}</h3>
            
            <div className="package-info">
              <div className="info-item">
                <MapPin className="info-icon" />
                <span className="info-text">{pkg.destination_city_name}</span>
              </div>

              {firstSchedule && (
                <>
                  <div className="info-item">
                    <Calendar className="info-icon" />
                    <span className="info-text">
                      {firstSchedule.from_date} - {firstSchedule.to_date}
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className="package-description">{pkg.description}</p>
          </div>

          {/* Action Footer */}
          <div className="card-footer">
            {firstSchedule && (
              <div className="price-section">
                <span className="price-label">Starting from</span>
                <div className="price-display">
                  <DollarSign className="price-icon" />
                  <span className="price-amount">₹{firstSchedule.amount?.toLocaleString()}</span>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

      <style jsx>{`
        .package-card-container {
          height: 100%;
        }

        .package-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .package-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          border-radius: 20px;
        }

        .package-card:hover::before {
          opacity: 1;
        }

        .package-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        /* Image Container */
        .image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .price-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 8px 14px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          font-weight: 600;
          font-size: 14px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 2px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .currency {
          font-size: 12px;
          opacity: 0.9;
        }



        .hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
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
          text-align: center;
          color: white;
          transform: translateY(20px);
          transition: transform 0.3s ease 0.1s;
        }

        .package-card:hover .overlay-content {
          transform: translateY(0);
        }

        .view-icon {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .overlay-text {
          font-weight: 600;
          font-size: 16px;
        }

        /* Card Content */
        .card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        .content-header {
          flex: 1;
          margin-bottom: 20px;
        }

        .package-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .package-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-icon {
          width: 16px;
          height: 16px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .info-text {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .package-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        /* Card Footer */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
          gap: 16px;
        }

        .price-section {
          flex: 1;
        }

        .price-label {
          font-size: 12px;
          color: #64748b;
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .price-display {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .price-icon {
          width: 16px;
          height: 16px;
          color: #059669;
        }

        .price-amount {
          font-size: 18px;
          font-weight: 700;
          color: #059669;
        }



        /* Responsive Design */
        @media (max-width: 768px) {
          .image-container {
            height: 240px;
          }

          .card-content {
            padding: 20px;
          }

          .package-title {
            font-size: 18px;
          }

          .card-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .image-container {
            height: 200px;
          }

          .card-content {
            padding: 16px;
          }

          .package-info {
            gap: 6px;
          }

          .price-badge {
            padding: 6px 12px;
            font-size: 12px;
          }

          .favorite-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default PackageCard;