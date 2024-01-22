import React, { useState } from 'react'
import { CommentClass } from '../CommentClass';

function AddNewComment(props){
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

  
    const [name,setName]=useState('');
    const [email,setEmail]=useState("")
    const [body,setBody]=useState('')

    async function addNewComment(){

        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextCommentId
            });
        const comment=new CommentClass(id,props.postId,name,email,body);
        const urlPost = `http://localhost:3000/comments`;
        console.log("thipi");
        fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
          }).then(response => {response.json();  
        }).then(props.addToArr(comment)).catch(()=>{console.log("adding fail")})
        fetch("http://localhost:3000/nextID/1", {
        method: "PATCH",
        body: JSON.stringify({
            "nextCommentId": id + 1
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
    
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