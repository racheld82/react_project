import {React, useState} from "react";
import "../style.css";



function UpdatePhoto(props){
    const photo=props.photo;
    const [title,setTitle]=useState(photo.title);
    const[url,setUrl]=useState(photo.url)
    async function updatePhoto(){
        try {
            const response = await fetch(`http://localhost:3000/photos/${photo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    url: url
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const updatedPhoto = await response.json();
            props.updateArr(updatedPhoto.id, name,url);
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    }
    return( <>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)}/>
        <button onClick={updatePhoto}>Confirm</button>
        </>)
}

export default UpdatePhoto