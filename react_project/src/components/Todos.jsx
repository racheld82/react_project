import React from "react";
import { useState,useEffect ,useContext} from "react"
import Todo from "./Todo"
import UpdateTodo from "./UpdateTodo";
import AddNewTodo from './AddNewTodo'
import { useIdContext } from './Login';
import { useNavigate } from "react-router-dom";


function Todos() {
    const [todosArr, setTodosArr]=useState([])
    const [toAdd,setToAdd]=useState(false)
    const [sortCriteria, setSortCriteria] = useState('none'); // קריטריון מיון
    const [searchCriteria, setSearchCriteria] = useState('none'); // קריטריון חיפוש
    const [searchInputCriteria, setSearchInputCriteria] = useState(''); // קריטריון חיפוש לפי ID
    // const userId=useContext(useIdContext);
    const userId=JSON.parse(localStorage.getItem("currentUser")).id
    const navigate=useNavigate()
    function deleteFromArr(id){
      const updatedArr = todosArr.filter(item => item.id !== id);
      setTodosArr(updatedArr);
    }

    function updateArr(id,title){
      setTodosArr(todosArr.map((item) => {if(item.id === id){item.title=title}}))

    }

    function addToArr(todo){
  
    }

    function handleSortChange(event) {
      setSortCriteria(event.target.value);
      sortTodos();
    };
  
    function handleSearchChange(event){
      setSearchCriteria(event.target.value);
    };
  
    function sortTodos () {
      switch (sortCriteria) {
        case 'sequential':
            setTodosArr(todosArr.sort((a, b) => {  if (a.id >b.id) {
              return -1; 
            } else if (a.id<b.id) {
              return 1; 
            } else {
              return 0; 
            }})); 
        case 'execution':
            setTodosArr(todosArr.slice().sort((a, b) => {
                if (a.completed && !b.completed) {
                  return -1; 
                } else if (!a.completed && b.completed) {
                  return 1; 
                } else {
                  return 0; 
                }
              })
        ); 
        case 'alphabetical':
            setTodosArr(todosArr.slice().sort((a, b) => a.title.localeCompare(b.title))); // מיון לפי אלפבית
        case 'random':
            setTodosArr(todosArr.slice().sort(() => Math.random() - 0.5)); 
        default:
          return todosArr;
      }
    };

      function searchedTodos(todo){
      
            switch (searchCriteria) {
              case 'sequential':
                return (
                  todo.id.toString().includes(searchInputCriteria)
                );
              case 'execution':
                return (
                  (searchInputCriteria === '' || (todo.completed ? 'true' : 'false') === searchInputCriteria)
                );
              case 'alphabetical':
                return (
                  todo.title.toLowerCase().startsWith(searchInputCriteria.toLowerCase())
                );
              case 'none':
                return true;
              default:
                return false;
            }
 
      };
  

    useEffect(() => {
      fetch(`http://localhost:3000/todos?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
              setTodosArr(data);
          })
  }, [])
  
      return(
        <>

        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="sequential">sequential</option>
          <option value="execution">execution</option>
          <option value="alphabetical">alphabetical</option>
          <option value="random">random</option>
          <option value="none">none</option>
        </select>

        <div>
      <select value={searchCriteria} onChange={handleSearchChange}>
        <option value="sequential">sequential</option>
        <option value="execution">execution</option>
        <option value="alphabetical">alphabetical</option>
        <option value="none">none</option>
      </select>


      {searchCriteria !== 'none'&& (
        <input
          type='text'
          placeholder="search term"
          value={searchInputCriteria}
          onChange={(event)=> setSearchInputCriteria(event.target.value)}
        />
      )}


    </div>
    { todosArr.map((todo) => { return (searchedTodos(todo)&&<Todo key={todo.id} todo={todo} deleteFromArr={deleteFromArr} updateArr={updateArr} />)}) }

  
    
      <button onClick={()=>{setToAdd(true)}}>Add An Item To The List</button>
      {toAdd&&<AddNewTodo addToArr={addToArr}/>}
    </>
      )
 }
  
  export default Todos