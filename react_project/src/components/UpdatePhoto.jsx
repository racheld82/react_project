import {React, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';



function UpdatePhoto(props){
    const photo=props.photo;
    const navigate=useNavigate()
    const [name,setName]=useState(photo.name);
    const[url,setUrl]=useState(photo.url)
    const userId=JSON.parse(localStorage.getItem("currentUser")).id
    async function updatePhoto(){
        try {
            const response = await fetch(`http://localhost:3000/posts/${photo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    body: body
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
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)}/>
        <button onClick={updatePhoto}>Update</button>
        </>)
}

export default UpdatePhoto