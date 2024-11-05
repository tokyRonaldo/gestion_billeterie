import React, { Component } from "react";
import { useState } from 'react';

function Navbar({paddingTop ,setPaddingTop}) {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu(){
        setShowMenu(!showMenu)
      }
      const show = showMenu ? "show" : "" ;
    return (
        <nav className="navbar main-nav border-less fixed-top navbar-expand-lg p-0" id="navbar">
        <div className="container-fluid p-0">
            <a className="navbar-brand" href="index.html">
                <img src="images/logo.png" alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" onClick={toggleMenu} data-toggle="collapse" data-target="#navbarNa" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="fa fa-bars"></span>
            </button>
            <div className={"collapse navbar-collapse " + show } id="navbarNav">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item dropdown active dropdown-slide">
                <a className="nav-link" href="#" >Home
                    <span>/</span>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Apropos
                    <span>/</span>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Evenements
                    <span>/</span>
                </a>
                </li>

                <li className="nav-item dropdown dropdown-slide">
                <a className="nav-link" href="#" data-toggle="dropdown">Types<span>/</span></a>
                    <div className="dropdown-menu">
                    <a className="dropdown-item" href="about-us.html">About Us</a>
                    <a className="dropdown-item" href="single-speaker.html">Single Speaker</a>
                    </div>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="contact.html">Contact</a>
                </li>
            </ul>
            <div className="ticket" style={{position:'relative'}}>
                <span style={{backgroundColor:'white',paddingTop : 15 ,paddingRight: 12 , paddingLeft :12 , paddingBottom :15, borderRadius:23}}>
                    <i className="fa fa-shopping-cart fa-lg" ></i>
                    <span className='spanTicket nbre_cart' style={{display:'none',position:'absolute', left :60, top :22, fontSize :13, borderLeft : 0,color : 'grey'}} >2</span>
                </span>
                <span className='spanTicket'>Tickets</span>
            </div>
            </div>
        </div>
        </nav>
);
}

export default Navbar;