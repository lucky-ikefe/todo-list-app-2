import React from 'react'
import { ACTION } from './AppContainer'
import { FaRegCircle } from "react-icons/fa6";
import { FaRegCheckCircle, FaTrash } from "react-icons/fa";
import { LuXCircle } from "react-icons/lu";


export default function Todo( {todo, dispatch, className} ) {
  return (
    <div className={className}>
      <button onClick={e=> {dispatch({type: ACTION.TOGGLE_TODO, payload:{id: todo.id}})}}>
        <div>{todo.completed ? <FaRegCheckCircle  style={{color: todo.completed ? 'grey' : 'white'}}/> : <FaRegCircle />}</div> <div style={{color: todo.completed ? 'grey' : 'white', textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.task}</div>
      </button>
      <button onClick={e=> {dispatch({type: ACTION.DELETE_TODO, payload:{id: todo.id}})}}>
        <LuXCircle />
      </button>
    </div>
  )
}
