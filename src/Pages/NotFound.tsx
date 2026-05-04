import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-message">The page you're looking for doesn't exist</p>
      <button 
        className="not-found-button"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </button>
    </div>
  );
};

export default NotFound;
