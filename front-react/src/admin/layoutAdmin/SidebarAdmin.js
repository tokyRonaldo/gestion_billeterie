import '../adminStyle.css';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function SidebarAdmin() {
  return (

<div className="sidebar d-flex flex-column p-3" id='Sidebar'>
    <h4 className="text-white">Admin Panel</h4>
    <ul className="nav flex-column">
        <li className="nav-item">
            <Link to="/admin" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/event" className="nav-link">Evenements</Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/type" className="nav-link">Types</Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/commande" className="nav-link">Commandes</Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/contact" className="nav-link">Contact</Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/apropos" className="nav-link">Apropos</Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/user" className="nav-link">Users</Link>
        </li>

    </ul>
</div>
  );
}

export default SidebarAdmin;
