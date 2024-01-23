import React, { useState } from 'react';
import UpdateComment from './UpdateComment';

function Comment(props)  {
  const[toUpdate,setToUpdate]=useState(false)
  const comment=props.comment
  const email=JSON.parse(localStorage.getItem("currentUser")).email

  function deleteComment(){
    fetch(`http://localhost:3000/posts/${comment.id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      }}).then(response => {
        response.json();
      }).catch(() => {
      console.log("delete fail");
      });
      props.deleteFromArr(comment.id);
  
  }

  return (
    <li key={comment.id}>
      {comment.name}: {comment.body}
      {email === comment.email && (
        <>
          <button onClick={() => {setToUpdate(true)}}>update</button>
          <button onClick={() => deleteComment(comment.id)}>delete</button>
          {toUpdate&& <UpdateComment updateArr={props.updateArr} comment={comment}/>}

        </>
      )}
    </li>
  );
};

export default Comment;