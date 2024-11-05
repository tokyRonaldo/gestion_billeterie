import '../App.css';
import React, { Component } from "react";
import { useState } from 'react';
import axios from 'axios';

function Contact({paddingTop}) {
    const [name,setName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')
    const [isLoading,setIsLoading]=useState(false)

    const urlContact=`http://localhost:8000/api/send-email`;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const contactParams={
            "name" : name,
            "phoneNumber" : phoneNumber,
            "email" : email,
            "message" : message,
        }
        const formData = new FormData();
        formData.append('name', name);
//        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('message', message);

        try{
             await axios.post(
                urlContact,
                formData,{
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
            ).then(response =>{
                console.log(response)
            })
          .catch(error => console.error( error));

        }catch(error){
            console.log(error);
        }

    }
        return (
            <div>  
                <section className="page-title bg-title overlay-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="title">
                                    <h3>Contacts</h3>
                                </div>
                                <ol className="breadcrumb p-0 m-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Contacts</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section contact-form">
                    <div className="container ps-4 pe-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h3>Get in <span className="alternate">Touch</span></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, velit.</p>
                                </div>
                            </div>
                        </div>
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-md-4">
                                <input type="text" className="form-control main" onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Name" />
                            </div>
                            <div className="col-md-4">
                                <input type="email" className="form-control main" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control main" name="phone" id="phone" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone" />
                            </div>
                            <div className="col-md-12">
                                <textarea name="message" id="message" className="form-control main" rows="10" onChange={(e) => setMessage(e.target.value)} placeholder="Your Message"></textarea>
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-main-md">Send Message</button>
                            </div>
                        </form>
                    </div>
                </section>




                <section className="section contacts">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h3><span className="alternate">Contact</span></h3>
                                    <div className="row d-flex ">
                                    <div className="d-flex justify-content-center">
                                    <span className="pr-3"><i className="fa-brands fa-facebook fa-lg"></i></span><h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, velit.</h5>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>  
        )}
export default Contact;