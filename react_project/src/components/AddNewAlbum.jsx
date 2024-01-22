import React, { useState } from 'react'
import { Post } from '../Post';
import { json, useLocation } from 'react-router-dom';
import { Album } from '../Album';

function AddNewAlbum(props){
  
    const [title,setTitle]=useState('');
    const id=JSON.parse(localStorage.getItem("currentUser")).id

    function addNewPost(){
        const album=new Album(id,title)
      fetch("http://localhost:3000/albums", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(album)
    }).then(response => response.json()).then(props.AddNewAlbum(album)).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={addNewPost}>Add</button>
        </>
    )

}

export default AddNewAlbum