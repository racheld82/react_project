import { useEffect, useState } from 'react'
import React from 'react';
import { useRef } from 'react'
import {
    Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import AddNewTodo from './AddNewTodo';
import { Todo } from '../Todo';

function Todos() {
    const [todosArr, setTodosArr]=useState([])
    const [isFetched,setIsFetched]=useState(false)
    const [sortCriteria, setSortCriteria] = useState('sequential'); // קריטריון מיון
    const [searchCriteria, setSearchCriteria] = useState('none'); // קריטריון חיפוש
    const [searchIdCriteria, setSearchIdCriteria] = useState(''); // קריטריון חיפוש לפי ID
    const [searchAlphabeticalCriteria, setSearchAlphabeticalCriteria] = useState(''); // קריטריון
    const id=JSON.parse(localStorage.getItem("currentUser")).id
    function deleteFromArr(id){
      const updatedArr = todosArr.filter(item => item.id !== id);
      setTodosArr(updatedArr);

    }
    
    // פונקציה לשינוי קריטריון המיון
    const handleSortChange = (event) => {
      setSortCriteria(event.target.value);
      sortTodos();
    };
  
    // פונקציה לשינוי קריטריון החיפוש
    const handleSearchChange = (event) => {
      setSearchCriteria(event.target.value);

    };
  
    // פונקציה למיון המערך לפי הקריטריון הנבחר
    const sortTodos = () => {
      switch (sortCriteria) {
        case 'sequential':
            setTodosArr(todosArr.sort((a, b) => a.id - b.id)); // אין מיון
        case 'execution':
            setTodosArr(todosArr.slice().sort((a, b) => {
                // מיון לפי הקריטריון ביצוע
                if (a.completed && !b.completed) {
                  return -1; // אם a הוא TRUE ו b הוא FALSE, יש להציג a קודם
                } else if (!a.completed && b.completed) {
                  return 1; // אם b הוא TRUE ו a הוא FALSE, יש להציג b קודם
                } else {
                  return 0; // אם שני הערכים זהים או ששני הערכים הם TRUE או שני הערכים הם FALSE, אין צורך במיון
                }
              })
        ); // מיון לפי ביצוע
        case 'alphabetical':
            setTodosArr(todosArr.slice().sort((a, b) => a.title.localeCompare(b.title))); // מיון לפי אלפבית
        case 'random':
            setTodosArr(todosArr.slice().sort(() => Math.random() - 0.5)); // מיון 

        default:
          return todosArr;
      }
    };
  
    // פונקציה לחיפוש פריטים לפי קריטריון מסוים
  
    
      const handleSearchIdChange = (event) => {
        setSearchIdCriteria(event.target.value);
      };
    
      const handleSearchAlphabeticalChange = (event) => {
        setSearchAlphabeticalCriteria(event.target.value);
      };
    
      const searchedTodos = (todo) => {
      
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
  
  
  

    // function fetchArr(){
    // fetch(`http://localhost:3000/todos?userId=${id}`)
    //   .then(response => response.json())
    //   .then(data=>setTodosArr(data))
    // }

    async function fetchArr() {
      try {
        const response = await fetch(`http://localhost:3000/todos?userId=${id}`);
        const data = await response.json();
        setTodosArr(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    useEffect(() => {
      const fetchData = async () => {
        await fetchArr();
        setIsFetched(true)
      };
    
      fetchData();
    }, []);
    
    if(isFetched)
      return(
        <>
        { todosArr.map((todo) => { return (searchedTodos(todo)&&<Todo todo={todo} deleteFromArr={deleteFromArr}/>)}) }
        <div>

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
  
      </div>
      <button onClick={()=>{ console.log("hi"); 
      return <AddNewTodo userId={id}/>}}>Add An Item To The List</button>
    </>
      )
 }
  
  export default Todos