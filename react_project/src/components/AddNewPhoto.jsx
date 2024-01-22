import React, { useState } from "react";
import { Photo } from "../Photo";


function AddNewPhoto(props){

    const [title,setTitle]=useState('');
    const [url,setUrl]=useState('')

    function addNewPhoto(){
        const photo=new Photo(props.id,title,url)
      fetch("http://localhost:3000/photos", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(photo)
    }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' placeholder='URL' onChange={(e) => setUrl(e.target.value)}/>
        <button onClick={addNewPhoto}>Add</button>
        </>
    )


}

export default AddNewPhoto