import { useEffect, useState } from 'react'
import { useRef } from 'react'
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

function Home() {
    const [user,setUser]=useState({});
    const name=JSON.parse(localStorage.getItem("currentUser")).name
    const id=JSON.parse(localStorage.getItem("currentUser")).id

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
        <Link to={{ pathname: `/home/user/${id}/info` , state: { user: user} }}>Info</Link>
        <Link to={{ pathname: `/home/user/${id}/albums` }} >Albums</Link>
        <Link to="/posts">Posts</Link>
        <Link to={{ pathname: `/home/user/${id}/todos` }}>Todos</Link>
          
      
      
        
        <button onClick={logOut}>Log Out</button>
        </>
    )
  }
  
  export default Home