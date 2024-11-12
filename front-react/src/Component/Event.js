import React, { Component, useState,useEffect} from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import imgHome from '../images/background/homepage-one-banner.jpg'
import imgType from '../images/speakers/speaker-one.jpg'

function Event({paddingTop}) {
    const [listEvents,setListEvents] = useState([])
console.log('ici');
    const { type } = useParams();
    const location = useLocation();
    console.log(type)

    useEffect(() => {
        console.log(type)
        console.log('eto le type  eeee')
        if(type){
            
            getListEventsWithType();
        }else{
            getListEvents()
        }
        }, [location.pathname,location.key,type]);
    

    const apiGetListEvents='http://localhost:8000/api/events/withType';
    const apiGetListEventsWithType=`http://localhost:8000/api/type/events/${type}`;

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
            console.log(data)
            console.log('events')
        }).catch((error) =>{
            console.log(error);
        })
    }

    const getListEventsWithType= async () =>{
        await axios.get(apiGetListEventsWithType,
            {
                headers: { 
                  'Content-Type': 'application/ld+json'
                  
                 }   
              }
        ).then((item) =>{
            const data= item.data;
            setListEvents(data)
            console.log(data)
            console.log('eventsType')
        }).catch((error) =>{
            console.log(error);
        })
    }


    
        return (
            <div>  
                <section className="page-title bg-title overlay-dark">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-12 text-center col" >
                                <div className="title">
                                    <h3>Evenements</h3>
                                </div>
                                <ol className="breadcrumb p-0 m-0 text-center">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Evenements</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section sectionEvents" >
                    {type ? ( 
                        <div className="container">
                                    <h3>{listEvents[0] ? listEvents[0].nameType : ''}</h3>
                                    {listEvents.map((Event) => (

                                        <div className="row my-2" key={Event.id}>
                                            <div className="col-lg-4 col-md-6 align-self-center">
                                                <div className="image-block bg-about">
                                                    <img className="w-100" src={`http://localhost:8000/images/uploads/${Event.img}`} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-6 align-self-center">
                                                <div className="content-block">
                                                    <h2>{Event.name}</h2>
                                                    <div className="description-one">
                                                        <p>
                                                            {Event.description}
                                                        </p>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="btn btn-main-md">Buy ticket</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#" className="btn btn-transparent-md">Read more</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            
                    ) : ( <div className="container">
                        {listEvents.map((listEvent) => (
                            <div key={listEvent.type} className="my-3">
                                <h3>{listEvent.type}</h3>
                                {listEvent.events ? listEvent.events.map((Event) => (

                                    <div className="row my-2" key={Event.id}>
                                        <div className="col-lg-4 col-md-6 align-self-center">
                                            <div className="image-block bg-about">
                                                <img className="w-100" src={`http://localhost:8000/images/uploads/${Event.img}`} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-6 align-self-center">
                                            <div className="content-block">
                                                <h2>{Event.name}</h2>
                                                <div className="description-one">
                                                    <p>
                                                        {Event.description}
                                                    </p>
                                                </div>
                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="btn btn-main-md">Buy ticket</a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#" className="btn btn-transparent-md">Read more</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )) : ''}
                            </div>
                        ))}
                        
                    </div>
                )}
                </section>


            </div>  
        )}
    export default Event;