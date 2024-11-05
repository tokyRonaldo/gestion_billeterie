import '../App.css';
import '../style.css';
import DashboardAdmin from '../admin/dashboard/dashboardAdmin';

import AproposAdminCreate from '../admin/apropos/aproposAdminCreate';
import AproposAdminEdit from '../admin/apropos/aproposAdminEdit';
import AproposAdminIndex from '../admin/apropos/aproposAdminIndex';

import CommandeAdminCreate from '../admin/commande/commandeAdminCreate';
import CommandeAdminIndex from '../admin/commande/commandeAdminIndex';
import CommandeAdminEdit from '../admin/commande/commandeAdminEdit';

import ContactAdminCreate from '../admin/contact/contactAdminCreate';
import ContactAdminIndex from '../admin/contact/contactAdminIndex';
import ContactAdminEdit from '../admin/contact/contactAdminEdit';

import EventAdminCreate from '../admin/event/eventAdminCreate';
import EventAdminEdit from '../admin/event/eventAdminEdit';
import EventAdminIndex from '../admin/event/eventAdminIndex';

import TypeAdminCreate from '../admin/type/typeAdminCreate';
import TypeAdminIndex from '../admin/type/typeAdminIndex';
import TypeAdminEdit from '../admin/type/typeAdminEdit';

import UserAdminCreate from '../admin/user/userAdminCreate';
import UserAdminIndex from '../admin/user/userAdminIndex';
import UserAdminEdit from '../admin/user/userAdminEdit';

import SidebarAdmin from '../admin/layoutAdmin/SidebarAdmin';
import NavbarAdmin from '../admin/layoutAdmin/NavbarAdmin';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function AppAdmin() {
  const [paddingTop, setPaddingTop] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  useEffect(() => {
    adjustWidth()
    
  })
  
  const adjustWidth = () => {
    const widthSidebar = document.getElementById('Sidebar').offsetWidth;
    setSidebarWidth(widthSidebar);
    console.log(widthSidebar);
  };

  return (

    <div className='row'>
    <div className='px-0' style={{position: 'relative'}}>
       <SidebarAdmin />
       <div className="main-content" style={{position:'absolute',right: 0,left:sidebarWidth}}>
      <div className="content">

       <NavbarAdmin />

        <Routes>
          <Route path="/" element={<DashboardAdmin />} />

          <Route path="/contact" element={<ContactAdminIndex />} />
          <Route path="/contact/create" element={<ContactAdminCreate />} />
          <Route path="/contact/:id" element={<ContactAdminEdit />} />

          <Route path="/event" element={<EventAdminIndex />} />
          <Route path="/event/create" element={<EventAdminCreate />} />
          <Route path="/event/:id" element={<EventAdminEdit />} />

          <Route path="/type" element={<TypeAdminIndex />} />
          <Route path="/type/create" element={<TypeAdminCreate />} />
          <Route path="/type/:id" element={<TypeAdminEdit />} />

          <Route path="/commande" element={<CommandeAdminIndex />} />
          <Route path="/commande/create" element={<CommandeAdminCreate />} />
          <Route path="/commande/:id" element={<CommandeAdminEdit />} />

          <Route path="/apropos" element={<AproposAdminIndex />} />
          <Route path="/apropos/create" element={<AproposAdminCreate />} />
          <Route path="/apropos/:id" element={<AproposAdminEdit />} />

          <Route path="/user" element={<UserAdminIndex />} />
          <Route path="/user/create" element={<UserAdminCreate />} />
          <Route path="/user/:id" element={<UserAdminEdit />} />

        </Routes>

        </div>
        </div>
        </div>
        </div>
  );
}

export default AppAdmin;
