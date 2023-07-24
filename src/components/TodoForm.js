import React, { useState } from "react";
import { GiCircle } from "react-icons/gi";

export default function TodoForm(props) {
  const [input,setInput]= useState("")
  const handleSubmit =(e)=>{
    e.preventDefault()
    props.addTodo(input)
    setInput("")
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <GiCircle className="circle" />
        <input 
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        type="text" 
        placeholder="Create new todo..."/>
      </form>
    </div>
  );
}
