import React from "react";
import { useState,useEffect ,useContext} from "react"
import Todo from "./Todo"
import AddNewTodo from './AddNewTodo'
import { UserContext } from '../UserProvider';
import "../style.css";


function Todos() {
    const [todoArr, setTodos]=useState([])
    const [toAdd,setToAdd]=useState(false)
    const [sortCriteria, setSortCriteria] = useState('none'); // קריטריון מיון
    const [searchCriteria, setSearchCriteria] = useState('none'); // קריטריון חיפוש
    const [searchInputCriteria, setSearchInputCriteria] = useState(''); // קריטריון חיפוש לפי userID
    const { userID } = useContext(UserContext);
    const userId = userID;

    console.log(userID)
    console.log("userId")
    console.log(userId)

    useEffect(() => {
      getTodo();
  }, [])
  
  function getTodo(){
    fetch(`http://localhost:3000/todos?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
        setTodos(data);
    })
  }


    function deleteFromArr(todoId){
      const updatedArr = todoArr.filter(item => item.id !== todoId);
      setTodos(updatedArr);
    }

    function updateArr(todoId,title){
      setTodos(todoArr.map((item) => {if(item.id === todoId){item.title=title}}))

    }

    function addToArr(todo){
      setTodos((prevTodos) => [...prevTodos, todo]);
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
          let tempTodos = [];
          todoArr.map(t => tempTodos.push(t));
          tempTodos.sort((a, b) => (a.userID < b.userID) ? -1 : 1);
          setTodos(tempTodos)
            break;
        case 'execution':
            setTodos(todoArr.slice().sort((a, b) => {
                if (a.completed && !b.completed) {
                  return -1; 
                } else if (!a.completed && b.completed) {
                  return 1; 
                } else {
                  return 0; 
                }
              })
            
        ); 
        break;
        case 'alphabetical':
          let tempTodos1 = [];
          todoArr.map(t => tempTodos1.push(t));
          tempTodos1.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1);
          setTodos(tempTodos1)
            break;
        case 'random':
            setTodos(todoArr.slice().sort(() => Math.random() - 0.5)); 
            break;
       
      }
    };

      function searchedTodos(todo){
      
            switch (searchCriteria) {
              case 'sequential':
                return (
                  todo.userID.toString().includes(searchInputCriteria)
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
    { todoArr.map((todo) => { return (searchedTodos(todo)&&<Todo key={todo.id} todo={todo} deleteFromArr={deleteFromArr} updateArr={updateArr} />)}) }

  
    
      <button onClick={()=>{setToAdd(true)}}>Add An Item To The List</button>
      {toAdd&&<AddNewTodo addToArr={addToArr}/>}
    </>
      )
 }
  
  export default Todos