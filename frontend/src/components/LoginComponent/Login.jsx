import React, { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { userUrl } from "../../Url/userUrl";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    let valid = true;
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        valid = false;
        newErrors[field] = `Please enter ${field}`;
      }
    });

    setError(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    try {
      const res = await axios.post(userUrl + "login", formData);
      const { message, token, user } = res.data;

      setMessage(message);
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));

      const role = user?.role;
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/unknown-role");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
