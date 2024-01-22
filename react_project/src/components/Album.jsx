import React, { useEffect, useState } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import { Photo } from '../Photo';
import AddNewPhoto from './AddNewPhoto';

function Album () {
  const [photos,setPhotos]=useState([])
  const limit=10
  const [offset, setOffset]=useState(1)
  const[fetchTimes,setFetchTimes]=useState(1)
  const { albumId } = useParams();
  console.log(albumId)

  

  function handleDeleteClick(photoId){
    fetch(`http://localhost:3000/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      }}).then(response => {
        response.json();
      }).catch(() => {
      console.log("delete fail");
      });
      setPhotos(photos.filter(item => item.id !== photoId))
      
  };

  const handleUpdateClick = (photoId) => {
    const newUrl = prompt('Enter new photo URL:');
    if (newUrl) {
      onUpdatePhoto(album.id, photoId, newUrl);
    }
  };


  function fetchPhotos(){
     fetch(`http://localhost:3000/photos?albumId=1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPhotos([...data]);
        })
  }

  useEffect(()=>fetchPhotos(),[]);

  return (
    <div>
      <h2>Album 1</h2>
      <AddNewPhoto id={albumId}/>
  
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
          <button onClick={() => handleUpdateClick(photo.id)}>Update</button>
        </div>
      ))}
       <button onClick={()=>{setOffset(photos[photos.length-1].id);setFetchTimes(fetchTimes+1);fetchPhotos()}}></button>
    </div>
   
  );
};

export default Album