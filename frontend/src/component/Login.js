import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming you have some basic styles here

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    User_Email: "",
    User_Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          return res.json().then((data) => { throw new Error(data.error); });
        } else if (res.status === 404) {
          return res.json().then((data) => { throw new Error(data.error); });
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .then((data) => {
        alert("Login successfully");
        console.log("Full response data:", data);

        // Store common items in localStorage
        localStorage.setItem('id', data.id);
        localStorage.setItem('role', data.role);

        if (data.role === "Attendees") {
          localStorage.setItem('User_token', data.token);
          navigate('/');
        } else if (data.role === "Exhibitor") {
          localStorage.setItem('Exhibitor_token', data.token);
          window.location.href = 'http://localhost:3001/Exhibitor_Insert';
        } else if (data.role === "Admin") {
          localStorage.setItem('Admin_token', data.token);
          navigate('/admin');
        }
        
      navigate("/");
      })

 
      .catch((error) => {
        alert(error.message);
        console.error("Error adding User:", error);
      });
  }

  return (
    <div className="login-form">
      <form onSubmit={handleAddUser}>
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="User_Email"
            placeholder="Email"
            value={loginData.User_Email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="User_Password"
            placeholder="Password"
            value={loginData.User_Password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </div>
        <div className="hint-text">
          Don't have an account? <a href="/signup">Sign up here</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
