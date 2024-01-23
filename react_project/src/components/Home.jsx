import { useEffect, useState, useContext } from 'react'
import {
    Link,
    useNavigate
} from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../style.css";


function Home() {
    // const [user,setUser]=useState({});
    const { userID, updateUserID } = useContext(UserContext);
    const name=JSON.parse(localStorage.getItem("currentUser")).name

    // useEffect(()=>{
    //     fetch(`http://localhost:3000/users?id=${userID}`)
    //         .then(response => response.json())
    //         .then(data=>setUser(data))
    //     // updateUserID(id);

    // },[])


    const navigate=useNavigate()
    function logOut(){
        localStorage.removeItem("currentUser");
        navigate("/login");
    }


    return(
        <>
        <h1>{name}</h1>
        <Link to={{ pathname: `/home/user/${userID}/info` }}>Info</Link>
        <Link to={{ pathname: `/home/user/${userID}/albums` }} >Albums</Link>
        <Link to={{ pathname: `/home/user/${userID}/posts`}}>Posts</Link>
        <Link to={{ pathname: `/home/user/${userID}/todos`}}>Todos</Link> 
        <button onClick={logOut}>Log Out</button>
        </>
    )
  }
  
  export default Home