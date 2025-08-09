import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
        setIsAdmin(decoded.is_superuser);
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top modern-navbar">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand brand-link" to="/">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="brand-text">TravelHub</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="toggler-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link
                  className={`nav-link modern-nav-link ${isActive("/") ? "active" : ""}`}
                  to="/"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <polyline
                      points="9,22 9,12 15,12 15,22"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link modern-nav-link ${isActive("/packages") ? "active" : ""}`}
                  to="/packages"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 16V8C21 6.89 20.11 6 19 6H5C3.89 6 3 6.89 3 8V16C3 17.11 3.89 18 5 18H19C20.11 18 21 17.11 21 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 12L12 15L17 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Packages</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link modern-nav-link ${isActive("/enquiry") ? "active" : ""}`}
                  to="/enquiry"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60568 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Enquiry</span>
                </Link>
              </li>

              {/* Admin Dropdown */}
              {isAdmin && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle admin-dropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15C15.866 15 19 12.31 19 9C19 5.69 15.866 3 12 3C8.13401 3 5 5.69 5 9C5 12.31 8.13401 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>Admin</span>
                  </a>
                  <ul className="dropdown-menu admin-dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/enquiries">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15V6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M18.5 18A2.5 2.5 0 0 1 21 20.5A2.5 2.5 0 0 1 18.5 23A2.5 2.5 0 0 1 16 20.5A2.5 2.5 0 0 1 18.5 18Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 12H3" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 6H3" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 18H3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        View Enquiries
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/admin/packages/add">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Add Package
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/add-cities">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Add City
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/add-country">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Add Country
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              {/* User Section */}
              <li className="nav-item user-section">
                {token ? (
                  <div className="user-info">
                    <div className="user-avatar">
                      <span>{username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="user-details">
                      <span className="username">{username}</span>
                      {isAdmin && <span className="user-badge">Admin</span>}
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2"/>
                        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link className="login-btn" to="/login">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2"/>
                      <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        /* Global Styles */
        body {
          padding-top: 80px;
        }

        /* Modern Navbar */
        .modern-navbar {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 70px;
          padding: 0.75rem 0;
        }

        /* Brand Styling */
        .brand-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brand-link:hover {
          transform: translateY(-2px);
          text-decoration: none;
        }

        .brand-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brand-link:hover .brand-icon {
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transform: scale(1.05);
        }

        .brand-text {
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Custom Toggler */
        .custom-toggler {
          border: none;
          padding: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .custom-toggler:focus {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
        }

        .toggler-icon {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          justify-content: space-between;
        }

        .toggler-icon span {
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Modern Navigation Links */
        .modern-nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px !important;
          margin: 0 4px;
          border-radius: 14px;
          font-weight: 500;
          font-size: 0.95rem;
          color: #64748b;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .modern-nav-link:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.08);
          transform: translateY(-1px);
        }

        .modern-nav-link.active {
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .modern-nav-link svg {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-nav-link:hover svg {
          transform: scale(1.1);
        }

        /* Admin Dropdown */
        .admin-dropdown {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px !important;
          margin: 0 4px;
          border-radius: 14px;
          font-weight: 500;
          color: #8b5cf6;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .admin-dropdown:hover {
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.15);
          transform: translateY(-1px);
        }

        .admin-dropdown-menu {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 8px;
          margin-top: 8px;
          min-width: 200px;
        }

        .admin-dropdown-menu .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #64748b;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-dropdown-menu .dropdown-item:hover {
          background: rgba(102, 126, 234, 0.08);
          color: #667eea;
          transform: translateX(4px);
        }

        /* User Section */
        .user-section {
          margin-left: 12px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 16px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .user-info:hover {
          background: rgba(248, 250, 252, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .username {
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .user-badge {
          font-size: 11px;
          color: #8b5cf6;
          font-weight: 500;
          background: rgba(139, 92, 246, 0.1);
          padding: 2px 8px;
          border-radius: 6px;
          align-self: flex-start;
        }

        .logout-btn {
          background: none;
          border: none;
          color: #ef4444;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          transform: scale(1.05);
        }

        /* Login Button */
        .login-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .login-btn:hover {
          color: white;
          text-decoration: none;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 20px;
            margin-top: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .navbar-nav {
            gap: 8px;
          }

          .modern-nav-link {
            justify-content: center;
            padding: 16px !important;
            margin: 4px 0;
          }

          .user-info {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
            text-align: center;
          }

          .user-details {
            align-items: center;
          }

          .login-btn {
            justify-content: center;
            padding: 16px 24px;
          }

          .admin-dropdown-menu {
            position: static;
            box-shadow: none;
            background: rgba(248, 250, 252, 0.8);
            margin-top: 12px;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-nav {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Focus States for Accessibility */
        .modern-nav-link:focus,
        .login-btn:focus,
        .logout-btn:focus,
        .admin-dropdown:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
        }
      `}</style>
    </>
  );
}

export default Navbar;