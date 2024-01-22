import {React, useState} from "react";
import {useLocation} from 'react-router-dom';



function UpdatePost(){
    const post=useLocation().state.post;
 
    const [title,setTitle]=useState(post.title);
    const[body,setBody]=useState(post.body)
    const id=JSON.parse(localStorage.getItem("currentUser")).id
    function updatePost(){
        fetch(`http://localhost:3000/posts/${post.id}`, {
              method: 'PUT',
         headers: {
        'Content-Type': 'application/json',
         },
        body: JSON.stringify({
            userId: id,
            title: title,
            body: body
         }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
   
    .catch(error => {
        console.error('Error updating TODO:', error);
    });
    }
    return( <>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)}/>
        <button onClick={updatePost}>Update</button>
        </>)
}

export default UpdatePost