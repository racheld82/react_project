import React, { useState, useEffect, useContext } from 'react';
import Album from './Album';
import { Link } from 'react-router-dom';
import { useIdContext } from './Login';

function Albums(){
  const [filter, setFilter] = useState('all');
  const[searchTerm,setSearchTerm] =useState('')
  const [albums,setAlbums]=useState([])
 const userId = useIdContext();


  function handleFilterChange(newFilter){
    setFilter(newFilter);
  };

  useEffect(() => {
    console.log(userId)
    fetch(`http://localhost:3000/albums?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
            setAlbums(data);
        })
}, [])


function searchAlbum(album){
      
    switch (filter) {
      case 'title':
        return (
            album.title.toLowerCase().startsWith(searchTerm.toLowerCase())
          
        );
      case 'id':
        return (
            album.id.toString().startsWith(searchTerm)
        );
      case 'all':
        return true;
      default:
        return false;
    }

};



  const handleAddAlbumClick = () => {
    
  };

  return (
    <div>
      <h2>Albums</h2>
    
       
          <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="all">All Albums</option>
            <option value="title">Title</option>
            <option value="id">Id</option> 
          </select>

          <input type='text' onChange={(e) => setSearchTerm(e.target.value)}/>
      
   
      <ul>
        {
         albums.map((album) => (
        searchAlbum(album)&&
        <Link to={{ pathname: `/home/user/${userId}/albums/${album.id}`}}>{album.id} - {album.title} <br /></Link>      
        ))}
      </ul>
      <button onClick={handleAddAlbumClick}>Add Album</button>
    </div>
  );
};

export default Albums;