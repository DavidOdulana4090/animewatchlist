import React from "react";
import "../styles/LoadingScreen.css";

interface LoadingScreenProps {
    text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
          <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingScreen;
