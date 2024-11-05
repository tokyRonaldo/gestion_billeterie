import './style.css'
import AppAdmin from './app/AppAdmin';
import AppLogin from './app/AppLogin';
import AppRegister from './app/AppRegister';
import AppWeb from './app/AppWeb';
import ProtectedRoute from './app/ProtectedRoute';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (

    <div className='containt'>
    <Router>
        <Routes>
          <Route path="/login" element={<AppLogin />} />
          <Route path="/register" element={<AppRegister />} />
          <Route path="/web/*" element={<ProtectedRoute><AppWeb /></ProtectedRoute>} />
          {/* Protected route */}
          <Route path="/admin/*" element={<ProtectedRoute><AppAdmin /></ProtectedRoute>} />
        </Routes>
    </Router>

    </div>
  );
}

export default App;
