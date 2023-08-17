import Form from './components/Form'
import TodoList from './components/TodoList'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run once
  useEffect(() => {
    getLocalTodos();
  }, [])
  
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos, status])
 const filterHandler = () => {
  switch(status) {
    case 'completed':
      setFilteredTodos(todos.filter(todo => todo.completed === true))
      break;
    case 'uncompleted':
      setFilteredTodos(todos.filter(todo => todo.completed === false))
      break;
    default:
      setFilteredTodos(todos);
      break;
  }
 }

 const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
 

 const getLocalTodos = () => {
  if(localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', JSON.stringify([]));
  } else {
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoLocal)
  }
 }
  return (
    <div>
      <header>
        <h1>P's Todo List</h1>
      </header>
      <Form
      setInputText={setInputText}
      todos={todos}
      setTodos={setTodos}
      inputText={inputText}
      setStatus={setStatus}
       />
      <TodoList
      todos={todos}
      setTodos={setTodos}
      filteredTodos={filteredTodos} />
    </div>
  )
}

export default App
