import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Devices from './components/Devices/Devices'
import UserRegister from './components/Users/UserRegister';
import UserLogin from './components/Users/UserLogin';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { decodeToken, isExpired } from 'react-jwt';

const User = decodeToken(localStorage.getItem('token'))
//console.log(User)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/login" element={<UserLogin />} />
        <Route path="/api/register" element={<UserRegister />} />
        <Route path="/api/devices" element={!isExpired(localStorage.getItem("token")) ? <Devices /> : <Navigate to={"/api/login"} />} />
        <Route path="/api/admin" element={User.isAdmin && !isExpired(localStorage.getItem("token")) ? <AdminPanel /> : <Navigate to={"/api/login"} />} />
        <Route path="*" element={<Navigate to="/api/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;