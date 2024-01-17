import { useState, useEffect } from 'react'
import React from 'react';
import { useRef } from 'react'
import {
    Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import { User } from '../User';


function Info() {
    const navigate=useNavigate()
    const [user,setUser]=useState({});
    const name=JSON.parse(localStorage.getItem("currentUser")).name


    useEffect(()=>{
      fetch(`http://localhost:3000/users?name=${name}`)
      .then(response => response.json())
      .then(data=>
        {if(data[0] ==null)
          setUser(data)
    }
      )},[])

    
        
   
    function hideInfo(){
        navigate(`/home/user/${id}`)
    }
   return(
    <>
        <p> name: {user.name}</p>
        <p> user name: {user.userName}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p> password: {user.website}</p>
        <p>adress:</p>
        <p> street: {user.street}  suite:{user.suite} zipcode:{user.zipcode}</p>
        <p> geo:  lat:{user.lat}  lng:{user.lng}</p>
        <p>company:</p>
        <p> name: {user.name} catch parse:{user.catchParse} bs:{user.bs}</p>
        <button onClick={hideInfo}>Hide info</button>
        
    </>
   )
   }
  
  export default Info