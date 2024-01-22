import React from "react";
import UpdateTodo from "./UpdateTodo";
import { useNavigate } from "react-router-dom";

function Todo(props){

    let todo=props.todo;
    const navigate=useNavigate()
    const id=JSON.parse(localStorage.getItem("currentUser")).id

    function deleteTodo(){
        const urlDelete = `https://localhost:3000/todos?id=${todo.id}`;
  
        fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        }).then(response => response.json()).then(props.deleteFromArr(todo.id))
        .catch(()=>console.log("delete fail"));
  
      }
  
      function updateStatusTodo(){
        fetch(`http://localhost:3000/todos?id=${todo.id}`, {
                method: 'PUT',
           headers: {
          'Content-Type': 'application/json',
           },
          body: JSON.stringify({
              completed: todo.completed,
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
    return(
        <>
        <p>id:{todo.id} title:{todo.title}</p>
        <input type='checkbox' checked={todo.completed} onChange={()=>{todo.completed=checked}} value={todo.completed}>Completed?</input>
        <button onClick={deleteTodo}>Delete</button>
        <button onClick={updateStatusTodo}>Update Status</button>
        <button onClick={()=>{navigate(`/home/user/${id}/todos/${todo.id}/update`, {state:{todo:todo}})}}>Update</button>
        </>
       
    )
}

export default Todo