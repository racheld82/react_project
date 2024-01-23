import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import {
  useLocation
} from "react-router-dom";
import AddNewComment from './AddNewComment';
import "../style.css";



function Comments(){
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

      function addToArr(id, title, body) {
        setComments(comments => comments.map((comment) => 
          (comment.id === id ? { ...comment, body: body, title: title } : comment)
        ));
      }

  function deleteFromArr(commentId){
    const updatedArr = comments.filter(item => item.id !== commentId);
    setComments(updatedArr);
  };

  function updateArr(id,name,body){
    setTodosArr(todosArr.map((item) => {if(item.id === id){item.name=name;item.body=body}}))
  }

  return (
    <div>
      <ul>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteFromArr={deleteFromArr}
            updateArr={updateArr}
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