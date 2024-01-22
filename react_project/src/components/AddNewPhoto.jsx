import React, { useState } from "react";
import { Photo } from "../Photo";


function AddNewPhoto(props){

    const [title,setTitle]=useState('');
    const [url,setUrl]=useState('')

    async function addNewPhoto(){
        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextPhotoId
            });
        const photo=new Photo(id,props.id,title,url)
      fetch("http://localhost:3000/photos", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(photo)
    }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    fetch("http://localhost:3000/nextID/1", {
        method: "PATCH",
        body: JSON.stringify({
            "nextPhotoId": id + 1
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
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