import React, { useState } from 'react';
import UpdateComment from './UpdateComment';
import "../style.css";

function Comment(props) {
  const [toUpdate, setToUpdate] = useState(false)
  const comment = props.comment
  const email = JSON.parse(localStorage.getItem("currentUser")).email

  function deleteComment() {
    console.log(comment.id);
    fetch(`http://localhost:3000/comments?id=${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      response.json();
      console.log("deleted")
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
          <button onClick={() => { setToUpdate(true) }}>update</button>
          <button onClick={() => deleteComment(comment.id)}>delete</button>
          {toUpdate && <UpdateComment updateArr={props.updateArr} comment={comment} />}
        </>
      )}
    </li>
  );
};

export default Comment;