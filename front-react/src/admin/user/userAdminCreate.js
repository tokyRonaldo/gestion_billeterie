import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function UserAdminCreate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState(['ROLE_USER']);


  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiUserCreate = 'http://localhost:8000/api/users';

  const handleChange = (event) => {
    console.log(event.target)
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(value)

    setRoles(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userParams={   
      'email' : email,
      'password' : password,
      'roles' : roles
    }
    

    try {
      setIsLoading(true);
      const response = await fetch(apiUserCreate, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify(userParams),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('responseOk')
          console.log('Form submit avec succes');
          navigate('/admin/user');
      } else {
          console.error('Erreur');
      }    
    } catch (error) {
      console.error('Erreur lors de la création ', error);
    }
    
  };
  return (

    <div>
    <h2>Créer un utilisateur</h2>
    <form onSubmit={handleSubmit}>

    <div className='row py-2'>
      <div className='col-4'>
      <label>Email: </label>
        <input
          type="email"
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
      <div className='col-4'>
      <label>Password: </label>
      <input
          type="password"
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className='col-4'>
      <label>Roles: </label>
      <select multiple name='roles' value={roles} className='form-control' onChange={handleChange} required>
      <option value='ROLE_USER'>User</option>
      <option value='ROLE_ADMIN'>Admin</option>
        
        </select>
 
      </div>

    </div>
    <div className='row text-end '>
    <div className='col-12 '>
  <button className='btn btn-primary ' type="submit">Créer</button>
    </div>
    </div>
  </form>
  </div>
  );
}

export default UserAdminCreate;
