import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    console.log("API_URL:", API_URL); // Debug: Check which API URL is being used
    console.log("Form data:", formData); // Debug: Check form data
    try {
      const res = await axios.post(`${API_URL}/api/signup`, formData);
      setMessage(res.data.message);
      if(res.data){
        setFormData({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (err) {
      // Better error handling
      if (err.response) {
        // Server responded with error status
        setMessage(err.response.data?.message || `Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // Request made but no response (network error, CORS, backend down)
        setMessage(`Cannot connect to server. Check if backend is running at ${API_URL}`);
        console.error("Network error:", err.request);
      } else {
        // Something else happened
        setMessage(`Error: ${err.message}`);
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} value={formData.name} />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} value={formData.email} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
