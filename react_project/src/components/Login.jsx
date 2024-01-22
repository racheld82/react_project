import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'
import { useRef } from 'react'
import {
  Navigate,
  useNavigate, Link
} from "react-router-dom";


 const IdContext = createContext();




 function Login() {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [, updateState] = useState();
    //const forceUpdate = React.useCallback(() => {updateState({});}, []);
    const [userId, setUserId] = useState(null);


    
    const navigate=useNavigate()

    useEffect(() => {
      console.log("tbh rumv kvmkhj cjhho ntus ntus ntus ntus"+userId)
      console.log(userId)
      if (userId) {
        navigate(`/home/user/${userId}`);
      }
    }, [userId, navigate]);

    function isValidUser(){
        fetch(`http://localhost:3000/users?username=${name}&&website=${password}`)
        .then(response => response.json())
        .then(data => {
          if (data !== null ) {
            localStorage.setItem("currentUser", JSON.stringify(data[0])); // Assuming you want to store the first user from the response
            // forceUpdate(); // Assuming forceUpdate is a function you defined elsewhere
            setUserId(data[0].id);

           // navigate(`/home/user/${userId}`);
          } else {
            alert("A problem occurred, try again!");
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          alert("An error occurred, try again!");
        });
       
      }

  return (
    <>
      <IdContext.Provider value={userId}>
      <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={isValidUser}>Login</button>

      <Link to="/register">New User?</Link>
      </IdContext.Provider>
    </>
  )
}

export default Login
export const useIdContext = () => useContext(IdContext);

