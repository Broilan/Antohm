import React from 'react'
import axios from 'axios';


const TaskContent = (props) => {
  const{added, taskName, task, id} = props

    
    const handleDelete = () => { 
     axios.delete(`http://localhost:8000/user/delete/task/${id}`)
    }

  return (
    <div className='outline w-[30rem] shadow-2xl p-2'>          
          <div >
                <div className='font-bold text-xl'>{taskName}</div>
                <div className='text-md m-3'>{task}</div>
              </div>
          <div className="flex gap-6">
          <div className="bg-blue-400 rounded-lg p-2 m-1 text-white font-bold" >Edit</div>
          <div className="bg-blue-400 rounded-lg p-2 m-1 text-white font-bold" >Urgency</div>
          <div className="bg-blue-400 rounded-lg p-2 m-1 text-white font-bold" >Notes</div>
          <div className="bg-gray-400 text-white font-bold rounded-xl p-2 m-1" >Archive</div>
          <div className="bg-red-400 text-white font-bold rounded-xl p-2 m-1" onClick={handleDelete}>Delete</div>
          </div>
  </div>
  )
}

export default TaskContent