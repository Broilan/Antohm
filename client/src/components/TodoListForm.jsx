import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import '../styles/app.css'

function TodoListForm(props) {
  const [task, setTask] = useState({})
  const [importance, setImportance] = useState({})
  const [taskName, setTaskName] = useState({})
  const email = props.email

  const handleTaskName = (e) => {
    const tn = e.target.value
    setTaskName(tn)
    console.log(task)
  }

  const handleTask = (e) => {
    const t = e.target.value
    setTask(t)
    console.log(task)
  }

  const handleImportance = (e) => {
    const i = e.target.value
    setImportance(i)
    console.log(importance)
  }

  function postUserTasks() {
    const data = {taskName, task, importance}
    console.log(data)
    axios.put(`${BACK_URI}/api/user/${email}/createtask`, data)
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
              <option value='Urgent' >Urgent</option>
            </select>

            <button onClick={postUserTasks} className='border-black border-[1px] bg-white rounded-3xl font-bold' >Add Item</button>
      </div>
    </div>
  )
}

export default TodoListForm;