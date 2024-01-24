import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddNewPhoto from './AddNewPhoto';
import UpdatePhoto from './UpdatePhoto';
import "../style.css";

function Album() {
  const [photos, setPhotos] = useState([])
  const [fetchTimes, setFetchTimes] = useState(1)
  const { albumId } = useParams();
  const [update, setUpdate] = useState(null);
  const perPage = 12;
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(1)
  const [isThereMorePhotos, setIsThereMorePhotos] = useState(true)
  const [end,setEnd]=useState(start+12)

  function addToArr(photo) {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
  }

  function handleDeleteClick(photoId) {
    fetch(`http://localhost:3000/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      response.json();
    }).catch(() => {
      console.log("delete fail");
    });
    setPhotos(photos.filter(item => item.id !== photoId))

  };

  function loadMore() {
    setPage(page + 1);
    setStart(start+12);
    setEnd(end+12)
    fetchPhotos();
    setFetchTimes(fetchTimes + 1);
  }

  function updateArr(id, title, url) {
    setPhotos(photos => photos.map((photo) =>
      (photo.id === id ? { ...photo, title: title, url: url } : photo)
    ));
  }

  function fetchPhotos() {
    fetch(`http://localhost:3000/photos?albumId=${albumId}&_page=${page}&_limit=${perPage}&_start=${start}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });

    fetch(`http://localhost:3000/photos?albumId=${albumId}&_start=${start + 12}`)
      .then((response) => response.json()) 
      .then((data) => {
        if (data === null || data.length === 0) {
          setIsThereMorePhotos(false);
          console.log("done");
        }
      })
      .catch(() => setIsThereMorePhotos(false));
  }

  useEffect(() => fetchPhotos(), []);

  return (
    <div>
      <h2>Album {albumId}</h2>
      <AddNewPhoto albumId={albumId} addToArr={addToArr} />

      {photos.slice(0, 10 * fetchTimes).map((photo) => (
        <div key={photo.id}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
          <button onClick={() => { setUpdate(photo.id) }}>Update</button>
          {(update == photo.id) && <UpdatePhoto photo={photo} updateArr={updateArr} />}
        </div>

      ))}
      <button onClick={loadMore} disabled={!isThereMorePhotos}>load more</button>
    </div>

  );
};

export default Album