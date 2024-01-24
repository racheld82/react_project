import React from 'react';
import { useRef } from 'react'
import {
  useNavigate
} from "react-router-dom";
import "../style.css";

function Info() {
    const navigate=useNavigate()
    const [user,setUser]=useState({});
    //const name=JSON.parse(localStorage.getItem("currentUser")).name
    const userId = useIdContext();
    // const user=JSON.parse(localStorage.getItem("currentUser"))

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
        navigate(`/home/user/${user.id}`)
    }
   return(
    <>
        <p> name: {user.name}</p>
        <p> user name: {user.username}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p>adress:</p>
        <p> street: {user.address.street}  suite:{user.address.suite} zipcode:{user.address.zipcode}</p>
        <p> geo:  lat:{user.address.geo.lat}  lng:{user.address.geo.lng}</p>
        <p>company:</p>
        <p> name: {user.company.name}</p><p> catch parse:{user.company.catchPharse} </p><p>bs:{user.company.bs}</p>
        <button onClick={hideInfo}>Hide info</button>
        
    </>
   )
   }
  
  export default Info