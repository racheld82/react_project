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
            localStorage.setItem("currentUser", JSON.stringify({
              "id": `${data[0].id}`,
              "name": `${data[0].name}`,
              "username": `${data[0].username}`,
              "email": `${data[0].email}`,
            
                  "street": `${data[0].address.street}`,
                  "suite": `${data[0].address.suite}`,
                  "city": `${data[0].address.city}`,
                  "zipcode": `${data[0].address.zipcode}`,
            
                      "lat": `${data[0].address.geo.lat}`,
                      "lng": `${data[0].address.geo.lng}`,
              "phone": `${data[0].phone}`,

        
                  "Cname": `${data[0].company.name}`,
                  "catchPhrase": `${data[0].company.catchPhrase}`,
                  "bs": `${data[0].company.bs}`
 
          })); // Assuming you want to store the first user from the response
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

