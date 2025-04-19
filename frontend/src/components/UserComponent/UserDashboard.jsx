import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserName(user.name);
      }
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      <p>Hello, {userName ? userName : "Guest"}!</p>
    </div>
  );
};

export default UserDashboard;
