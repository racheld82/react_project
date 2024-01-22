import React, { useState } from 'react';
import Comment from './Comment';
import CommentClass from '../CommentClass';
import UpdatePost from './UpdatePost';
import {
  Navigate,
  useNavigate, Link
} from "react-router-dom";


function Comments(props){
  const [comments, setComments] = useState([]);
  const data=useLocation();
  const postId = data.state.postId;
  const [name,setName]=useState('');
  const [email,setEmail]=useState("")
  const [body,setBody]=useState('')

  function addNewComment(){
      const comment=new CommentClass(postId,name,email,body);
      const urlPost = `https://localhost3000/comments`;
      fetch(urlPost, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
      }).then(response => response.json()).catch(()=>{console.log("adding fail")})
  }


  function fetchArr(){
    console.log(data.state.postId);
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data=>{setComments(data); console.log(data)})
    }
    useEffect(()=>{fetchArr()},[]);




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
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </ul>
      <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)}/>
      <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
      <input type='text' placeholder='comment' onChange={(e) => setBody(e.target.value)}/>
      <button onClick={()=>{addNewComment}}>Add</button>
    </div>
  );
};

export default Comments;