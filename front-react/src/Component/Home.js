import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function Home({paddingTop,about}) {
    const [listEvents,setListEvents] = useState([])
    const [listTypes,setListTypes] = useState([])

    useEffect(() =>{
        getListEvents();
        getListTypes();
    },[]);

    const apiGetListEvents='http://localhost:8000/api/last/events'
    const apiGetListTypes='http://localhost:8000/last/types'

    const getListEvents= async () =>{
        await axios.get(apiGetListEvents,
            {
                headers: { 
                  'Content-Type': 'application/ld+json'
                  
                 }   
              }
        ).then((item) =>{
            const data= item.data;
            setListEvents(data)
            console.log(data[0].id)
            console.log('events')
        }).catch((error) =>{
            console.log(error);
        })
    }

    const getListTypes= async () =>{
        await axios.get(apiGetListTypes,
            {
                headers: { 
                  'Content-Type': 'application/ld+json'
                  
                 }   
              }
        ).then((item) =>{
            const data= item.data;
            setListTypes(data);
            console.log(data)
            console.log('type')
        }).catch((error) =>{
            console.log(error);
        })
    }




    return (
        <div>
            <section  className="banner bg-banner-one overlay" style={{ marginTop: `${paddingTop}px` }}>
            <div className="container" >
                <div className="row ">
                    <div className="col-lg-12">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{border :`1px solid #776e6e`}}>
                            <div className="carousel-inner" >
                            {listEvents.map((listEvent) => (

                            <div key={listEvent['id']} className="carousel-item active">
                            <img src={`http://localhost:8000/images/uploads/${listEvent.img}`} className="d-block w-100" alt="Slide 1" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{listEvent.name}</h5>
                                <p>{listEvent.description}</p>
                            </div>
                            </div>
                            ))}

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" style={{height : `4rem`}} aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" style={{height : `4rem`}} aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                            </div>                            
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
                {listTypes.map((listType) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={listType.id}>
                        <div className="speaker-item">
                            <div className="image">
                               {listType.img ? <img src={`http://localhost:8000/images/uploads/${listType.img}`} alt="speaker" className="w-100 imgType" /> 
                               : <img src={`http://localhost:8000/img/imagedefault.jpeg`} alt="speaker" className="w-100 imgType" /> }
                            </div>
                            <div className="content text-center">
                                <h5><a href="single-speaker.html">{listType.nameType}</a></h5>
                                <p>{listType.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </section>
        <section className="section about bg-speaker overlay-lighter">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 align-self-center">
                        <div className="image-block bg-about">
                            <img className="d-block w-100" src={`http://localhost:8000/images/uploads/${about.image}`} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 align-self-center">
                        <div className="content-block">
                            <h2>About The <span className="alternate">{about.name}</span></h2>
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

    );
}

export default Home;