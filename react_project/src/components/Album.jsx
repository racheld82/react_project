import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddNewPhoto from './AddNewPhoto';
import UpdatePhoto from './UpdatePhoto';
import "../style.css";

function Album () {
  const [photos,setPhotos]=useState([])
  const limit=10
  const [offset, setOffset]=useState(1)
  const[fetchTimes,setFetchTimes]=useState(1)
  const { albumId } = useParams();
  const [update, setUpdate] = useState(null);


  function addToArr(photo){
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
  }

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

  function updateArr(id,title,url){
    setPhotos(photos.map((item) => {if(item.id === id){item.title=title;item.url=url}}))
    console.log(photos)
  }


  function fetchPhotos(){
    fetch(`http://localhost:3000/photos?albumId=${albumId}`)
       .then((response) => response.json())
       .then((data) => {
           console.log(data)
           setPhotos([...data]);
       })
 }

 useEffect(()=>fetchPhotos(),[]);

  return (
    <div>
      <h2>Album {albumId}</h2>
      <AddNewPhoto albumId={albumId} addToArr={addToArr}/>
  
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
          <button onClick={() => {setUpdate(photo.id)}}>Update</button>
          {(update==photo.id)&&<UpdatePhoto photo={photo} updateArr={updateArr} />}
        </div>
        
      ))}
       <button onClick={()=>{setOffset(photos[photos.length-1].id);setFetchTimes(fetchTimes+1);fetchPhotos()}}></button>
    </div>
   
  );
};

export default Album