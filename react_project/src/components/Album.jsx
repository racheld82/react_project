import React, { useEffect, useState } from 'react';
import { useLocation,useParams } from 'react-router-dom';

function Album () {
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [photos,setPhotos]=useState([])
  const limit=10
  const [offset, setOffset]=useState(1)
  const[fetchTimes,setFetchTimes]=useState(1)
  const { userId, albumId } = useParams();
  console.log(albumId)

  

//   const handleDeleteClick = (photoId) => {
//     onDeletePhoto(album.id, photoId);
//   };

//   const handleUpdateClick = (photoId) => {
//     const newUrl = prompt('Enter new photo URL:');
//     if (newUrl) {
//       onUpdatePhoto(album.id, photoId, newUrl);
//     }
//   };

//   const handleAddClick = () => {
//     if (newPhotoUrl) {
//       onAddPhoto(album.id, newPhotoUrl);
//       setNewPhotoUrl('');
//     }
//   };

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
      <div>
        <input
          type="text"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
          placeholder="New Photo URL"
        />
        {/* <button onClick={handleAddClick}>Add Photo</button> */}
      </div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          {/* <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
          <button onClick={() => handleUpdateClick(photo.id)}>Update</button> */}
        </div>
      ))}
       <button onClick={()=>{setOffset(photos[photos.length-1].id);setFetchTimes(fetchTimes+1);fetchPhotos()}}></button>
    </div>
   
  );
};

export default Album