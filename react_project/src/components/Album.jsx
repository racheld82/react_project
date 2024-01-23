// import React, { useEffect, useState } from 'react';
// import { useLocation,useParams } from 'react-router-dom';
// import { Photo } from '../Photo';
// import AddNewPhoto from './AddNewPhoto';

// function Album () {
//   const [photos,setPhotos]=useState([])
//   const limit=10
//   const [offset, setOffset]=useState(1)
//   const[fetchTimes,setFetchTimes]=useState(1)
//   const { albumId } = useParams();
//   const [update, setUpdate] = useState(false);


  

//   function handleDeleteClick(photoId){
//     fetch(`http://localhost:3000/photos/${photoId}`, {
//       method: 'DELETE',
//       headers: {
//       'Content-Type': 'application/json',
//       }}).then(response => {
//         response.json();
//       }).catch(() => {
//       console.log("delete fail");
//       });
//       setPhotos(photos.filter(item => item.id !== photoId))
      
//   };

//   const UpdatePhoto = (photoId) => {
//     const newUrl = prompt('Enter new photo URL:');
//     if (newUrl) {
//       onUpdatePhoto(album.id, photoId, newUrl);
//     }
//   };


//   function fetchPhotos(){
//      fetch(`http://localhost:3000/photos?albumId=${albumId}`)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             setPhotos([...data]);
//         })
//   }

//   useEffect(()=>fetchPhotos(),[]);

//   return (
//     <div>
//       <h2>Album {albumId}</h2>
//       <AddNewPhoto albumId={albumId}/>
  
//       {photos.map((photo) => (
//         <div key={photo.id}>
//           <img src={photo.thumbnailUrl} alt={photo.title} />
//           <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
//           {/* <button onClick={() => handleUpdateClick(photo.id)}>Update</button> */}
//         </div>
//       ))}
//        {/* <button onClick={()=>{setOffset(photos[photos.length-1].id);setFetchTimes(fetchTimes+1);fetchPhotos()}}>load more</button> */}
//     </div>
   
//   );
// };

// export default Album

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
  const [update, setUpdate] = useState(false);


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

  function updateArr(id,name,url){
    setPhotos(todosArr.map((item) => {if(item.id === id){item.name=name;item.url=url}}))
  }


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
      <h2>Album {albumId}</h2>
      <AddNewPhoto albumId={albumId} addToArr={addToArr}/>
  
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
          <button onClick={() => {setUpdate(true)}}>Update</button>
          {update&&<UpdatePhoto photo={photo} updateArr={updateArr} />}
        </div>
        
      ))}
       <button onClick={()=>{setOffset(photos[photos.length-1].id);setFetchTimes(fetchTimes+1);fetchPhotos()}}></button>
    </div>
   
  );
};

export default Album