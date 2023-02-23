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
  const {open, setOpen, modalType, setModalType} = useContext(DataContext)
  const [userTasks, setUserTasks] = useState()
//   const BACK_URI = process.env.REACT_APP_API_SERVER_URL;

//   useEffect(() => {
//     axios.get(`${BACK_URI}/api/user/tasks/${email}`)
//     .then(response => {
//       console.log(response.data.userTasks)
//       setUserTasks(response.data.userTasks)
//     })
//   }, [])

  const postModal = () => {
    setOpen(true)
    setModalType(<TodoListForm />)
    }

  const taskModal = (added, task, id, taskName) => {
    setOpen(true)
    // setModalType(<TaskContent taskName={taskName} added={added} task={task} id={id}/>)
  }

  const kanbanModal = () => {
    setOpen(true)
    setModalType(<Kanban />)
  }
  

  return (
    <div>       
      <> <Modal component={modalType} /></>

        <div className='w-[25rem] h-[30rem] m-5 bg-white absolute right-0 rounded-3xl shadow-2xl'>
        <div className='w-[100%] flex items-center bg-white rounded-tr-3xl rounded-tl-3xl opacity-80 border-b-[1px] border-black'>
        <h1 className='ml-auto font-bold text-[2rem] text-center'>Tasks</h1>
        <div className='flex gap-3 ml-auto mr-2 ' >
        <div onClick={kanbanModal} className='text-[1.5rem] mt-5'><BsKanban/></div>
        <div onClick={postModal} className='text-[3rem]'>+</div>
        </div>
        </div> 

        <div>
          {/* {userTasks?.map(({ taskName, comments, importance, isComplete, task, added, _id }) => ( */}
              <div onClick={(e) => taskModal()} className='list-items'>

                <div className='flex h-20 cursor-pointer hover:bg-gray-300 hover:opacity-90'>
                <div className='ml-4 mt-2'> Taskname <br />Task Content </div>
                <input type="checkbox" className='ml-auto mr-3'/>
                </div> 

              </div>
               
          {/* ))} */}
        </div>
            
    </div>
    </div>
  );
}