import React, { useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { adminUrl } from "../../Url/adminUrl";

const AdminDashboard = () => {
  const handleExcel = async () => {
    try {
      const response = await axios.get(adminUrl + "download-users-excel", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "users.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.log(
        "Error downloading file:",
        e.response?.data?.message || e.message
      );
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Admin Dashboard</h1>
      <button onClick={handleExcel}>Download Users Excel Sheet</button>
    </div>
  );
};

export default AdminDashboard;
