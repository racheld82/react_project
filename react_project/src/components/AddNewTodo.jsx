import React, { useState } from 'react'
import { Todo } from '../Todo';
import {useLocation} from 'react-router-dom';

function AddNewTodo(){
    
    const [newTodo,setNewTodo]=useState('');
    const id=useLocation().state.id;
    function addNewTodo(){
        let todo=new Todo(id,newTodo)
        const urlPost = `http://localhost:3000/todos`;

        fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
          }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='the new todo' onChange={(e) => setNewTodo(e.target.value)}/>
        <button onClick={addNewTodo}>Add</button>
        </>
    )

}

export default AddNewTodo