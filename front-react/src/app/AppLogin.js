import '../App.css';
import Navbar from '../layout/Navbar';
import Login from '../auth/Login';
import React, { useEffect, useState } from 'react';

function AppLogin() {
  const [paddingTop, setPaddingTop] = useState(0);

useEffect(() => {
  adjustPadding()
  
})

const adjustPadding = () => {
  const navbarHeight = document.getElementById('navbar').offsetHeight;
  setPaddingTop(navbarHeight);
  console.log(navbarHeight);
};

// Ajuster le padding-top au chargement de la page
window.addEventListener('load', adjustPadding);
// Ajuster le padding-top lors du redimensionnement de la fenê
window.addEventListener('resize', adjustPadding);

// Nettoyer les écouteurs d'événements
window.removeEventListener('load', adjustPadding);
window.removeEventListener('resize', adjustPadding);


  return (

    <div className='row'>
    <Navbar paddingTop={paddingTop} setPaddingTop={setPaddingTop} />
    <div className="" style={{ marginTop: `${paddingTop}px` }}>
          <Login />
    </div>

    </div>
  );
}

export default AppLogin;
