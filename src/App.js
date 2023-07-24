import React, { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import {createContext} from 'react'
import ReactSwitch from 'react-switch'
import axios from 'axios'

export const ThemeContext = createContext(null)

export default function App() {
const [todos,setTodos] = useState([])
const [filter,setFilter] = useState('all')
const [theme,setTheme] = useState('light')


useEffect( ()=>{
  if (todos.length===0) return ;
  localStorage.setItem('todos',JSON.stringify(todos))
},[todos])

// useEffect( ()=>{
  
//  const todos =JSON.parse( localStorage.getItem('todos'))
//  setTodos(todos)
// },[]) 

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://todo-backend-p2ql.onrender.com/todos');
      setTodos(response.data.data.todos); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); // Call the fetchData function when the component mounts
}, []); 

  const addTodo =(text)=>{
    let id =1;
    if(todos.length > 0){
      id = todos[0].id +1

    }
    let todo ={id:id, text:text, completed:false}
    let newTodos = [todo, ...todos]
    console.log(newTodos) 
    setTodos(newTodos)
  }

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const removeTodo = (id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

 
  const clearCompletedTodos = ()=>{
    const updatedTodos = todos.filter((todo)=> !todo.completed);
    setTodos(updatedTodos);
  }
const filterTodos = (filter)=>{
  setFilter(filter);
}
const filteredTodos = todos.filter((todo) => {
  if (filter === "completed") {
    return todo.completed;
  }
  if (filter === "active") {
    return !todo.completed;
  }
  return true;
});
const activeTodoCount = todos.filter((todo) => !todo.completed).length;
const toggleTheme =()=>{
  setTheme((curr)=> (curr==="light" ? "dark":"light"))
} 
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
    <div className='App' id={theme}>
      <div className='header'>
      <h1>T O D O </h1>
      <ReactSwitch 
      onChange={toggleTheme} 
      checked={theme ==='dark'}
      className='switch'/>
      </div>
      <main>
      <TodoForm addTodo={addTodo}/>
      <li>
      {filteredTodos.map(todo =>(
        <TodoList  
        onToggle={completeTodo} 
        todo={todo}
        removeTodo={removeTodo} 
        key={todo.id}/>
      ))}
      </li>
      <div className="footer">
      <span className="first-footer">{activeTodoCount} items left</span>
      
        <span className= 'btn' onClick={() => filterTodos("all")}>All</span>
        <span className= "btn" onClick={() => filterTodos("active")}>Active</span>
        <span className= 'btn' onClick={() => filterTodos("completed")}>Completed</span>
        
        <span className="btn1"   onClick={clearCompletedTodos}>Clear Completed</span>
      </div>
      </main>
      </div>
      </ThemeContext.Provider>
  )
}
