import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';
import './assets/css/login.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/perfex-pwa">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);
