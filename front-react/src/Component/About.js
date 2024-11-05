import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState ,Component} from 'react';

function About({paddingTop}) {
    const [about,setAbout] = useState([]);

    useEffect(() =>{
        getAbout();
    },[]);

    const getAbout = async () => {
        const apiGetAbout='http://localhost:8000/api/Aproposs';

        await axios.get(apiGetAbout,
            {
                headers: { 
                    'Content-Type': 'application/ld+json'
                    
                   }   
            }
        ).then((item)=>{
            setAbout(item.data['hydra:member'])
        })
    }

        return (
            <div>  
                <section class="page-title bg-title overlay-dark">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="title">
                                    <h3>A propos</h3>
                                </div>
                                <ol class="breadcrumb p-0 m-0">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">A propos</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section speakers bg-speaker overlay-lighter">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 align-self-center">
                                <div className="image-block bg-about">
                                    <img className="img-fluid" src="images/speakers/featured-speaker.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6 align-self-center">
                                <div className="content-block">
                                    <h2>About The <span className="alternate">Eventre</span></h2>
                                    <div className="description-one">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm tempor incididunt ut labore dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco.
                                        </p>
                                    </div>
                                    <div className="description-two">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmtempor incididunt ut labore et dolore magna aliq enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




            </div>  
        )}
export default About