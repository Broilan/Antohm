import React, {useContext, useState, useEffect, useRef} from 'react';
import { DataContext } from '../App';
import {Applications, Resources} from './';
import {Kanban, TodoList} from './Kanban';
import {Calendar, SavedDates} from './Calendar'
import axios from 'axios';
import { BiNotepad, BiHelpCircle } from 'react-icons/bi';
import { GrResources, GrDocumentUpdate } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import {BsKanban} from 'react-icons/bs'
import {TfiCalendar} from 'react-icons/tfi'


function Popup({open3, setOpen3}){

    setTimeout(() => {
      setOpen3(false)
    }, 4000);
  return(
    <>

    {open3? 
    <div className='w-screen h-screen flex-col items-center justify-center absolute z-[100]'>
    <div className= {`${open3[1] == 'error'? "bg-red-400" : "bg-green-400"} animate-shrink p-1 animation-delay-6000 delay-100 opacity-80 w-[30rem] h-[10rem] rounded-xl flex-col items-center justify-center`}>
      {open3[1] == "added"? 
      <p className='text-black font-bold text-3xl text-center'>Added Succesfully! <br /> Check the applications tab to view your updates. </p>
      :open3[1] == 'removed'? 
      <p className='text-black font-bold text-3xl text-center'>Removed Succesfully! <br /> Check the applications tab to view your updates. </p>
      :open3[1] == "error"?
      <p className='text-black font-bold text-3xl text-center'>Error: Please try again.</p>
      :null
     }
     
     <button onClick={()=> setOpen3(false)} className='bg-white mt-2 font-bold mx-auto flex items-center justify-center rounded-lg w-20 h-8 hover:underline'>Close</button>
    </div>
    </div>
    :null}
    </>
  )
}

function DataComponentModal(props) {
  const {currentUser} = useContext(DataContext)
  const [open3, setOpen3] = useState(false)
  const [dropdown, setDropdown] = useState()
  const [selected, setSelected] = useState()
  const [selectedSort, setSelectedSort] = useState()
  const {open2, setOpen2, jobs, usersData, setUsersData} = props

  const renderDropdown = (e) => {
    if(selectedSort == 'userjobs'){
        switch(open2[1]){
          case 'Applications Sent':
           let appsFilter = usersData.applications.filter((j) => j.company.includes(e.target.value))
           setDropdown(appsFilter)
          break;
            case 'Offers':
            let offersFilter = usersData.offers.filter((j) => j.company.includes(e.target.value))
            setDropdown(offersFilter)
          break;
            case 'Responses':
            let responsesFilter = usersData.responses.filter((j) => j.company.includes(e.target.value))  
            setDropdown(responsesFilter)
          break;
            case 'Interviews':
            let interviewsFilter = usersData.interviews.filter((j) => j.company.includes(e.target.value))
            setDropdown(interviewsFilter)
          break;

        }
    } else{
         let jobFilter = jobs.filter((j) => j.company.includes(e.target.value))
          setDropdown(jobFilter)
    }

  }

  const removeCompany = () => {
    axios.put(`http://localhost:8000/user/updatejobs/${currentUser.id}/${selected._id}`, {
      'removeOrAdd': "remove", "type": open2[1]})
      .then(() => {
      axios.get(`http://localhost:8000/user/${currentUser.id}`)
      .then(response => setUsersData(response.data.foundUser), setOpen3([true, 'removed']))
      .catch(() =>setOpen3[true, 'error'])
    }).catch(() => setOpen3[true, 'error'])
  }

  const addCompany = () => {
    axios.put(`http://localhost:8000/user/updatejobs/${currentUser.id}/${selected._id}`, {
      'removeOrAdd': "add", "type": open2[1]})
      .then(() => {
      axios.get(`http://localhost:8000/user/${currentUser.id}`)
      .then(response => setUsersData(response.data.foundUser), setOpen3([true, 'added']))
      .catch(() => setOpen3[true, 'error'])
    }).catch(() => setOpen3[true, 'error'])
  }
  
  return (  
    <>
    {open2?
    <>
    <Popup open3={open3} setOpen3={setOpen3}/>
    <div className='w-screen h-screen bg-transBlack z-[100] absolute top-[-4.2rem] left-[-4rem] flex items-center justify-center'>
    <div className='border-black border-[1px] p-2 w-fit h-fit scale-[2] bg-white shadow-2xl'>
        <div className='flex justify-center'>
        <h1 className='font-semibold text-center text-[1.5rem] mb-8'>Update your {open2[1] == "Applications Sent"? "Applications": open2[1]}</h1>
        <div className="cursor-pointer text-[1rem] mt-2 ml-4 mr-[-0.6rem] w-fit h-fit"><BiHelpCircle /></div>
        <div onClick={() => setOpen2(false)} className="cursor-pointer text-[1rem] mt-2 ml-4 mr-[-0.6rem] w-fit h-fit"><AiFillCloseCircle/></div>
        </div>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-4'>
      <div>
      <h4 className='font-bold'>Search</h4>
         <input  onChange={(e) =>renderDropdown(e)} className='border-black border-[1px] rounded-lg w-64 h-12 pl-2' type='text' placeholder='Search Companies'/>
         <select onChange={(e) => {setSelectedSort(e.target.value)}} className='bg-transparent border-black border-2 ml-1'>
        <option value="All">All</option>
        <option value="userjobs">Your Jobs</option>
      </select>
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
    </div>
    </>
    :null}
    </>
  )
}

function DataComponents(props) {
  const {open2, setOpen2} = useContext(DataContext)
  const {dataName, usersData, setUsersData}  = props
  const quantityRef = useRef(0)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/job/allJobs').then(response => {
        setJobs(response.data.allJobs.reverse())
    })
            switch (dataName) {
          case 'Applications Sent':
            console.log('bruh', usersData?.applications.length)
          quantityRef.current = usersData?.applications.length
          break;
          case 'Responses':
          quantityRef.current = usersData?.responses.length
          break;
          case 'Offers':
          quantityRef.current = usersData?.offers.length
          break;
          case 'Interviews':
          quantityRef.current = usersData?.interviews.length
          break;
        }
}, [usersData])
  return (  
    <>
    <DataComponentModal open2={open2} setOpen2={setOpen2} jobs={jobs} usersData={usersData} setUsersData={setUsersData}/> 
    <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[10rem] border-2 border-gray-400 shadow-xl'>
      <div className='flex justify-center'>
      <h1 className='underline text-2xl font-bold mx-auto'>{dataName}</h1>
      <div onClick={() => setOpen2([true, dataName])} className='font-bold text-2xl translate-x-[-10px] mt-2 h-6 w-6 cursor-pointer'><GrDocumentUpdate/></div>
      </div>
      <p className='font-bold text-[5rem]'>{quantityRef.current}</p>
    </div>
    
    </>
  )
}



export default function QuantDash(){ 
  const {currentUser} = useContext(DataContext)
  const [view, setView] = useState(4)
  const [taskOrDate, setTaskOrDate] = useState(1)
  const [usersData, setUsersData] = useState()
  const dataNames = ["Applications Sent", "Responses", "Interviews", "Offers"]

  useEffect(() => {
    axios.get(`http://localhost:8000/user/jobspopulated/${currentUser.id}`)
    .then(response => setUsersData(response.data.foundUser)).catch(err => console.log(err))
  }, [])
  
  return (
    <>   
    <div className='flex flex-col gap-10 h-fit absolute ml-16 mt-4'>
      <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[25rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Tamagatchi</h1>
      <p className='font-bold text-[5rem]'>level</p>
    </div>
    {dataNames.map((d) => <DataComponents setUsersData={setUsersData} dataName={d} usersData={usersData}/>)}
  </div>
  {taskOrDate == 1?<TodoList setTaskOrDate={setTaskOrDate} currentUser={currentUser.id}/>: <SavedDates setTaskOrDate={setTaskOrDate}/> }
  

  <div className='w-screen flex-col items-center '>
  <div className='flex justify-center gap-20  pt-1 font-bold text-4xl bg-dimWhite w-[60%] rounded-3xl mx-auto border-2 border-gray-400 mt-4'>
    <div className='flex flex-col items-center cursor-pointer' onClick={()=> setView(1)}> <div><BsKanban/></div><div>Kanban</div> </div>
    <div className='flex flex-col items-center cursor-pointer' onClick={()=> setView(2)}><div><TfiCalendar/></div><div>Calendar</div></div>
    <div className='flex flex-col items-center cursor-pointer' onClick={()=> setView(3)}><div><GrResources/></div><div>Resources</div></div>
    <div className='flex flex-col items-center cursor-pointer' onClick={()=> setView(4)}><div><BiNotepad/></div><div>Applications</div></div> 
  </div>
  <div>{view == 1? <Kanban/>: view == 2?<Calendar/>: view == 3? <Resources/>: view == 4? <Applications/>:null }</div>
  </div>
  
  </>
  )
}