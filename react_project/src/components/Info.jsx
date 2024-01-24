import React from 'react';
import { useState,useEffect,useContext } from 'react';
import {
  useNavigate
} from "react-router-dom";
import "../style.css";
import { UserContext } from '../UserProvider';


function Info() {
    const navigate=useNavigate()
    const [user,setUser]=useState({});
    const [address,setAddress]=useState({})
    const[geo,setGeo]=useState({})
    const[company,setCompany]=useState({})
    const { userID } = useContext(UserContext);



    useEffect(() => {
      fetch(`http://localhost:3000/users?userId=${userID}`)
          .then(response => response.json())
          .then(data => {
              if (data.length > 0) {
                  setUser(data[0]);
                  setAddress(data[0].address)
                  setGeo(data[0].address.geo)
                  setCompany(data[0].company)
              }
          })
          .catch(error => {
              console.error('Error fetching user data:', error);
          });
  }, []);

    function hideInfo(){
        navigate(`/user/${userID}/home`)
    }
   return(
    <>
        <p> name: {user.name}</p>
        <p> user name: {user.username}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p>adress:</p>
        <p> street: {address.street}  suite:{address.suite} zipcode:{address.zipcode}</p>
        <p> geo:  lat:{geo.lat}  lng:{geo.lng}</p>
        <p>company:</p>
        <p> name: {company.name}</p><p> catch phrase:{company.catchPhrase} </p><p>bs:{company.bs}</p>
        <button onClick={hideInfo}>Hide info</button>
        
    </>
   )
   }
  
  export default Info