import { useState, useEffect } from 'react'
import React from 'react';
import { useRef } from 'react'
import {
    Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import { User } from '../User';
import { useIdContext } from './Login';


function Info() {
    const navigate=useNavigate()
    const [user,setUser]=useState({});
    //const name=JSON.parse(localStorage.getItem("currentUser")).name
    // const userId = useIdContext();
    const userId=JSON.parse(localStorage.getItem("currentUser")).id

    useEffect(() => {
        console.log(userId);
      fetch(`http://localhost:3000/users?userId=${userId}`)
          .then(response => response.json())
          .then(data => {
              if (data.length > 0) {
                  setUser(data[0]);
              }
          })
          .catch(error => {
              console.error('Error fetching user data:', error);
          });
  }, []);

    
        
   
    function hideInfo(){
        navigate(`/home/user/${userId}`)
    }
   return(
    <>
        <p> name: {user.name}</p>
        <p> user name: {user.username}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p> password: {user.website}</p>
        {/* <p>adress:{user.address}</p> */}
        {/* <p> street: {user.address.street}  suite:{user.address.suite} zipcode:{user.address.zipcode}</p>
        <p> geo:  lat:{user.address.geo.lat}  lng:{user.address.geo.lng}</p> */}
        {/* <p>company:{user.company}</p> */}
        {/* <p> name: {user.company.name} catch parse:{user.company.catchParse} bs:{user.company.bs}</p> */}
        <button onClick={hideInfo}>Hide info</button>
        
    </>
   )
   }
  
  export default Info