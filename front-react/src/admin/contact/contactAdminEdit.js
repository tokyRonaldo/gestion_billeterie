import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate,useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function EventAdminEdit() {
  const now = new Date();
  const formattedDateNow = moment(now).format('YYYY-MM-DD');

  const [img, setImg] = useState('');
  const [typeId, setTypeId] = useState('');
  const [date, setDate] = useState(formattedDateNow);
  const [time, setTime] = useState('00:00');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [prixEntrer, setPrixEntrer] = useState('');
  const [organisateur, setOrganisateur] = useState('');
  const [listTypes, setListTypes] = useState([]);

  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(date)
  const apiEventEdit = `http://localhost:8000/api/evenements/${id}`;
  const apiEventGet = `http://localhost:8000/api/evenements/${id}`;
  const apiGetType = 'http://localhost:8000/api/types';

 useEffect(() => {
   getType();
   getEvents();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file)

    // Preview de l'image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getType = async (e) => {

    await axios
      .get(apiGetType,
        {
          headers: { 
            'Content-Type': 'application/ld+json'
            
           }   
        }
      )
      .then((item) => {
        setListTypes(item.data['hydra:member'])
        console.log('gettype')
        console.log(typeId)
        //getEvents();
    
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getEvents = async (e) => {
    console.log('getevents')

    await axios
      .get(apiEventGet,
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
        setDescription(data.description)
        setPrixEntrer(data.prixEntrer)
        setName(data.name)
        setOrganisateur(data.organisateur)
       data.type && setTypeId(data.type['@id'])
        setDate(formattedDateEdit)
        setTime(formattedTimeEdit)


      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dateTimeString = `${date} ${time}`;
    const formattedDateTime = moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss');

    const eventParams={
      'img' : img,
      //'imageFile' : selectedFile,
      'type' : typeId,
      'date' : formattedDateTime,
      'description' : description,
      'name' : name,
      'prixEntrer' : prixEntrer,
      'organisateur' : organisateur,
    }
    
console.log(eventParams)
    try {
      setIsLoading(true);
      const response = await fetch(apiEventEdit, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify(eventParams),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('responseOk')
        console.log(data)
        if(selectedFile != null){
        const eventId = data.id;
        const apiEventUploadFile = `http://localhost:8000/api/event/${eventId}/upload`;
        
        const formData = new FormData();
        formData.append('imageFile', selectedFile);
      
        axios.post(apiEventUploadFile, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(uploadResponse => {
          setUploadedImage(uploadResponse.data.imageFilename);
          console.log(uploadResponse)
          console.log('successUpload')
        })
        .catch(error => console.error('Error uploading image', error));
        }
          console.log('Form submitted successfully!');
          navigate('/admin/event');
      } else {
          console.error('Form submission failed!');
      }    
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);
    }
    
  };
  return (

    <div>
    <h2>Editer un produit</h2>
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
      <div className='col-3'>
      <label>Type: </label>
      <select name='typeId' value={typeId} className='form-control' onChange={(e) => setTypeId(e.target.value)} required>
        <option value=''>Choisissez un Type</option>
        <option value='test'>Choisissez un Type2</option>
        <option value='test2'>Choisissez un Type3</option>
        {listTypes.map((listType) => (
          <option key={listType['id']} value={listType['@id']}>{listType['nameType']}</option>

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
        <label>Organisateur: </label>
        <input
          type="text"
          value={organisateur}
          className='form-control'
          onChange={(e) => setOrganisateur(e.target.value)}
          required
        />
      </div>
      <div className='col-5'>
        <label>Image: </label>
        <input
              type="file"
              className='form-control ms-1'
              //onChange={(e) => setImg(e.target.files[0].name)}
              onChange={handleFileChange}
               accept="image/*"
            />
      </div>

      <div className='col-3'>
        <label>Prix d'entrer: </label>
        <div className='row'>
          <div className='d-flex'>
            <input
              type="number"
              value={prixEntrer}
              className='form-control'
              onChange={(e) => setPrixEntrer(e.target.valueAsNumber)}
              required
            />

          <span className='ms-2 pt-2'>Ar</span>
          </div>
        </div>
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
  {uploadedImage && (
            <div className="mt-4">
              <h3>Uploaded Image:</h3>
              <img
                src={`http://localhost:8000/images/uploads/${uploadedImage}`}
                alt="Uploaded"
                style={{ width: '300px', height: 'auto' }}
              />
            </div>
          )}
  </div>
  );
}

export default EventAdminEdit;
