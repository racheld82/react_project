import {React, useState} from "react";
import { useLocation } from "react-router-dom";


function UpdateTodo(){
    const todo=useLocation().state.todo
    const [title,setTitle]=useState(todo.title);
    function updateTodo(){
        fetch(`http://localhost:3000/todos?id=${todo.id}`, {
              method: 'PUT',
         headers: {
        'Content-Type': 'application/json',
         },
        body: JSON.stringify({
            title: title,
         }),
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error updating TODO:', error);
    });
    }
    return( <>
        <input type='text' placeholder='update todo' value={todo.title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={updateTodo}>Update</button>
        </>)
}

export default UpdateTodo