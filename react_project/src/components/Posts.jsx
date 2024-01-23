import { useState,useEffect, useContext } from "react";
import Post from "./Post";
import {
  useNavigate
} from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../style.css";

function Posts(){
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('none'); 
  const { userID } = useContext(UserContext);

  const navigate=useNavigate();

  useEffect(() => {
    getPost();
}, [])

function getPost(){
  fetch(`http://localhost:3000/posts?userId=${userID}`)
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

    function updateArr(id, title, body) {
      setPosts(posts => posts.map((post) => 
        (post.id === id ? { ...post, body: body, title: title } : post)
      ));
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
        <Post key={post.id} post={post} deletePost={deletePost} updateArr={updateArr}/>
      ))}
    </div>

    <button onClick={()=>navigate(`/home/user/${userID}/posts/add`)}>Add New Post</button>
    </>
  );
};



export default Posts