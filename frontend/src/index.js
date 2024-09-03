import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './component/Dashboard';
import Signup from './component/Signup';
import Contact_Insert from './component/Contact_Insert';
import Login from './component/Login';
import TicketForm from './component/Ticket';
import reportWebVitals from './reportWebVitals';
import Event from './component/Event';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Userdashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/TicketForm/:id" element={<TicketForm />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/Contact" element={<Contact_Insert />} /> 
        <Route path="/Event" element={<Event />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
