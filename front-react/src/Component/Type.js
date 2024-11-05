import React, { Component } from "react";
import { useState } from 'react';
import imgHome from '../images/background/homepage-one-banner.jpg'
import imgType from '../images/speakers/speaker-one.jpg'
function Home({paddingTop}) {
        return (
            <div>  
                <section class="page-title bg-title overlay-dark">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="title">
                                    <h3>Types</h3>
                                </div>
                                <ol class="breadcrumb p-0 m-0">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Types</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sectionType type">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h3><span className="alternate">Types</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="speaker-item">
                                    <div className="image">
                                        <img src={imgType} alt="speaker" className="img-fluid" />
                                    </div>
                                    <div className="content text-center">
                                        <h5><a href="single-speaker.html">Johnathan Franco</a></h5>
                                        <p>Project Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="speaker-item">
                                    <div className="image">
                                        <img src="images/speakers/speaker-two.jpg" alt="speaker" className="img-fluid" />
                                    </div>
                                    <div className="content text-center">
                                        <h5><a href="single-speaker.html">Johnathan Franco</a></h5>
                                        <p>Project Manager</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>


            </div>  
        )}