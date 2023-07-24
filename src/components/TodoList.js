import React from 'react'
import CheckBox from './CheckBox'
import {RxCross1} from 'react-icons/rx'



export default function TodoList(props) {
  const {todo,onToggle,removeTodo}= props;
  return (
    <div className={todo.completed ? 'todo completed':'todo'}>
      <CheckBox checked={todo.completed} onClick={()=> onToggle(todo.id)}/>
      {todo.text}
      <RxCross1 className='deleteIcon'
      onClick={()=>removeTodo(todo.id)}/>
    </div>
  )
}
