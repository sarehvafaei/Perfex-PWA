import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import App from './App';
import Dashboard from 'views/admin/default/index';

import RTL from "layouts/rtl";
import Admin from "layouts/admin";
import Auth from "layouts/auth";

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/perfex-pwa">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="admin/*" element={<Admin />} />
      <Route path="rtl/*" element={<RTL />} />
      <Route path="/admin/default" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);