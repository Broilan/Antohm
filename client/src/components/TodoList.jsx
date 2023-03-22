import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import TodoListForm from './TodoListForm';
import TaskContent from './TaskContent';
import { AiOutlineCalendar } from 'react-icons/ai';
import { DataContext } from '../App';



export default function TodoList({setTaskOrDate}){ 
  const {open, setOpen, modalType, setModalType, currentUser} = useContext(DataContext)
  const [userTasks, setUserTasks] = useState()


  useEffect(() => {
    axios.get(`http://localhost:8000/user/tasks/${currentUser.id}`)
    .then(response => {
      setUserTasks(response.data.userTasks)
    }).catch(err => console.log(err))
  }, [])

  const postModal = () => {
    setOpen(true)
    setModalType(<TodoListForm setOpen={setOpen} />)
    }

  const taskModal = (added, task, id, taskName, importance, comments,  isComplete) => {
    setOpen(true)
    setModalType(<TaskContent taskName={taskName}  added={added} task={task} id={id} importance={importance} comments={comments} isComplete={isComplete}/>)
  }
  

  return (
    <div>       
      <> <Modal component={modalType}/></>

        <div className=' w-[30rem] h-[40rem] m-5 mt-[15rem] bg-white absolute right-0 rounded-3xl shadow-2xl overflow-y-scroll' id="todolist">
        
        <div className='flex gap-3 mx-auto items-center justify-center' >
        <div className= 'font-bold mt-4 text-[2rem] fixed '>Tasks</div>
        <div className='ml-auto text-[2rem] cursor-pointer' onClick={() => setTaskOrDate(2)}><AiOutlineCalendar /></div>
        <div onClick={() => postModal()} className='text-[3rem] cursor-pointer'>+</div>
        </div>

        <div>
          {userTasks?.map(({ taskName, comments, importance, isComplete, task, added, _id }) => (
              <div  onClick={(e) => taskModal(added, task, _id, taskName, importance, comments, isComplete )}>

                <div className='flex h-20 cursor-pointer hover:bg-gray-300 hover:opacity-90 border-b-gray-300 border-[1px]'>

                 <div className='ml-2 truncate'>
                <div className='font-bold text-lg'>{taskName}</div>
                <div className='truncate'>{task}</div> 
                </div>
                
                {importance == "Low"?<div className="text-sm text-white bg-gray-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{importance}</div>:
                importance == 'Medium'?<div className="text-sm text-white bg-blue-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{importance}</div>:
                importance == "High"?<div className="text-sm text-white bg-red-500 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{importance}</div>:
                importance == "Extreme"?<div className="text-sm text-white bg-red-800 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{importance}</div>:
                null}

                  </div> 

              </div>
               
           ))} 
        </div>
            
    </div>
    </div>
  );
}