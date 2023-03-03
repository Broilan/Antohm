import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { BsKanban } from 'react-icons/bs';
import TodoListForm from './TodoListForm';
import TaskContent from './TaskContent';
import { Kanban } from '../components';
import { DataContext } from '../App';



export default function TodoList(){ 
  const {open, setOpen, modalType, setModalType, currentUser} = useContext(DataContext)
  const [userTasks, setUserTasks] = useState()


  useEffect(() => {
    axios.get(`http://localhost:8000/user/tasks/${currentUser.id}`)
    .then(response => {
      console.log(response.data)
      setUserTasks(response.data.userTasks)
    })
  }, [])

  const postModal = () => {
    setOpen(true)
    setModalType(<TodoListForm />)
    }

  const taskModal = (added, task, id, taskName, importance, comments,  isComplete) => {
    setOpen(true)
    setModalType(<TaskContent taskName={taskName} added={added} task={task} id={id} importance={importance} comments={comments} isComplete={isComplete}/>)
  }
  

  return (
    <div>       
      <> <Modal component={modalType} /></>

        <div className=' w-[25rem] h-[30rem] m-5 bg-white absolute right-0 rounded-3xl shadow-2xl overflow-y-scroll' id="todolist">
        <div className=' w-[100%] flex items-center bg-white rounded-tr-3xl rounded-tl-3xl opacity-80 border-b-[1px] border-black'>
        <h1 className='ml-auto font-bold text-[2rem] text-center'>Tasks</h1>
        <div className='flex gap-3 ml-auto mr-2 ' >
        <div onClick={postModal} className='text-[3rem]'>+</div>
        </div>
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