import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState ,Component} from 'react';

function About({paddingTop,about}) {
    //const [about,setAbout] = useState([]);

    /* useEffect(() =>{
        getAbout();
    },[]);
    */

    const getAbout = async () => {
        const apiGetAbout='http://localhost:8000/api/Aproposs';

        await axios.get(apiGetAbout,
            {
                headers: { 
                    'Content-Type': 'application/ld+json'
                    
                   }   
            }
        ).then((item)=>{
            //setAbout(item.data['hydra:member'])
        })
    }

        return (
            <div>  
                <section className="page-title bg-title overlay-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center col">
                                <div className="title">
                                    <h3>A propos</h3>
                                </div>
                                <ol className="breadcrumb p-0 m-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">A propos</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section about bg-speaker overlay-lighter">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 align-self-center">
                                <div className="image-block bg-about">
                                    <img className="d-block w-100" src={`http://localhost:8000/images/uploads/${about.image}`} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6 align-self-center">
                                <div className="content-block">
                                    <h2><span className="alternate">{about.name}</span></h2>
                                    <div className="description-one">
                                        <p>
                                            {about.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>  
        )}
export default About