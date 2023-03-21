import React, {useContext, useState, useEffect} from 'react';
import { DataContext } from '../App';
import {Calendar, Kanban, Applications, Resources, Modal} from './';
import TodoList from './TodoList';
import axios from 'axios';
import { BiNotepad, BiHelpCircle } from 'react-icons/bi';
import { GrResources, GrDocumentUpdate } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import {BsKanban} from 'react-icons/bs'
import {TfiCalendar} from 'react-icons/tfi'


function DataComponentModal(props) {
  const {currentUser} = useContext(DataContext)
  const [dropdown, setDropdown] = useState()
  const [selected, setSelected] = useState()
  const {dataName, dataAmt, open2, setOpen2, jobs, setJobs }  = props

  const renderDropdown = (e) => {
   let jobFilter = jobs.filter((j) => j.company.includes(e.target.value))
   setDropdown(jobFilter)
  }
 

  const removeCompany = () => {
    axios.put(`http://localhost:8000/user/updatejobs/${currentUser.id}/${selected._id}`, {'removeOrAdd': "remove", "type": open2[1]}).then(response => console.log(response))
  }

  const addCompany = () => {
    console.log(open2[1])
    axios.put(`http://localhost:8000/user/updatejobs/${currentUser.id}/${selected._id}`, {'removeOrAdd': "add", "type": open2[1] }).then(response => console.log(response))

  }
  
  return (  
    <>
    <div className='border-black border-[1px] p-2 w-fit h-fit scale-[2] bg-blue-300 shadow-[0_0_25px]'>
        <div className='flex justify-center'>
        <h1 className='font-semibold text-center text-[1.5rem] mb-8'>Update your {open2[1] == "Applications Sent"? "Applications": open2[1]}</h1>
        <div className="cursor-pointer text-[1rem] mt-2 ml-4 mr-[-0.6rem] w-fit h-fit"><BiHelpCircle /></div>
        <div onClick={() => setOpen2(false)} className="cursor-pointer text-[1rem] mt-2 ml-4 mr-[-0.6rem] w-fit h-fit"><AiFillCloseCircle/></div>
        </div>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-4'>

      <div>
      <h4 className='font-bold'>Search</h4>
         <input onChange={(e) =>renderDropdown(e)} className='border-black border-[1px] rounded-lg w-64 h-12 pl-2' type='text' placeholder='Search Companies'/>
        {dropdown? <div className='bg-white border-black border-2 w-fit h-fit max-h-64 overflow-y-scroll ml-1' id='dropdown-box'>
         {dropdown?.map((j) => <div onClick={() => setSelected(j)} className='flex cursor-pointer hover:bg-gray-200 items-center gap-2 border-[0.5px] w-60 border-t-gray-300 p-1 border-b-gray-300'>
         <img src={j.companyLogo} className='border-black rounded-[50%] w-10 h-10 border-2' />
            <div>
            <p className='text-sm'>{j.company}</p>
            </div>
         </div> )}
         </div>
         :null}
        </div>

            </div>
            
            {selected? 
            <>
         <h4 className='font-bold'>Company</h4>
          <div className='bg-white border-black border-2 rounded-lg w-72 h-fit p-1'>
            <div className='flex'>
            <img src={selected.companyLogo} className='border-black rounded-[50%] w-10 h-10 border-2' />
            <div>
            <p>{selected.company}</p>
            <p>Status:</p>
            </div>
            </div>
          </div>
          </>
          :null}

             <div className='flex gap-1'>
            <button onClick={(e) => removeCompany()} className='border-black border-[1px] bg-white rounded-lg h-12 w-48 font-bold' >Remove Company</button>
            <button onClick={(e) => addCompany()} className='border-black border-[1px] bg-white rounded-lg h-12 w-48 font-bold' >Add Company</button>
            </div> 
      </div>
    </div>
    </>
  )
}

function DataComponents(props) {
  const {open2, setOpen2} = useContext(DataContext)
  const {dataName, dataAmt }  = props
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/job/allJobs').then(response => {
        setJobs(response.data.allJobs.reverse())
    })
}, [])
  return (  
    <>
    <Modal component={<DataComponentModal dataName={dataName} dataAmt={dataAmt} open2={open2} setOpen2={setOpen2} jobs={jobs} setJobs={setJobs}/>}/> 
    <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[10rem] border-2 border-gray-400 shadow-xl'>
      <div className='flex justify-center'>
      <h1 className='underline text-2xl font-bold mx-auto'>{dataName}</h1>
      <div onClick={() => setOpen2([true, dataName])} className='font-bold text-2xl translate-x-[-10px] mt-2 h-6 w-6 cursor-pointer'><GrDocumentUpdate/></div>
      </div>
      <p className='font-bold text-[5rem]'>0</p>
    </div>
    
    </>
  )
}



export default function QuantDash(){ 
  const {currentUser} = useContext(DataContext)
  const [view, setView] = useState(3)
  const dataNames = ["Applications Sent", "Responses", "Interviews", "Offers"]
  return (
    <>   
    <div className='flex flex-col gap-10 h-fit absolute ml-16 mt-4'>
      <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[25rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Tamagatchi</h1>
      <p className='font-bold text-[5rem]'>level</p>
    </div>
    {dataNames.map((d) => <DataComponents dataName={d}/>)}
  </div>

  <TodoList currentUser={currentUser.id}/>

  <div className='w-screen flex-col items-center'>
  <div className='flex justify-center gap-20 text-4xl bg-dimWhite w-[60%] rounded-3xl mx-auto border-2 border-gray-400 mt-4'>
    <div className='flex flex-col items-center' onClick={()=> setView(1)}> <div><BsKanban/></div><div>Kanban</div> </div>
    <div className='flex flex-col items-center' onClick={()=> setView(2)}><div><TfiCalendar/></div><div>Calendar</div></div>
    <div className='flex flex-col items-center' onClick={()=> setView(3)}><div><GrResources/></div><div>Resources</div></div>
    <div className='flex flex-col items-center' onClick={()=> setView(4)}><div><BiNotepad/></div><div>Applications</div></div>
  </div>
  <div>{view == 1? <Kanban/>: view == 2?<Calendar/>: view == 3? <Resources/>: view == 4? <Applications/>:null }</div>
  </div>
  
  </>
  )
}