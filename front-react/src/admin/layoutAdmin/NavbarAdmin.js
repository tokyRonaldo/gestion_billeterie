import '../adminStyle.css';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function NavbarAdmin() {
  return (
    <div className="row">

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="#">Admin Panel</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Settings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
    </div>

  )

}

export default NavbarAdmin;
