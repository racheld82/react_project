import React, { useState } from 'react'
import { Todo } from '../Todo';
import {useLocation, useNavigate} from 'react-router-dom';

function AddNewTodo(props){
    
    const [newTodo,setNewTodo]=useState('');
    const userId=JSON.parse(localStorage.getItem("currentUser")).id;
    const navigate=useNavigate()
    async function addNewTodo(){
        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextTodoId
            });

        let todo=new Todo(userId,id,newTodo)
        const urlPost = `http://localhost:3000/todos`;
        fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        }).then(response => response.json()).then(props.addToArr(todo)).catch(()=>{console.log("adding fail")})
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextTodoId": id + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
    }
      
    return(
        <>
        <input type='text' placeholder='the new todo' onChange={(e) => setNewTodo(e.target.value)}/>
        <button onClick={addNewTodo}>Add</button>
        </>
    )

}

export default AddNewTodo