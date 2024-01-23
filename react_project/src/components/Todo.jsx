import React, { useState } from "react";
import UpdateTodo from "./UpdateTodo";
import "../style.css";

function Todo(props){

    let todo=props.todo;
    const[toUpdate,setToUpdate]=useState(false)

    function deleteTodo(){
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      }}).then(response => {
        response.json();
      }).catch(() => {
      console.log("delete fail");
      });
      props.deleteFromArr(todo.id);
      }
  
      function updateStatusTodo(){
        fetch(`http://localhost:3000/todos/${todo.id}`, {
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
        <button onClick={deleteTodo}>Delete</button>
        <button onClick={updateStatusTodo}>Update Status</button>
        <button onClick={()=>{setToUpdate(true)}}>Update</button>
        {toUpdate&&<UpdateTodo todo={todo} updateArr={props.updateArr}/>}
        </>
       
    )
}

export default Todo