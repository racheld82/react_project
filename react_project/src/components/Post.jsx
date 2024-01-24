import React, { useState, useContext } from 'react';
import UpdatePost from './UpdatePost';
import {
  useNavigate
} from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../style.css";

function Post(props) {
  const post = props.post;
  const [isExpanded, setIsExpanded] = useState(false);
  const [toUpdate, setToUpdate] = useState(false)
  const navigate = useNavigate()
  const { userID } = useContext(UserContext);

  const style = {

  }
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  function deletePost() {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      response.json();
    }).catch(() => {
      console.log("delete fail");
    });
    props.deletePost(post.id);
  }


  return (
   
      <div style={isExpanded ? { border: '1px solid #000', padding: '10px', marginBottom: '10px', backgroundColor: '#f0f0f0' } : {}}>
      <p>{post.id} - {post.title}</p>
      <button onClick={handleExpand}>Expand</button>
      <button onClick={deletePost}>Delete</button>
      <button onClick={() => { setToUpdate(!toUpdate) }}>Update</button>
      <div>{toUpdate && <UpdatePost post={post} updateArr={props.updateArr} />}</div>

      {isExpanded && (
        <div>
          <p>{post.body}</p>
          <button onClick={() => navigate(`/home/user/${userID}/posts/${post.id}/comments`, { state: { postId: post.id } })}>Comments</button>
        </div>
      )}
      <p>-------------------</p>
    </div>
  );
};

export default Post
