import React from "react";
import { useState,useEffect } from "react";
import Post from "./Post";
import AddNewPost from './AddNewPost'

function Posts(){
  
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('none'); 
  const id=JSON.parse(localStorage.getItem("currentUser")).id

  useEffect(() => {
    fetch(`http://localhost:3000/posts?userId=${id}`)
        .then((response) => response.json())
        .then((data) => {
            setPosts(data);
        })
}, [])

function addPost(){
  return(
    <AddNewPost/>

  )
}

    const handleSearchChange = (event) => {
        setSearchCriteria(event.target.value);
  
      };

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
        <Post key={post.id} post={post} />
      ))}
    </div>

    <button onClick={addPost}>Add New Post</button>
    </>
  );
};



export default Posts