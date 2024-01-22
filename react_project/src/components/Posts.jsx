import React from "react";
import { useState,useEffect } from "react";
import Post from "./Post";
import AddNewPost from './AddNewPost'
import {
  Navigate,
  useNavigate, Link
} from "react-router-dom";

function Posts(){
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('none'); 
  const id=JSON.parse(localStorage.getItem("currentUser")).id;
  const navigate=useNavigate();

  useEffect(() => {
    getPost();
}, [])

function getPost(){
  fetch(`http://localhost:3000/posts?userId=${id}`)
  .then((response) => response.json())
  .then((data) => {
      setPosts(data);
  })
}

    const handleSearchChange = (event) => {
        setSearchCriteria(event.target.value);
  
      };
  function deletePost(id){
    setPosts(posts.filter(item => item.id !== id))
  }

  function updatePost(id,body,title){
    setPosts(posts.map((item) => {if(item.id === id){item.body=body;item.title=title}}))
  }

  function filteredPosts(post){
    switch (searchCriteria) {
        case 'sequential':
          return (
            post.id.toString().includes(searchTerm)
          );
        case 'title':
          return (
           post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
        case 'none':
          return true;
        default:
          return false;
      }

  }
  return (
    <>
     <select value={searchCriteria} onChange={handleSearchChange}>
        <option value="sequential">sequential</option>
        <option value="title">title</option>
        <option value="none">none</option>
      </select>


    <div>
      <input
        type="text"
        placeholder="search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      {posts.map((post) => (filteredPosts(post)&&
        <Post post={post} deletePost={deletePost} updatePost={updatePost}/>
      ))}
    </div>

    <button onClick={()=>navigate(`/home/user/${id}/posts/add`, {state:{userId:id}})}>Add New Post</button>
    </>
  );
};



export default Posts