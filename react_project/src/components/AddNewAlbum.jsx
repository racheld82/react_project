import React, { useState } from 'react'
import { Post } from '../Post';
import { useLocation } from 'react-router-dom';

function AddNewAlbum(){
  
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('')
    const data=useLocation()
    const id=data.state.userId

    function addNewPost(){
        let post=new Post(id,title,body);
      fetch("http://localhost:3000/albums", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' placeholder='post' onChange={(e) => setBody(e.target.value)}/>

        <button onClick={addNewPost}>Add</button>
        </>
    )

}

export default AddNewAlbum