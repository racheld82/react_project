import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import {CommentClass} from '../CommentClass';
import UpdatePost from './UpdatePost';
import {
  useLocation
} from "react-router-dom";
import AddNewComment from './AddNewComment';



function Comments(props){
  const [comments, setComments] = useState([]);
  const data=useLocation();
  const postId = data.state.postId;


  function fetchArr(){
    console.log(data.state.postId);
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data=>{setComments(data); console.log(data)})
    }
    useEffect(()=>{fetchArr()},[]);

    function addToArr(comment){

    }


  function handleDeleteComment(commentId){
    const urlDelete = `http://localhost:3000/todos?id=${commentId}`;
  
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
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </ul>
      {/* <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)}/>
      <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
      <input type='text' placeholder='comment' onChange={(e) => setBody(e.target.value)}/>
      <button onClick={()=>{addNewComment}}>Add</button> */}
      <AddNewComment postId={postId} addToArr={addToArr}/>
    </div>
  );
};

export default Comments;