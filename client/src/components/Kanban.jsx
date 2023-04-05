import React, { useContext, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { DataContext } from '../App'
import Draggable from "react-draggable";
import { FiEdit } from 'react-icons/fi';
import { BsFillTrashFill, BsArchive} from 'react-icons/bs';
import { BiNotepad } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';

export const Kanban = () => {
  const {currentUser} = useContext(DataContext)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [userTasks, setUserTasks] = useState()
  const [editting, setEditting] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [addNoteModal, setAddNoteModal] = useState(false)
  const [makeSureModal, setMakeSureModal] = useState(false)
  const originalPosition = useRef()
  const itemRef = useRef()
  const container1Ref = useRef()
  const container2Ref = useRef()
  const container3Ref = useRef()

  useEffect(() => {
    axios.get(`https://thrive-server.herokuapp.com/user/tasks/${currentUser.id}`).then(response => setUserTasks(response.data.userTasks.tasks)).catch(err => {throw err}) 

  }, [success])

  function dragStart(){
    if(originalPosition.current){
      return
    } else {
      originalPosition.current = itemRef.current.getBoundingClientRect()
    }
  }

  function drag(task, e, data) {
    let itemX = e.clientX
    let itemY = e.clientY
    let container1Rect = container1Ref.current.getBoundingClientRect()
    let container2Rect = container2Ref.current.getBoundingClientRect()
    let container3Rect = container3Ref.current.getBoundingClientRect()
    if(itemX >= container2Rect.left && itemX <= container2Rect.right && itemY >= container2Rect.top && itemY <= container2Rect.bottom && Math.abs(data.lastX) >= 225) {
      //container 2
      axios.put(`https://thrive-server.herokuapp.com/user/task/status/${task._id}`, {"status": 'In Progress'}).then(() => {
        setSuccess(true)
        setTaskModal(false)
      }).catch(() => setError(true))
      setTaskModal(false)
    } else if(itemX >= container3Rect.left && itemX <= container3Rect.right && itemY >= container3Rect.top && itemY <= container3Rect.bottom && Math.abs(data.lastX) >= 225) {
      //container 3
      axios.put(`https://thrive-server.herokuapp.com/user/task/status/${task._id}`, {"status": 'Finished'}).then(() => {
        setSuccess(true)
        setTaskModal(false)
      }).catch(() => setError(true))
      setTaskModal(false)
    } else if(itemX >= container1Rect.left && itemX <= container1Rect.right && itemY >= container1Rect.top && itemY <= container1Rect.bottom && Math.abs(data.lastX) >= 225) {
      //container 1
      axios.put(`https://thrive-server.herokuapp.com/user/task/status/${task._id}`, {"status": 'To Do'}).then(() => {
        setSuccess(true)
        setTaskModal(false)
      }).catch(() => setError(true))
      
    } else{
      itemRef.current.style = `translate(${originalPosition.current.x}px, ${originalPosition.current.y}px)`
    }
  }

  return (
    <>
    <EdittingModal editting={editting} setEditting={setEditting} setTaskModal={setTaskModal} setSuccess={setSuccess} setError={setError}/>
    <TaskItemModal setTaskModal={setTaskModal}  setEditting={setEditting} success={success} userTasks={userTasks} taskModal={taskModal} makeSureModal={makeSureModal} setAddNoteModal={setAddNoteModal} setMakeSureModal={setMakeSureModal} setSuccess={setSuccess} setError={setError}/>
    <MakeSure makeSureModal={makeSureModal} setMakeSureModal={setMakeSureModal} setTaskModal={setTaskModal} setSuccess={setSuccess} setError={setError}/>
    <SuccessModal success={success} setSuccess={setSuccess} />
    <ErrorModal error={error} setError={setError} />
    <AddNote addNoteModal={addNoteModal} setTaskModal={setTaskModal} setAddNoteModal={setAddNoteModal} setSuccess={setSuccess} />
    <div className='mx-auto bg-dimWhite w-[60%] h-[80vh] rounded-xl border-gray-400 border-2 shadow-2xl'>
      <h1 className='font-bold text-center pt-4 text-3xl'>Welcome To your Kanban</h1>

      <div className='flex text-4xl mr-4 gap-4 mt-[-2rem] mb-6'>
      <div onClick={() => setAddNoteModal(true)} className='text-[5rem] ml-auto'> + </div>
      </div>

      <div className='flex h-[75%] gap-10 mt-10 items-center justify-center'>
        <div ref={container1Ref} className='h-[110%] w-[30%] rounded-xl bg-white shadow-2xl border-2 border-gray-400'>
            <h1 className='font-bold underline text-3xl text-center'>Todo</h1>

          {userTasks?.map(task => 
            <>
          {task.status == 'To Do' ?
          <Draggable onStart={(e,data) => dragStart(task, e, data)} onStop={(e,data) => drag(task, e, data)}>
          <div onClick={() => setTaskModal(task)} ref={itemRef} className='mt-3 cursor-pointer h-20 border-[1px] border-gray-500 hover:bg-gray-300'>
          <div  className='pl-4 font-bold text-xl' >{task.taskName}</div>
                <div className='flex'>
                <div className='pl-4' >{task.task}</div>
                {task.importance == "Low"?<div className="text-sm text-white bg-gray-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == 'Medium'?<div className="text-sm text-white bg-blue-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "High"?<div className="text-sm text-white bg-red-500 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "Extreme"?<div className="text-sm text-white bg-red-800 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                null}
                </div>
              </div>
          </Draggable>
              : null}
            </>
          )} 
        </div>

        <div ref={container2Ref} className='h-[110%] w-[30%] rounded-xl bg-white shadow-2xl border-2 border-gray-400 container'>
            <h1 className='font-bold underline text-3xl text-center'>In progress</h1>

          {userTasks?.map(task => 
            <>
            {task.status == 'In Progress' ?
          <Draggable onStart={(e,data) => dragStart(task, e, data)}  onStop={(e,data) => drag(task, e, data)}>
          <div onClick={() => setTaskModal(task)} ref={itemRef} className='listitem mt-3 cursor-pointer h-20 border-[1px] border-gray-500 hover:bg-gray-300' >
                <div className='pl-4 font-bold text-xl'>{task.taskName}</div>
                <div className='flex'>
                <div className='pl-4'>{task.task}</div>
                {task.importance == "Low"?<div className="text-sm text-white bg-gray-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == 'Medium'?<div className="text-sm text-white bg-blue-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "High"?<div className="text-sm text-white bg-red-500 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "Extreme"?<div className="text-sm text-white bg-red-800 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                null}
                </div>
              </div>
                 </Draggable>
              : null}
            </>
          )} 
        </div>

        <div ref={container3Ref} className='h-[110%] w-[30%] rounded-xl bg-white shadow-2xl border-2 border-gray-400 container'>
            <h1 className='font-bold underline text-3xl text-center'>Finished</h1>

          {userTasks?.map(task => 
            <>
          {task.status == 'Finished' ?
          <Draggable onStart={(e,data) => dragStart(task, e, data)}  onStop={(e,data) => drag(task, e, data)}>
          <div onClick={() => setTaskModal(task)} ref={itemRef} className='listitem mt-3 cursor-pointer h-20 border-[1px] border-gray-500 hover:bg-gray-300'>
          <div className='pl-4 font-bold text-xl'>{task.taskName}</div>
                <div className='flex'>
                <div className='pl-4'>{task.task}</div>
                {task.importance == "Low"?<div className="text-sm text-white bg-gray-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == 'Medium'?<div className="text-sm text-white bg-blue-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "High"?<div className="text-sm text-white bg-red-500 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "Extreme"?<div className="text-sm text-white bg-red-800 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                null}
                </div>
              </div>
              </Draggable>
              : null}
            </>
          )} 
        </div>
        </div>

    </div>
    </>
  )
}

const TaskItemModal = ({taskModal, setTaskModal, setAddNoteModal, setMakeSureModal, setEditting, setSuccess, setError}) => {
  const {currentUser} = useContext(DataContext)

  function Archive() {
    axios.put(`https://thrive-server.herokuapp.com/user/archive/${currentUser.id}/${taskModal._id}`, {
      "item": "task"
    }).then(()=> setSuccess(true)).catch(()=> setError(true))
  }

  return (
    <>
    {taskModal?
  <div className='w-screen flex items-center justify-center h-screen absolute z-[100] top-0 bg-transBlack'>
  <div className='flex-col justify-center border-black border-2 items-center z-[100]  bg-white w-[30%] rounded-xl shadow-2xl h-fit'>
    <div className='text-2xl flex justify-center font-bold border-b-black z-[100]  border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>{taskModal.taskName}</h1>
    <div onClick={()=> setTaskModal(false)} className='ml-auto mr-2 z-[100]  cursor-pointer'>x</div>
    </div>

    <h1 className='font-bold text-2xl pl-2 mt-2 z-[100] '>Task:</h1>
    <div className='bg-white w-[90%] p-2 mt-4 h-fit mx-auto z-[100]  border-black border-2 cursor-pointer hover:bg-gray-200'>

        <div className='flex z-[100] '>
        <p className='text-2xl z-[100]  font-bold'>{taskModal.taskName}</p>
        <div  className='text-xl z-[100]  ml-auto font-bold'><FiEdit /></div>
        </div>
        <p className='text-xl z-[100]  font-bold'>{taskModal.task}</p>
        
    </div>

    <h1 className='font-bold text-2xl z-[100]  pl-2 mt-2'>Subtasks:</h1>
    <div className='bg-white flex z-[100] flex-col w-[90%] mt-4 h-52 mx-auto border-black border-2 overflow-y-scroll'>
      {taskModal.notes?.map((note) =>
            <div className='border-black border-2 h-fit p-2 hover:bg-gray-200 cursor-pointer'>
        <div className='flex gap-3'>
          
        <div onClick={() => setEditting(note._id)} className='ml-auto'><FiEdit /></div>
        <div onClick={() => setMakeSureModal({"noteId": note._id, "taskId": taskModal._id})}className='mr-2'><BsFillTrashFill /></div>
        </div>
        <p>{note.content}</p>
      </div>
      )}

    </div>
    <div className='flex justify-center gap-4 mb-1'>
    <button onClick={() => setMakeSureModal(taskModal._id)} className='font-bold text-black mt-2  border-red-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Delete task</button>
    <button onClick={Archive} className='font-bold text-black mt-2  border-red-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Archive Task</button>
    <button onClick={()=> setAddNoteModal(taskModal)} className='font-bold text-black mt-2  border-blue-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Add a note</button>
    </div>
  </div>
  </div>
    : null}
    </>
  )
}

const AddNote = ({addNoteModal, setAddNoteModal, setTaskModal, setSuccess, setError}) => {
  const {currentUser} = useContext(DataContext)
  const importanceRef = useRef()
  const taskNameRef = useRef()
  const noteRef = useRef()
  const handleNewNote = () => {
    axios.put(`https://thrive-server.herokuapp.com/user/tasknote/${currentUser.id}/${addNoteModal._id}`, {
      "note": noteRef.current.value
    }).then((res)=> {
      setTaskModal(res.data.updatedTask)
      setSuccess(true)
      setAddNoteModal(false)    
    }).catch(()=> setError(true))
  }

  const handleNewTask = () => {
    axios.put(`https://thrive-server.herokuapp.com/user/${currentUser.id}/createtask`, {
      "taskName":taskNameRef.current.value, 
      "task": noteRef.current.value, 
      "importance": importanceRef.current.value
    }).then(()=> {
      setSuccess(true)
      setAddNoteModal(false)    
    }).catch(()=> setError(true))
  }
  function check() {
    if (addNoteModal == true) {
      return handleNewTask()
    } else {
      return handleNewNote()
    }
  }  

  return (
    <>
    {addNoteModal?
      <>
      <div className='w-screen flex items-center justify-center h-screen absolute z-[101] top-0 bg-transBlack'>
      <div className="flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-fit py-2">
      <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>Add a note</h1>
      <div onClick={()=> setAddNoteModal(false)}  className='ml-auto mr-2 cursor-pointer'>x</div></div>
      <div className='flex flex-col items-center gap-2 mt-4'>
      {addNoteModal == true? 
      <div className='flex gap-12'>
      <div>
      <h1 className='font-bold text-2xl'>Task Name</h1>
      <input type="text" ref={taskNameRef} className='w-32 border-black border-2 rounded-lg h-10' />
      </div>
      <div>
      <h1 className='font-bold text-xl '>Urgency</h1>
      <select ref={importanceRef} className='w-fit h-fit rounded-lg border-black border-2 '>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      </div>
      </div>
      : null}
      <h1 className='font-bold text-2xl'>Note:</h1>
      <input type="text" ref={noteRef} className='w-[70%] border-black border-2 rounded-lg h-48' />
      </div>
      <div className='flex font-bold text-2xl justify-center mt-5 mb-2'>
        <button onClick={()=> setAddNoteModal(false)} className='mx-auto bg-red-300 p-4 rounded-xl hover:bg-red-400'>Discard</button>
        <button onClick={check} className='mx-auto bg-blue-300 hover:bg-blue-400 rounded-xl p-4'>Save Note</button>
      </div>
      </div>
      </div>
      </>
      :null}
      </>
  )
} 

const MakeSure = ({setMakeSureModal, setTaskModal, makeSureModal, setSuccess, setError}) => {    
  const {currentUser} = useContext(DataContext)
  function deleteNote(){
     axios.delete(`https://thrive-server.herokuapp.com/user/deletenote/${currentUser._id}/${makeSureModal.taskId}/${makeSureModal.noteId}`).then(()=> {
      setSuccess(true)
      setMakeSureModal(false)
    }).catch(()=> setError(true))
    }

  function deleteTask(){
    axios.delete(`https://thrive-server.herokuapp.com/user/deletetask/${currentUser._id}/${makeSureModal}`).then(()=> {
      setSuccess(true)
      setMakeSureModal(false)
      setTaskModal(false)
    }).catch(()=> setError(true))
  }

  const check = () => {
    if(makeSureModal.noteId){
      deleteNote()
    }else{
      deleteTask()
    }
  }

  return (

    <>
    {makeSureModal?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Are you sure?</h1>
    <div onClick={() => setMakeSureModal(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>If you delete this note, you can't recover it.</p>
    <div className='flex justify-evenly'>
    <button onClick={() => setMakeSureModal(false)} className='bg-blue-300 p-1 font-bold rounded-lg'>Nevermind</button>
    <button onClick={check} className='bg-red-400 p-1 font-bold rounded-lg'>Delete</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}

//success modal
const SuccessModal = ({setSuccess, success}) => {

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }, [success])

  return (
    <>
    {success?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[200]'>
    <div className='flex-col text-center mb-52 bg-green-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Success!</h1>
    <div onClick={() => setSuccess(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>Your changes have been saved.</p>
    </div>
    </div>
    :null}
    </>
  )
}

//error modal
const ErrorModal = ({setError, error}) => {
  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 3000)
  }, [error])

  return (
    <>
    {error?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[200]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Error!</h1>
    <div onClick={() => setError(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>Something went wrong.</p>
    </div>
    </div>
    :null}
    </>
  )
}

const EdittingModal = ({setEditting, editting, setSuccess, setError}) => {
  const {currentUser} = useContext(DataContext)
  const newNoteRef = useRef()
  const handleUpdate = () => {
    axios.put(`https://thrive-server.herokuapp.com/user/date/${currentUser.id}/${editting}`, {
      "content": newNoteRef.current.value
    }).then(() => {
      setEditting(false)
      setSuccess(true)
    }).catch(() => setError(true))
  }

  return (
    <>
    {editting?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[200]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex flex-col justify-center'>
    
    <div>
    <label htmlFor='note' className='font-bold text-xl '>Edit note</label><br />
    <input id='note' type="text" ref={newNoteRef} />
    </div>

    </div>
    <div className='flex justify-evenly'>
    <button onClick={() => setEditting(false)} className='bg-red-400 p-1 font-bold rounded-lg'>Discard Changes</button>
    <button onClick={handleUpdate} className='bg-blue-300 p-1 font-bold rounded-lg'>Update</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}

export function TodoList({setTaskOrDate}){ 
  const {currentUser} = useContext(DataContext)
  const [userTasks, setUserTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])
  const [editting, setEditting] = useState(false)
  const [makeSureModal, setMakeSureModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [addNoteModal, setAddNoteModal] = useState(false)
  const [currentView, setCurrentView] = useState([])


  useEffect(() => {
    axios.get(`https://thrive-server.herokuapp.com/user/tasks/${currentUser.id}`)
    .then(response => {
      setCurrentView(response.data.userTasks.tasks)
      setUserTasks(response.data.userTasks.tasks)
      setArchivedTasks(response.data.userTasks.archivedTasks)
    }).catch(err => console.log(err))
  }, [success])
  

  return (
    <>       
    <EdittingModal setEditting={setEditting} editting={editting} setSuccess={setSuccess} setError={setError}/>
      <AddNote addNoteModal={addNoteModal} setAddNoteModal={setAddNoteModal} setError={setError} setSuccess={setSuccess} />
      <TaskItemModal setTaskModal={setTaskModal} taskModal={taskModal} makeSureModal={makeSureModal} setAddNoteModal={setAddNoteModal} setMakeSureModal={setMakeSureModal} setSuccess={setSuccess} setError={setError}/>
      <MakeSure makeSureModal={makeSureModal} setMakeSureModal={setMakeSureModal} setTaskModal={setTaskModal} setSuccess={setSuccess} setError={setError}/>
      <SuccessModal success={success} setSuccess={setSuccess} />
      <ErrorModal error={error} setError={setError} />
        <div className=' w-[22rem] h-[30rem] m-5 mt-[15rem] bg-white absolute right-0 rounded-3xl shadow-2xl overflow-y-scroll scrollbar-remove'>
        
        <div className='flex gap-3 mx-auto items-center justify-center' >
        <div className= 'font-bold mt-4 text-[1.5rem] fixed '>{ currentView == archivedTasks? 'Archived Tasks' : "Current Tasks"}</div>
        <div onClick={() => {currentView == userTasks? setCurrentView(archivedTasks) : setCurrentView(userTasks) }} className='text-[1.5rem] ml-2 cursor-pointer'>{ currentView == archivedTasks?<BiNotepad /> : <BsArchive />}</div>
        <div className='ml-auto text-[1.5rem] cursor-pointer' onClick={() => setTaskOrDate(2)}><AiOutlineCalendar /></div>
        <div onClick={() => setAddNoteModal(true)} className='text-[2.3rem] cursor-pointer'>+</div>
        </div>

        <div>
          {currentView?.map((task) => (
              <div onClick={(e) => setTaskModal(task)}>

                <div className='flex h-16 cursor-pointer hover:bg-gray-300 hover:opacity-90 border-b-gray-300 border-[1px]'>

                 <div className='ml-2 truncate'>
                <div className='font-bold text-md'>{task.taskName}</div>
                <div className='truncate'>{task.task}</div> 
                </div>
                
                {task.importance == "Low"?<div className="text-xs text-white bg-gray-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == 'Medium'?<div className="text-xs text-white bg-blue-400 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "High"?<div className="text-xs text-white bg-red-500 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                task.importance == "Extreme"?<div className="text-xs text-white bg-red-800 rounded-lg w-fit p-1 ml-auto mr-1 my-auto font-semibold h-fit">{task.importance}</div>:
                null}
                <div className="text-xs text-white bg-gray-400 rounded-lg w-fit p-1 mr-1 my-auto font-semibold h-fit">{task.status}</div>
                  </div> 

              </div>
               
           ))} 
        </div>
            
    </div>
    </>
  );
}