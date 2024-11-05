import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function EventAdminEdit() {
  const now = new Date();
  const formattedDateNow = moment(now).format('YYYY-MM-DD'); 

  const [eventsId, setEventsId] = useState([]);
  const [date, setDate] = useState(formattedDateNow);
  const [time, setTime] = useState('00:00');
  const [phoneNumber, setphoneNumber] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [prixTotal, setPrixTotal] = useState();
  const [nbre, setNbre] = useState();
  const [status, setStatus] = useState('unpaid');
  const [listEvents, setListEvents] = useState([]);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiCommandeEdit = `http://localhost:8000/api/commandes/${id}`;
  const apiGetEvents = 'http://localhost:8000/api/evenements';

 useEffect(() => {
  getEvents();
  getCommande();
  }, []);

  const getEvents = async (e) => {

    await axios
      .get(apiGetEvents,
        {
          headers: { 
            'Content-Type': 'application/ld+json'
            
           }   
        }
      )
      .then((item) => {
        console.log(item.data['hydra:member'][0]['@id'])
        setListEvents(item.data['hydra:member'])
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const getCommande = async (e) => {

    await axios
      .get(apiCommandeEdit,
        {
          headers: { 
            'Content-Type': 'application/ld+json'
            
           }   
        }
      )
      .then((item) => {
        const data=item.data;
        const formattedDateEdit = moment(data.date).format('YYYY-MM-DD')
        const formattedTimeEdit = moment(data.date).format('HH:mm')
        console.log(item.data)
        setNom(data.nom)
        setPrixTotal(data.prixTotal)
        setStatus(data.status)
        setEmail(data.email)
        setphoneNumber(data.phoneNumber)
        setNbre(data.nbre)
        setDate(formattedDateEdit)
        setTime(formattedTimeEdit)
        console.log(eventsId);
        data.evenementID &&  data.evenementID.forEach((eventID) => {
          setEventsId(prevIds => [...prevIds, eventID['@id']]);
        });

      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleChange = (event) => {
    console.log(event.target)
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(value)

    setEventsId(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dateTimeString = `${date} ${time}`;
    const formattedDateTime = moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss');

    const commandeParams={
      'evenementID' : eventsId,
      'nom' : nom,
      'date' : formattedDateTime,
      'phoneNumber' : phoneNumber,
      'nbre' : nbre,
      'email' : email,
      'status' : status,
      'prixTotal' : prixTotal,
    }
    console.log(commandeParams)

    try {
      setIsLoading(true);
      const response = await fetch(apiCommandeEdit, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify(commandeParams),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('responseOk')
          console.log('Form submit avec succes!');
          navigate('/admin/commande');
      } else {
          console.error('Erreur!');
      }    
    } catch (error) {
      console.error('Erreur lors de la création', error);
    }
    
  };
  return (

    <div>
    <h2>Editer une Commande</h2>
    <form onSubmit={handleSubmit}>

    <div className='row py-2'>
      <div className='col-3'>
        <label>Evenements: </label>
        <select name='eventsID' value={eventsId} multiple className='form-control' onChange={handleChange} required>
          <option value='' disabled>Choisissez un Type</option>
          {listEvents.map((listEvent) => (
            <option key={listEvent['id']} value={listEvent['@id']}>{listEvent['name']}</option>

          ))}
        
        </select>
 
      </div>

      <div className='col-3'>
        <label>Date: </label>
        <input
            type="date"
            className='form-control'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
      </div>
      <div className='col-2'>
        <label>Time: </label>
        <input
            type="time"
            className='form-control'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
      </div>
    </div>
    <div className='row py-2'>
      <div className='col-4'>
        <label>Nom: </label>
          <input
            type="text"
            className='form-control'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
      </div>

      <div className='col-4'>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          className='form-control'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='col-4'>
        <label>Num Tel: </label>
          <input
            type="text"
            className='form-control'
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            required
          />
      </div>
    </div>

    <div className='row py-2'>
      <div className='col-3'>
        <label>Status: </label>
        <select name='status' className='form-control' value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value='unpaid'>Impayé</option>
          <option value='paid'>Payé</option>

        </select>
 
      </div>
      <div className='col-3'>
        <label>Nbre</label>
            <input
              type="number"
              value={nbre}
              className='form-control'
              onChange={(e) => setNbre(e.target.valueAsNumber)}
              required
            />
      </div>
      <div className='col-3'>
        <label>Prix Total: </label>
        <div className='row'>
          <div className='d-flex'>
            <input
              type="number"
              value={prixTotal}
              className='form-control'
              onChange={(e) => setPrixTotal(e.target.valueAsNumber)}
              required
            />

          <span className='ms-2 pt-2'>Ar</span>
          </div>
        </div>
      </div>
    </div>
    <div className='row text-end '>
    <div className='col-12 '>
  <button className='btn btn-primary ' type="submit">Edit</button>
    </div>
    </div>
  </form>
  </div>
  );
}

export default EventAdminEdit;

