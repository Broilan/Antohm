import axios from 'axios';
import { useState, useRef, useContext } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../styles/app.css'
import { DataContext } from '../App';

function TodoListForm(props) {
  const {setOpen} = props
  const {currentUser} = useContext(DataContext)
  const importanceRef = useRef('Low')
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
    <div className='border-black border-[1px] p-2 w-fit h-fit scale-[2] bg-blue-300 shadow-[0_0_25px]'>
        <div className='flex justify-center'>
        <h1 className='font-semibold text-center text-[1.5rem] mb-8'>Add an item to your todo list!</h1>
        <div onClick={() => setOpen(false)} className="cursor-pointer text-[1rem] mt-2 ml-4 mr-[-0.6rem] w-fit h-fit  "><AiFillCloseCircle/></div>
        </div>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-4'>
        <div>
        
      <h4 className='font-bold'>Task name</h4>
         <input className='border-black border-[1px] rounded-lg w-64 h-12 pl-2' onChange={(e) => handleTaskName(e)} type='text' placeholder='Task Name'/>
        </div>
        <div>
          <h4 className='font-bold'>Urgency</h4>
            <select defaultValue={'Low'} className='border-black border-[1px] rounded-lg h-12 w-26 pl-1' onChange={(e) => handleImportance(e)} type='text' placeholder='Level of importance'>
              <option value='Low' >Low</option>
              <option value='Medium' >Medium</option>
              <option value='High' >High</option>
              <option value='Extreme' >Extreme</option>
            </select>
        </div>
            </div>
         <h4 className='font-bold'>Task</h4>
          <input className='border-black border-[1px] rounded-lg w-96 h-20' onChange={(e) => handleTask(e)} type='text'/>
            <button onClick={postUserTasks} className='border-black border-[1px] bg-white rounded-lg h-12 w-96 font-bold' >Add Item</button>
      </div>
    </div>
  )
}

export default TodoListForm;