import { useEffect, useState } from 'react'
import { useRef } from 'react'
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import Info from "./Info.jsx"

function Home() {
    const [user,setUser]=useState({});
    const name=JSON.parse(localStorage.getItem("currentUser")).name

    useEffect(()=>{
    fetch(`http://localhost:3000/users?name=${name}`)
        .then(response => response.json())
        .then(data=>setUser(data))},[])
    const navigate=useNavigate()
    function logOut(){
        localStorage.removeItem("currentUser");
        navigate("/login");
    }


    return(
        <>
        <h1>{name}</h1>
        <Link to={{ pathname: `/home/user/${JSON.parse(localStorage.getItem("currentUser")).id}/info` , state: { user: user} }}>Info</Link>
        <Link to="/albums" >Albums</Link>
        <Link to="/posts">Posts</Link>
        <Link to={{ pathname: `/home/user/${JSON.parse(localStorage.getItem("currentUser")).id}/todos` }}>Todos</Link>
          
      
      
        
        <button onClick={logOut}>Log Out</button>
        </>
    )
  }
  
  export default Home