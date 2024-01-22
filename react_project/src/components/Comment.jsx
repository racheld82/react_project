import React from 'react';

function Comment(props)  {
  const comment=props.comment
  const email=JSON.parse(localStorage.getItem("currentUser")).email

  
  return (
    <li key={comment.id}>
      {comment.name}: {comment.body}
      {email === comment.email && (
        <>
          <button onClick={() => handleUpdateComment(comment.id)}>עדכן</button>
          <button onClick={() => handleDeleteComment(comment.id)}>מחק</button>
        </>
      )}
    </li>
  );
};

export default Comment;