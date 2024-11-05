import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function AproposAdminCreate() {

  const [img, setImg] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numberPhone, setNumberPhone] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [uploadedLogo, setUploadedLogo] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiAproposCreate = 'http://localhost:8000/api/aproposs';


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file)

  };

  const handleLogoChange = (event) => {
    const logo = event.target.files[0];
    setSelectedLogo(logo);
    console.log(logo)

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const aproposParams={
      'image' : img,
      'logo' : logo,
      'description' : description,
      'name' : name,
      'email' : email,
      'phoneNumber' : numberPhone,
    }
    

    try {
      setIsLoading(true);
      const response = await fetch(apiAproposCreate, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify(aproposParams),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('responseOk')
        console.log(data)
        if(selectedFile != null || selectedLogo != null){

          const aproposId = data.id;
          const apiAproposUploadFile = `http://localhost:8000/api/apropos/image/${aproposId}/upload`;
          
          const formData = new FormData();
          formData.append('imageFile', selectedFile);
          formData.append('logoFile', selectedLogo);
        
          axios.post(apiAproposUploadFile, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(uploadResponse => {
            setUploadedImage(uploadResponse.data.imageFilename.imageFilename);
            setUploadedLogo(uploadResponse.data.imageFilename.logoFilename);
            console.log(uploadResponse)
            console.log('successUpload')
          })
          .catch(error => console.error('Error uploading image', error));
        }
          console.log('Form submitted successfully!');
          navigate('/admin/apropos');
      } else {
          console.error('Form submission failed!');
      }    
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);
    }
    
  };
  return (

    <div>
    <h2>Créer un produit</h2>
    <form onSubmit={handleSubmit}>

    <div className='row py-2'>
      <div className='col-4'>
          <label>Logo: </label>
          <input
              type="file"
              className='form-control'
              //onChange={(e) => setImg(e.target.files[0].name)}
              onChange={handleLogoChange}
               accept="image/*"
            />
      </div>

    </div>
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
        <label>Number Phone: </label>
            <input
              type="text"
              value={numberPhone}
              className='form-control'
              onChange={(e) => setNumberPhone(e.target.value)}
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

export default AproposAdminCreate;
