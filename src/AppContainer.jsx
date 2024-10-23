import React, { useEffect, useReducer, useState } from 'react'
import styles from './appContainer.module.css'
import Todo from './Todo'

export const ACTION = {
  ADD_TODO: 'addTodo',
  TOGGLE_TODO: 'toggleTodo',
  DELETE_TODO: 'deleteTodo',
  DELETE_ALL: 'deleteAll'
}

export default function AppContainer({className}) {

  function reducer(todos, action) {
    switch(action.type) {
      case ACTION.ADD_TODO:
        return [...todos, newTodo(action.payload.name)]
      case ACTION.TOGGLE_TODO:
        return (todos.map(todo => {
          if(todo.id === action.payload.id){
            return {...todo, completed: !todo.completed}
          }
          return todo;
        }))
      case ACTION.DELETE_TODO:
        return todos.filter(todo => todo.id !== action.payload.id)
      case ACTION.DELETE_ALL:
        return [];
        
    }
  }

  // Function to add new task
  function newTodo(name) {
    return {id: Date.now(), task: name, completed: false}
  }
  
  const [taskInput, setTaskInput] = useState('');
  const [todos, dispatch] = useReducer(reducer, [], getinitialTodo);

  // Get todo from local storge
  function getinitialTodo(){
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    return savedTodos ? savedTodos : []
  }
  

  // Function to trim input and add to local storage
  function handleSubmit() {
    if (taskInput.trim() === '') {
      setTaskInput('')
      return
    }
    dispatch({type: ACTION.ADD_TODO, payload: {name: taskInput}})
    setTaskInput('')
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  // Update local storage anytime todo is updated
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))  
  }, [todos])

  return (
    <div className={className}>

      {/* Header */}
      <h1 className={styles.header}>Todo List</h1>


      {/* Add Task Section */}
      <div className={styles.addTaskSection}>
        <input
        type="text"
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        <button onClick={handleSubmit}>Add</button>
      </div>


      {/* Display Tasks Section */}
      <div className={styles.tasksSection}>
        {todos.slice().reverse()
        .map(todo => <Todo 
        key={todo.id} 
        todo={todo} 
        className={styles.task}
        dispatch={dispatch}/>)}
      </div>


      {/* Clear List Button */}
      <button className={styles.deleteAll } onClick={() => {
        dispatch({type: ACTION.DELETE_ALL})}}>X Clear List</button>
    </div>
  )
}
