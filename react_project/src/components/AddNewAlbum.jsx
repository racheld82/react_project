import React, { useState } from 'react'
import { Post } from '../Post';
import { json, useLocation } from 'react-router-dom';
import { Album } from '../Album';

function AddNewAlbum(props){
  
    const [title,setTitle]=useState('');
    const userId=JSON.parse(localStorage.getItem("currentUser")).id

    async function addNewPost(){
        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextAlbumId
            });
        const album=new Album(id,userId,title)
      fetch("http://localhost:3000/albums", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(album)
    }).then(response => response.json()).then(props.addAlbum(album)).catch(()=>{console.log("adding fail")})
    fetch("http://localhost:3000/nextID/1", {
        method: "PATCH",
        body: JSON.stringify({
            "nextAlbumId": id + 1
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
    }
      

    return(
        <>
        <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={addNewPost}>Add</button>
        </>
    )

}

export default AddNewAlbum

// import React, { useState } from 'react'
// import { Post } from '../Post';
// import { json, useLocation } from 'react-router-dom';
// import { Album } from '../Album';

// function AddNewAlbum(props){
  
//     const [title,setTitle]=useState('');
//     const id=JSON.parse(localStorage.getItem("currentUser")).id

//     function addNewPost(){
//         const album=new Album(id,title)
//         console.log(album)
//       fetch("http://localhost:3000/albums", {
//         method: 'POST',
//         headers: {
//            'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(album)
//     }).then(response => response.json()).then(props.addAlbum(album)).catch(()=>{console.log("adding fail")})
//     }
      

//     return(
//         <>
//         <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
//         <button onClick={addNewPost}>Add</button>
//         </>
//     )

// }

// export default AddNewAlbum