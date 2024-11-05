import React, { Component } from "react";
import { useState } from 'react';
import imgHome from '../images/background/homepage-one-banner.jpg'
import imgType from '../images/speakers/speaker-one.jpg'

function Login() {
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
                            <form action="#" className="row">
                                
                                <div className="row ">
                                    <div className="col-md-6 col">
                                        <input type="nom" className="form-control main auth" placeholder="Nom" />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-6 col">
                                        <input type="text" className="form-control main auth" placeholder="Adresse" />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-6 col">
                                        <input type="number" className="form-control main auth" placeholder="Numero Tel" />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-md-6 col">
                                        <input type="number" className="form-control main auth" placeholder="Numero Tel" />
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