import React, { useState, useContext } from 'react';
import Comments from './Comments';
import UpdatePost from './UpdatePost';
import {
  Navigate,
  useNavigate
} from "react-router-dom";
import { useIdContext } from './Login';


function Post(props) {
   const post=props.post;
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate=useNavigate()
  const userId = useContext(useIdContext);

  const style={

  }
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  function deletePost(){
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      }}).then(response => {
        response.json();
      }).catch(() => {
      console.log("delete fail");
      });
      props.deletePost(post.id);
  }


  return (
    <div>
      <p>{post.id} - {post.title}</p>
      <button onClick={handleExpand}>Expand</button>
      <button onClick={deletePost}>Delete</button>
      <button onClick={()=>{console.log(post);navigate(`/home/user/${userId}/posts/${post.id}/update`, {state:{post:post}})}}>Update</button>
      

      {isExpanded && (
        <div>
          <p>{post.body}</p>
          <button onClick={()=>navigate(`/home/user/${userId}/posts/${post.id}/comments`, {state:{postId:post.id}})}>Comments</button>
        </div>
      )}
    </div>
  );
};

export default Post
