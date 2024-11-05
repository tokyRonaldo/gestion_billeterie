import React, { Component } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user={
            "email" : email,
            "password" : password
        }
        const apiLogin="http://127.0.0.1:8000/auth"
        try{
            const response = await fetch(apiLogin, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify(user),
              });
          
              const data = await response.json();
          console.log(data)
              if (data.token) {
                // Stocker le token dans localStorage
                localStorage.setItem('token', data.token);
                navigate('/web');
              } else {
                alert('Échec de la connexion. Vérifiez vos identifiants.');
              }

        }catch(error){
            console.log(error)
            setError(error.message)
        }

    };
    
        return (
            <div>  
                <section className="map new section text-center" style={{padding : 0}}>
                    <div id="map"></div>
                    <div className="register overlay-dark bg-registration-two">
                        <div className="block">
                            <div className="title text-center">
                                <h3>Register to <span className="alternate">Eventre</span></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                            </div>
                            <form onSubmit={handleSubmit} className="row">
                                
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col">
                                        <input type="email" className="form-control main auth" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col">
                                        <input type="password" className="form-control main auth" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12 text-center col">
                                    <button type="submit" className="btn btn-white-md">Register Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>


            </div>  
        )}
export default Login;