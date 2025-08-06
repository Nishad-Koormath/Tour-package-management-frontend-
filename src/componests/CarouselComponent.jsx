import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = () => {
  const images = [
    {
      src: "/carousel/slide1.jpg",
      title: "Discover Paradise",
      subtitle: "Explore breathtaking destinations around the world",
    },
    {
      src: "/carousel/slide2.jpg",
      title: "Adventure Awaits",
      subtitle: "Create unforgettable memories with our travel packages",
    },
    {
      src: "/carousel/slide3.jpg",
      title: "Journey Beyond",
      subtitle: "Experience the beauty of nature and culture",
    },
  ];

  const settings = {
    dots: true,
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

  // Custom Arrow Components
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="carousel-arrow carousel-prev"
      style={{
        position: "absolute",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        background: "rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "20px",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.3)";
        e.target.style.transform = "translateY(-50%) scale(1.1)";
        e.target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.2)";
        e.target.style.transform = "translateY(-50%) scale(1)";
        e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="carousel-arrow carousel-next"
      style={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 20,
        background: "rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "20px",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.3)";
        e.target.style.transform = "translateY(-50%) scale(1.1)";
        e.target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.2)";
        e.target.style.transform = "translateY(-50%) scale(1)";
        e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          strokeWidth="2"
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
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          minHeight: "500px",
          maxHeight: "800px",
          overflow: "hidden",
          borderRadius: "0 0 30px 30px",
          boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Slider {...settingsWithCustomArrows} className="styled-slider">
          {images.map((slide, index) => (
            <div key={index} className="slide-wrapper">
              <div
                className="slide-content"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "70vh",
                  minHeight: "500px",
                  maxHeight: "800px",
                }}
              >
                <img
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    // Fallback gradient background if image fails to load
                    e.target.style.display = "none";
                    e.target.parentElement.style.background = `linear-gradient(135deg, ${
                      index % 3 === 0
                        ? "#667eea, #764ba2"
                        : index % 3 === 1
                        ? "#43e97b, #38f9d7"
                        : "#f093fb, #f5576c"
                    })`;
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                    zIndex: 1,
                  }}
                />

                {/* Text Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "80px",
                    left: "50px",
                    right: "50px",
                    zIndex: 2,
                    color: "white",
                    textAlign: "left",
                  }}
                  className="slide-text"
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "20px",
                      padding: "2rem",
                      maxWidth: "600px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                        fontFamily: '"Roboto", sans-serif',
                        animation: `slideInUp 1s ease-out ${index * 0.2}s both`,
                      }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        opacity: 0.9,
                        lineHeight: 1.6,
                        margin: 0,
                        fontFamily: '"Roboto", sans-serif',
                        animation: `slideInUp 1s ease-out ${
                          index * 0.2 + 0.2
                        }s both`,
                      }}
                    >
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .carousel-container {
          position: relative;
          width: 100%;
          font-family: "Roboto", sans-serif;
        }

        .styled-slider {
          height: 100%;
        }

        .styled-slider .slick-dots {
          bottom: 30px;
          z-index: 10;
        }

        .styled-slider .slick-dots li button:before {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.7);
          background: transparent;
          content: "";
          transition: all 0.3s ease;
        }

        .styled-slider .slick-dots li.slick-active button:before {
          color: white;
          background: linear-gradient(135deg, #43e97b, #38f9d7);
          border-color: white;
          transform: scale(1.2);
          box-shadow: 0 4px 15px rgba(67, 233, 123, 0.4);
        }

        .styled-slider .slick-dots li:hover button:before {
          transform: scale(1.1);
          border-color: white;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slide-wrapper {
          animation: fadeIn 0.8s ease-in-out;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .carousel-wrapper {
            height: 50vh !important;
            min-height: 400px !important;
            border-radius: 0 0 20px 20px;
          }

          .slide-content {
            height: 50vh !important;
            min-height: 400px !important;
          }

          .slide-text {
            bottom: 40px !important;
            left: 20px !important;
            right: 20px !important;
          }

          .slide-text div {
            padding: 1.5rem !important;
            border-radius: 15px !important;
          }

          .slide-text h2 {
            font-size: 2rem !important;
            margin-bottom: 0.75rem !important;
          }

          .slide-text p {
            font-size: 1rem !important;
          }

          .carousel-arrow {
            width: 45px !important;
            height: 45px !important;
          }

          .carousel-prev {
            left: 15px !important;
          }

          .carousel-next {
            right: 15px !important;
          }
        }

        @media (max-width: 480px) {
          .carousel-wrapper {
            height: 45vh !important;
            min-height: 350px !important;
          }

          .slide-content {
            height: 45vh !important;
            min-height: 350px !important;
          }

          .slide-text {
            bottom: 30px !important;
            left: 15px !important;
            right: 15px !important;
          }

          .slide-text h2 {
            font-size: 1.5rem !important;
          }

          .carousel-arrow {
            width: 40px !important;
            height: 40px !important;
          }
        }

        /* Loading animation */
        .carousel-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          z-index: -1;
          border-radius: 0 0 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
