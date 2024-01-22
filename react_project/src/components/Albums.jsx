import React, { useState, useEffect, useContext } from 'react';
import Album from './Album';
import { Link } from 'react-router-dom';
import { useIdContext } from './Login';
import AddNewAlbum from './AddNewAlbum';
import styles from '../Albums.module.css';

function Albums(){
  const [filter, setFilter] = useState('all');
  const[searchTerm,setSearchTerm] =useState('')
  const [albums,setAlbums]=useState([])
//  const userId = useIdContext();
const userId=JSON.parse(localStorage.getItem("currentUser")).id


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



 function addAlbum(album) {
  setAlbums((prevAlbums) => [...prevAlbums, album]);
  };

  return (
    <div className={styles.albumsContainer}>
      <h2 className={styles.albumsHeader}>Albums</h2>
          <select value={filter} onChange={(e) => handleFilterChange(e.target.value)} className={styles.filterSelect}>
            <option value="all">All Albums</option>
            <option value="title">Title</option>
            <option value="id">Id</option> 
          </select>
          <input type='text' onChange={(e) => setSearchTerm(e.target.value)}/>
      
   
      <ul className={styles.albumList}>
        {
         albums.map((album) => (
        searchAlbum(album)&&(
            <li className={styles.albumListItem} key={album.id}>
                      <Link to={{ pathname: `/home/user/${userId}/albums/${album.id}`}} className={styles.albumLink}>{album.id} - {album.title} <br /></Link>
          </li>
        )
        ))}
      </ul>
      <div className={styles.addAlbumForm}>
      <AddNewAlbum addAlbum={addAlbum}/>
      </div>
    </div>
  );
};

export default Albums;







//   return (
//     <div className={styles.albumsContainer}>
//       <h2 className={styles.albumsHeader}>Albums</h2>
//       <select
//         value={filter}
//         onChange={(e) => handleFilterChange(e.target.value)}
//         className={styles.filterSelect}
//       >
//         {/* ... */}
//       </select>
//       <input type='text' onChange={(e) => setSearchTerm(e.target.value)} />

//       <ul className={styles.albumList}>
//         {albums.map((album) => (
//           searchAlbum(album) && (
//             <li className={styles.albumListItem} key={album.id}>
//               <Link
//                 to={{ pathname: `/home/user/${userId}/albums/${album.id}` }}
//                 className={styles.albumLink}
//               >
//                 {album.id} - {album.title} <br />
//               </Link>
//             </li>
//           )
//         ))}
//       </ul>
//       <div className={styles.addAlbumForm}>
//         <AddNewAlbum addAlbum={addAlbum} />
//       </div>
//     </div>
//   );
// }

// export default Albums;