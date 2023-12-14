import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/signin", formData);
      const { access_token, role } = response.data;

      localStorage.setItem("token", access_token);

      if (role === "SuperAdmin") {
        navigate("/navigation-home-superadmin");
      } else if (role === "Admin") {
        navigate("/navigation-home-admin");
      } else {
        navigate("/home")
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Impresioname</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="text" name="email" onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />

          <button type="submit">Log In</button>
          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
