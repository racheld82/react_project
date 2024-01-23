import React from 'react'
import { useState } from 'react'
import {User} from'./../User.js'
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import "../style.css";



function Details() {
    const[id,setId]=useState(0)
    const [email, setEmail]=useState("")
    const [name, setName]=useState("")
    const [phone, setPhone]=useState(null)
    const [street, setStreet]=useState("")
    const [suite, setSuite]=useState("")
    const [city, setCity]=useState("")
    const [zipcode, setZipcode]=useState("")
    const [lat, setLat]=useState(null)
    const [lng, setLng]=useState(null)
    const [companyName, setCompanyName]=useState("")
    const [catchParse, setCatchParse]=useState("")
    const [bs, setBs]=useState("")
    const navigate=useNavigate()
    const data=useLocation()

    function postNewUser(){
      let user=new User(id,name,data.state.name,email,street,suite,city,zipcode,lat,lng,phone,data.state.password,companyName,catchParse,bs);
      fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(localStorage.setItem("currentUser", JSON.stringify({
      "id": `${id}`,
      "name": `${name}`,
      "username": `${data.state.name}`,
      "email": `${email}`,
    
          "street": `${street}`,
          "suite": `${suite}`,
          "city": `${city}`,
          "zipcode": `${zipcode}`,
    
              "lat": `${lat}`,
              "lng": `${lng}`,
      "phone": `${phone}`,


          "name": `${companyName}`,
          "catchPhrase": `${catchParse}`,
          "bs": `${bs}`

  })))
    .then(navigate(`/home/user/${id}`))
   
    }

  return (
    <>
    <form onSubmit={postNewUser}>
        <input type='number' placeholder='ID' onChange={(e) => setId(e.target.value)}/>  
        <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' placeholder='name'onChange={(e) => setName(e.target.value)}/>
        <input type='number' placeholder='phone' onChange={(e) => setPhone(e.target.value)}/>
        <p>adress:</p>
        <input type='text' placeholder='street' onChange={(e) => setStreet(e.target.value)}/>
        <input type='text' placeholder='suite' onChange={(e) => setSuite(e.target.value)}/>
        <input type='text' placeholder='city' onChange={(e) => setCity(e.target.value)}/>
        <input type='text' placeholder='zipcode' onChange={(e) => setZipcode(e.target.value)}/>
        <p>geo:</p>
        <input type='number' placeholder='lat' onChange={(e) => setLat(e.target.value)}/>
        <input type='number' placeholder='lng' onChange={(e) => setLng(e.target.value)}/>
        <p>company:</p>
        <input type='text' placeholder='name' onChange={(e) => setCompanyName(e.target.value)}/> 
        <input type='text' placeholder='catchParse' onChange={(e) => setCatchParse(e.target.value)}/>
        <input type='text' placeholder='bs' onChange={(e) => setBs(e.target.value)}/>

        <button>Submit</button>
    </form>
    </>
  )
}

export default Details