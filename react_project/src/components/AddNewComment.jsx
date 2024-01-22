import React, { useState } from 'react'
import { CommentClass } from '../CommentClass';

function AddNewComment(props){
  
    const [name,setName]=useState('');
    const [email,setEmail]=useState("")
    const [body,setBody]=useState('')

    function addNewComment(){
        const comment=new CommentClass(props.postId,name,email,body);
        const urlPost = `http://localhost:3000/comments`;
        console.log("thipi");
        fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
          }).then(response => {response.json();         console.log("thipi pasternak");
        }).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)}/>
        <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' placeholder='comment' onChange={(e) => setBody(e.target.value)}/>

        <button onClick={addNewComment}>Add</button>
        </>
    )

}

export default AddNewComment