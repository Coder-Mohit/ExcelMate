import React, { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // import the CSS

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3000/user/login", formData)
        .then((res) => {
          setMessage(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isLoggedIn", true);
          const role = res.data.user?.role;
          localStorage.setItem("role", role);
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "user") {
            navigate("/user/dashboard");
          } else {
            navigate("/unknown-role");
          }
        })
        .catch((err) => setMessage(err.response.data.message));
    },
    [formData]
  );

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
