import React, { useState, useEffect } from 'react';
import Album from './Album';
import { Link } from 'react-router-dom';

function Albums(){
  const [filter, setFilter] = useState('all');
  const[searchTerm,setSearchTerm] =useState('')
  const [albums,setAlbums]=useState([])
  const id=JSON.parse(localStorage.getItem("currentUser")).id

  function handleFilterChange(newFilter){
    setFilter(newFilter);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/albums?userId=${id}`)
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
        //   <li key={album.id}>
        //     {/* <Album  
        //       id={album.id}
        //       title={album.title}
        //     //   onAlbumClick={onAlbumClick}
        //     //   onDeleteAlbum={onDeleteAlbum}
        //     //   onViewDetails={onViewDetails}
        //     />
        //   </li> */}
        <Link to={{ pathname: `/home/user/${id}/albums/${album.id}`}}>{album.id} - {album.title} <br /></Link>      
        ))}
      </ul>
      <button onClick={handleAddAlbumClick}>Add Album</button>
    </div>
  );
};

export default Albums;