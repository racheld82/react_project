import {React, useState} from "react";
import "../style.css";


function UpdatePost(props){
    const post=props.post;
    const [title,setTitle]=useState(post.title);
    const[body,setBody]=useState(post.body)
    async function updatePost(){
        try {
            const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const updatedPost = await response.json();
            props.updateArr(updatedPost.id, title,body);
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    }
    return( <>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)}/>
        <button onClick={updatePost}>Update</button>
        </>)
}

export default UpdatePost