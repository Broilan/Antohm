import React from 'react'
import axios from 'axios';


const TaskContent = (props) => {
  const{added, taskName, task, id, importance} = props

    
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
          <div className="bg-blue-400 rounded-lg p-2 m-1 text-white font-bold cursor-pointer" >Edit</div>
          
                {importance == "Low"?<div className=" text-white bg-gray-400 rounded-lg p-2 m-1 font-bold">{importance}</div>:
                importance == 'Medium'?<div className=" text-white bg-blue-400 rounded-lg p-2 m-1 font-bold">{importance}</div>:
                importance == "High"?<div className=" text-white bg-red-500 rounded-lg p-2 m-1 font-bold">{importance}</div>:
                importance == "Extreme"?<div className=" text-white bg-red-800 rounded-lg p-2 m-1 font-bold">{importance}</div>:
                null}

          <div className="bg-blue-400 rounded-lg p-2 m-1 text-white font-bold cursor-pointer" >Notes</div>
          <div className="bg-gray-400 text-white font-bold rounded-xl p-2 m-1 cursor-pointer" >Archive</div>
          <div className="bg-red-400 text-white font-bold rounded-xl p-2 m-1 cursor-pointer" onClick={handleDelete}>Delete</div>
          </div>
  </div>
  )
}

export default TaskContent