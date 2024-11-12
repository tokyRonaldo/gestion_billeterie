import React, { Component ,useEffect, useState } from "react";
import { BrowserRouter as Router,Link , Route, Routes } from 'react-router-dom';
import axios from 'axios';

function Navbar({paddingTop ,setPaddingTop }) {
    const [showMenu, setShowMenu] = useState(false);
    const [listTypes,setListTypes] = useState([])
    const apiGetListTypes='http://localhost:8000/api/types'

    useEffect(() => {
        getListTypes();
      })

    const getListTypes = async () => {
        const response = await axios.get(apiGetListTypes,{
          headers: { 
            'Content-Type': 'application/ld+json'
            
           }   
        }
      ).then((item) => {
        const data= item.data['hydra:member'];
        setListTypes(data)
      }).catch((error) => {
        console.log(error)
      })
      }
      

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
                    <Link to="/web" className="nav-link">Home
                        <span>/</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/web/about" className="nav-link">Apropos
                        <span>/</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/web/events" className="nav-link">Evenements
                        <span>/</span>
                    </Link>
                </li>

                <li className="nav-item dropdown dropdown-slide">
                <a className="nav-link" href="#" data-toggle="dropdown">Types<span>/</span></a>
                    <div className="dropdown-menu">
                        { listTypes.map((listType)=>( 
                            <Link to={`/web/events/${listType.id}`}  className="dropdown-item">{listType.nameType}
                            </Link>
                        )) }

                    </div>
                </li>
                <li className="nav-item">
                    <Link to="/web/contact" className="nav-link">Contact
                        <span>/</span>
                    </Link>
                </li>
            </ul>
            <div className="ticket" style={{position:'relative'}}>
                <Link to="/" className="nav-link">Home
                    <span style={{backgroundColor:'white',paddingTop : 15 ,paddingRight: 12 , paddingLeft :12 , paddingBottom :15, borderRadius:23}}>
                        <i className="fa fa-shopping-cart fa-lg" ></i>
                        <span className='spanTicket nbre_cart' style={{display:'none',position:'absolute', left :60, top :22, fontSize :13, borderLeft : 0,color : 'grey'}} >2</span>
                    </span>
                    <span className='spanTicket'>Tickets</span>
                </Link>
            </div>
            </div>
        </div>
        </nav>
);
}

export default Navbar;