import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function TypeAdminCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiTypeCreate = 'http://localhost:8000/api/types';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const typeParams={
      'description' : description,
      'nameType' : name,
    }
    

    try {
      setIsLoading(true);
      const response = await fetch(apiTypeCreate, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify(typeParams),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('responseOk')
        console.log(data)
          console.log('Form submitted successfully!');
          navigate('/admin/type');
      } else {
          console.error('Form submission failed!');
      }    
    } catch (error) {
      console.error('Erreur lors de la création', error);
    }
    
  };
  return (

    <div>
    <h2>Créer un Type</h2>
    <form onSubmit={handleSubmit}>

    <div className='row py-2'>
      <div className='col-4'>
      <label>Nom: </label>
        <input
          type="text"
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
    </div>
    <div className='row py-2'>
    
      <div className='col-6'>

        <textarea
          className='form-control'
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{minHeight:`100px`}}
          value={description}
        />test
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

export default TypeAdminCreate;
