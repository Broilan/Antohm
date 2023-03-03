import axios from 'axios';
import { useState, useRef, useContext } from 'react';
import '../styles/app.css'
import { DataContext } from '../App';

function TodoListForm() {
  const {currentUser} = useContext(DataContext)
  const importanceRef = useRef()
  const taskRef = useRef()
  const taskNameRef = useRef()
  
  const handleTaskName = (e) => {
    const tn = e.target.value
    taskNameRef.current = tn
    
  }

  const handleTask = (e) => {
    const t = e.target.value
    taskRef.current = t
  }

  const handleImportance = (e) => {
    const i = e.target.value
    importanceRef.current = i
    console.log(importanceRef.current)
  }

  function postUserTasks() {
    const data = {"taskName":taskNameRef.current, "task": taskRef.current, "importance": importanceRef.current}
    console.log(data)
    axios.put(`http://localhost:8000/user/${currentUser.id}/createtask`, data)
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }
  
  
  return(
    <div className='border-black border-[1px] p-2 w-[20rem] h-[30rem] bg-blue-400 shadow-[0_0_12px]'>
        <h1 className='font-semibold text-center text-[1.5rem] mb-8'>Add an item to your todo list!</h1>
      <div className='flex flex-col gap-3'>
      <h4 className='font-bold'>Task name</h4>
         <input className='border-black border-[1px] rounded-3xl w-fit pl-2' onChange={(e) => handleTaskName(e)} type='text' placeholder='Task Name'></input>
         <h4 className='font-bold'>Task</h4>
          <input className='border-black border-[1px] rounded-3xl h-20' onChange={(e) => handleTask(e)} type='text'></input>
          <h4 className='font-bold'>Urgency</h4>

            <select className='border-black border-[1px] rounded-3xl w-fit pl-1' onChange={(e) => handleImportance(e)} type='text' placeholder='Level of importance'>
              <option value='Low' selected>Low</option>
              <option value='Medium' >Medium</option>
              <option value='High' >High</option>
              <option value='Extreme' >Extreme</option>
            </select>

            <button onClick={postUserTasks} className='border-black border-[1px] bg-white rounded-3xl font-bold' >Add Item</button>
      </div>
    </div>
  )
}

export default TodoListForm;