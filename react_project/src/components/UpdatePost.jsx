import {React, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';



function UpdatePost(props){
    const post=props.post;
  const navigate=useNavigate()
    const [title,setTitle]=useState(post.title);
    const[body,setBody]=useState(post.body)
    const userId=JSON.parse(localStorage.getItem("currentUser")).id
    function updatePost(){
        fetch(`http://localhost:3000/posts?id=${post.id}`, {
              method: 'PATCH',
         headers: {
        'Content-Type': 'application/json',
         },
        body: JSON.stringify({
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
    .then(props.updateArr(post.id,title,body))
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