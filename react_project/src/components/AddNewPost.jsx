import React, { useState } from 'react'
import { Post } from '../Post';
import { useLocation, useNavigate } from 'react-router-dom';

function AddNewPost(){
  
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('')
    const navigate=useNavigate()
    const data=useLocation()
    const userId=JSON.parse(localStorage.getItem("currentUser")).id

    async function addNewPost(){
        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextPostId
            });
        let post=new Post(id,userId,title,body);
      fetch("http://localhost:3000/posts", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextPostId": id + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then(navigate(`/home/user/${userId}/posts`))
    }

    return(
        <>
        <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' placeholder='post' onChange={(e) => setBody(e.target.value)}/>
        <button onClick={addNewPost}>Add</button>
        </>
    )

}

export default AddNewPost