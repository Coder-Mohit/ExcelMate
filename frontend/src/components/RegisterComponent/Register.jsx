import React, { useState } from "react";
import axios from "axios";
import { validateForm } from "../../validateForm";
import "./Register.css";
import { userUrl } from "../../Url/userUrl";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    mobile: "",
    city: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    const { valid, validateErrors } = validateForm(formData);
    setErrors(validateErrors);

    if (!valid) return;

    try {
      const res = await axios.post(userUrl + "save", formData);
      setMessage(res.data.message);
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Registration error:", backendMessage);
      console.log(error.message);

      alert(backendMessage);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <label>Full name</label>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleOnChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}

        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleOnChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleOnChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <label>Contact</label>
        <input
          type="text"
          name="mobile"
          placeholder="Enter mobile no."
          value={formData.mobile}
          onChange={handleOnChange}
        />
        {errors.mobile && <div className="error">{errors.mobile}</div>}

        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={formData.city}
          onChange={handleOnChange}
        />
        {errors.city && <div className="error">{errors.city}</div>}

        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleOnChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <div className="error">{errors.role}</div>}

        <button type="submit">Register</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Register;
