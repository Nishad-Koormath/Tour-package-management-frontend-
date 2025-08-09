import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
  };

  // Custom Arrow Components with enhanced styling
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="carousel-arrow carousel-prev group"
      style={{
        position: "absolute",
        left: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        background: "rgba(0, 0, 0, 0.4)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        opacity: 0.85,
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(0, 0, 0, 0.7)";
        e.target.style.transform = "translateY(-50%) scale(1.15)";
        e.target.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
        e.target.style.opacity = "1";
        e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(0, 0, 0, 0.4)";
        e.target.style.transform = "translateY(-50%) scale(1)";
        e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
        e.target.style.opacity = "0.85";
        e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }}
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="carousel-arrow carousel-next group"
      style={{
        position: "absolute",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        background: "rgba(0, 0, 0, 0.4)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        opacity: 0.85,
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(0, 0, 0, 0.7)";
        e.target.style.transform = "translateY(-50%) scale(1.15)";
        e.target.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
        e.target.style.opacity = "1";
        e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(0, 0, 0, 0.4)";
        e.target.style.transform = "translateY(-50%) scale(1)";
        e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
        e.target.style.opacity = "0.85";
        e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }}
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const settingsWithCustomArrows = {
    ...settings,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="carousel-container relative overflow-hidden rounded-2xl shadow-2xl">
      <style jsx>{`
        .carousel-container {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .carousel-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.1) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .carousel-container .slick-slide {
          position: relative;
        }

        .carousel-container .slick-slide img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          border-radius: 0;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .carousel-container:hover .slick-slide img {
          transform: scale(1.05);
        }

        .carousel-container .slick-slide::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.05) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .carousel-container .custom-dots {
          bottom: 25px !important;
          z-index: 10;
        }

        .carousel-container .custom-dots li {
          width: 12px;
          height: 12px;
          margin: 0 8px;
        }

        .carousel-container .custom-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
          padding: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .carousel-container .custom-dots li button:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: scale(1.3);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .carousel-container .custom-dots li.slick-active button {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(255, 255, 255, 0.9);
          transform: scale(1.4);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(255, 255, 255, 0.2);
        }

        .carousel-container .custom-dots li button:before {
          display: none;
        }

        /* Enhanced mobile responsiveness */
        @media (max-width: 768px) {
          .carousel-container .slick-slide img {
            height: 250px;
          }
          
          .carousel-arrow {
            width: 48px !important;
            height: 48px !important;
          }
          
          .carousel-prev {
            left: 16px !important;
          }
          
          .carousel-next {
            right: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .carousel-container .slick-slide img {
            height: 200px;
          }
          
          .carousel-arrow {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
      
      <Slider {...settingsWithCustomArrows}>
        {images.map((slide, index) => (
          <div key={index} className="relative">
            <img 
              src={slide.src} 
              alt={slide.title || `Slide ${index + 1}`} 
              loading={index === 0 ? "eager" : "lazy"}
              className="select-none"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;