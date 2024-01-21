import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import AddNewComment from './AddNewComment';
import { useLocation } from 'react-router-dom';


function Comments(props){
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const data=useLocation();
  const postId = data.state.postId;


  function fetchArr(){
    console.log(data.state.postId);
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data=>{setComments(data); console.log(data)})
    }
    
    useEffect(()=>{fetchArr()},[]);


//   function handleUpdateComment(commentId){
//     fetch(`http://localhost:3000/comments?id=${commentId}`, {
//                 method: 'PUT',
//            headers: {
//           'Content-Type': 'application/json',
//            },
//           body: JSON.stringify({
//               completed: todo.completed,
//            }),
//       })
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .catch(error => {
//           console.error('Error updating TODO:', error);
//       });

//   };

  function handleDeleteComment(commentId){
    const urlDelete = `https://localhost:3000/todos?id=${commentId}`;
  
    fetch(urlDelete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    }).then(response => response.json()).then(props.deleteFromArr(todo.id))
    .catch(()=>console.log("delete fail"));


    
  };

  return (
    <div>
      <ul>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            //activeUser={activeUser}
            //handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </ul>
      <input type="text" placeholder="Add Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
      <button onClick={()=>{<AddNewComment postId={props.postId}/>}}>Add</button>
    </div>
  );
};

export default Comments;