import React from "react";
import { Link } from "react-router-dom";
import './ErrorPage.css'; // Ensure your CSS file is imported

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="square-box">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>

      <div className="main-error-wrapper">
        <h1 className="text-white">
          404
          <span className="tx-20">.error</span>
        </h1>
        <h2 className="text-white">
          Oops. The page you were looking for does not exist
        </h2>
        <Link className="btn btn-light" to={`/`}>
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
