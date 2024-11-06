import '../App.css';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Home from '../Component/Home';
import Events from '../Component/Event';
import EventDetail from '../Component/EventDetail';
import Panier from '../Component/Panier';
import Payment from '../Component/Payment';
import Contact from '../Component/Contact';
import About from '../Component/About';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function AppWeb() {
  const [paddingTop, setPaddingTop] = useState(0);
  const [about,setAbout] = useState([])

useEffect(() => {
  adjustPadding()
  getAbout();

  
})

const adjustPadding = () => {
  const navbarHeight = document.getElementById('navbar').offsetHeight;
  setPaddingTop(navbarHeight);
  console.log(navbarHeight);
};

const apiGetAbout='http://localhost:8000/one_apropos'
const getAbout= async () =>{
  const response= await axios.get(apiGetAbout,
      {
          headers: { 
            'Content-Type': 'application/ld+json'
            
           }   
        }
  )
  .then((item) =>{
      const data= item.data;
      if(data != null){
      setAbout(data)
      }
  }).catch((error) =>{
      console.log(error);
  })
}


// Ajuster le padding-top au chargement de la page
window.addEventListener('load', adjustPadding);
// Ajuster le padding-top lors du redimensionnement de la fenê
window.addEventListener('resize', adjustPadding);

// Nettoyer les écouteurs d'événements
window.removeEventListener('load', adjustPadding);
window.removeEventListener('resize', adjustPadding);


  return (
/*    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    <Home paddingTop={paddingTop}/>
    <Events />
    <EventDetail />
    <Login />
  */

    <div className='appWeb'>
    <Navbar paddingTop={paddingTop} setPaddingTop={setPaddingTop} />
    <div style={{ marginTop: `${paddingTop}px` }}>
        <Routes>
          <Route path="/" element={<Home about={about} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/type/:id" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<About />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
    </div>

    <Footer about={about} />

    </div>
  );
}

export default AppWeb;
