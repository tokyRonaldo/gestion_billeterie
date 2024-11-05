import React, { Component } from "react";
import { useState } from 'react';
import imgHome from '../images/background/homepage-one-banner.jpg'
import imgType from '../images/speakers/speaker-one.jpg'

function Panier() {
        return (
            <div>  

            <section className="section schedule">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col">
                            <div className="section-title">
                                <h3>Event <span className="alternate">Schedule</span></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusm tempor incididunt ut labore</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col">
                            <div className="schedule-contents bg-schedule">
                                <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active schedule-item" id="nov20">
                                    <div className="text-center">
                                    <i className="fa fa-folder" style={{fontSize: `2rem`, color: `gray`}}></i>
<p>Rien à afficher</p>
                                    <h5 className="panierEmpty">Empty
                                    </h5>
                                    </div>
                                   <ul className="m-0 p-0">
                                        <li className="headings">
                                            <div className="time">Time</div>
                                            <div className="speaker">Speaker</div>
                                            <div className="subject">Subject</div>
                                            <div className="venue">Venue</div>
                                        </li>
                                        <li className="schedule-details">
                                            <div className="block">
                                                <div className="time">
                                                    <i className="fa fa-clock-o"></i>
                                                    <span className="time">9.00 AM</span>
                                                </div>
                                                <div className="speaker">
                                                    <img src="images/speakers/speaker-thumb-one.jpg" alt="speaker-thumb-one" />
                                                    <span className="name">Samanta Doe</span>
                                                </div>
                                                <div className="subject">Introduction to Wp</div>
                                                <div className="venue">Auditorium A</div>
                                            </div>
                                        </li>
                                        <li className="schedule-details">
                                            <div className="block">
                                                <div className="time">
                                                    <i className="fa fa-clock-o"></i>
                                                    <span className="time">3.00 PM</span>
                                                </div>
                                                <div className="speaker">
                                                    <img src="images/speakers/speaker-thumb-five.jpg" alt="speaker-thumb-five" />
                                                    <span className="name">Lee Mun</span>
                                                </div>
                                                <div className="subject">Useful tips for Wp</div>
                                                <div className="venue">Auditorium E</div>
                                            </div>
                                        </li>
                                        <li className="schedule-details">
                                            <div className="block">
                                                <div className="time">
                                                    <i className="fa fa-clock-o"></i>
                                                    <span className="time">3.00 PM</span>
                                                </div>
                                                <div className="speaker">
                                                    <img src="images/speakers/speaker-thumb-six.jpg" alt="speaker-thumb-six" />
                                                    <span className="name">Lee Mun</span>
                                                </div>
                                                <div className="subject">Useful tips for Wp</div>
                                                <div className="venue">Auditorium E <i className="fa fa-trash fa-lg" style={{color: `#716f6f`}}></i></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                             </div>
                  
                            </div>
                            
                                <div className="download-button text-center">
                                    <a href="#" className="btn btn-main-md">Download Schedule</a>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            </div>  
        )}
export default Panier;