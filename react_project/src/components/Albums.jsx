import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AddNewAlbum from './AddNewAlbum';
import styles from '../Albums.module.css';
import { UserContext } from '../UserProvider';
import "../style.css";


function Albums(){
  const [filter, setFilter] = useState('all');
  const[searchTerm,setSearchTerm] =useState('')
  const [albums,setAlbums]=useState([])
  const { userID } = useContext(UserContext);

  function handleFilterChange(newFilter){
    setFilter(newFilter);
  };

  useEffect(() => {
    console.log(userID)
    fetch(`http://localhost:3000/albums?userId=${userID}`)
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

  // function addAlbum(id, title, body) {
  //   setComments(comments => comments.map((comment) => 
  //     (comment.id === id ? { ...comment, body: body, title: title } : comment)
  //   ));
  // }

  return (
    <div className={styles.albumsContainer}>
      <Link to={`/home/user/${userID}`}>Back...</Link>
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
                      <Link to={{ pathname: `/home/user/${userID}/albums/${album.id}`}} className={styles.albumLink}>{album.id} - {album.title} <br /></Link>
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
//                 to={{ pathname: `/home/user/${userID}/albums/${album.id}` }}
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