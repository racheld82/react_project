import React from "react";
import { useState,useEffect ,useContext} from "react"
import Todo from "./Todo"
import UpdateTodo from "./UpdateTodo";
import AddNewTodo from './AddNewTodo'
import { useIdContext } from './Login';


function Todos() {
    const [todosArr, setTodosArr]=useState([])
    const [sortCriteria, setSortCriteria] = useState('sequential'); // קריטריון מיון
    const [searchCriteria, setSearchCriteria] = useState('none'); // קריטריון חיפוש
    const [searchIdCriteria, setSearchIdCriteria] = useState(''); // קריטריון חיפוש לפי ID
    const [searchAlphabeticalCriteria, setSearchAlphabeticalCriteria] = useState(''); // קריטריון
    const userId=useContext(useIdContext);
    function deleteFromArr(id){
      const updatedArr = todosArr.filter(item => item.id !== id);
      setTodosArr(updatedArr);
    }
    
    function handleSortChange(event) {
      setSortCriteria(event.target.value);
      sortTodos();
    };
  
    function handleSearchChange(event){
      setSearchCriteria(event.target.value);
    };
  
    const sortTodos = () => {
      switch (sortCriteria) {
        case 'sequential':
            setTodosArr(todosArr.sort((a, b) => a.id - b.id)); 
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
            setTodosArr(todosArr.slice().sort(() => Math.random() - 0.5)); // מיון 

        default:
          return todosArr;
      }
    };
  
    // פונקציה לחיפוש פריטים לפי קריטריון מסוים
  
    
      function handleSearchIdChange(event){
        setSearchIdCriteria(event.target.value);
      };
    
      function handleSearchAlphabeticalChange(event){
        setSearchAlphabeticalCriteria(event.target.value);
      };
    
      function searchedTodos(todo){
      
            switch (searchCriteria) {
              case 'sequential':
                return (
                  todo.id.toString().includes(searchIdCriteria)
                );
              case 'execution':
                return (
                  (searchIdCriteria === '' || (todo.completed ? 'true' : 'false') === searchIdCriteria)
                );
              case 'alphabetical':
                return (
                  todo.title.toLowerCase().startsWith(searchAlphabeticalCriteria.toLowerCase())
                );
              case 'none':
                return true;
              default:
                return false;
            }
 
      };
  

    useEffect(() => {
      fetch(`http://localhost:3000/todos?userId=${id}`)
          .then((response) => response.json())
          .then((data) => {
              setTodosArr(data);
          })
  }, [])
  
      return(
        <>
        { todosArr.map((todo) => { return (searchedTodos(todo)&&<Todo key={todo.id} todo={todo} deleteFromArr={deleteFromArr}/>)}) }

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


      {sortCriteria === 'sequential' && (
        <input
          type="text"
          placeholder="חיפוש לפי ID"
          value={searchIdCriteria}
          onChange={handleSearchIdChange}
        />
      )}

      {sortCriteria === 'alphabetical' && (
        <input
          type="text"
          placeholder="חיפוש לפי אות"
          value={searchAlphabeticalCriteria}
          onChange={handleSearchAlphabeticalChange}
        />
      )}

    </div>
  
    
      <button onClick={()=>{navigate(`/home/user/${userId}/todos/add`, {state:{userId:userId}})}}>Add An Item To The List</button>
    </>
      )
 }
  
  export default Todos