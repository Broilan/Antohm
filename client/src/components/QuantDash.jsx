import React, {useContext, useState} from 'react';
import { DataContext } from '../App';
import {Calendar, Kanban, Applications, Resources} from './';
import TodoList from './TodoList';
import { BiNotepad } from 'react-icons/bi';
import { GrResources } from 'react-icons/gr';
import {BsKanban} from 'react-icons/bs'
import {TfiCalendar} from 'react-icons/tfi'

export default function QuantDash(){ 
  const {currentUser} = useContext(DataContext)
  const [view, setView] = useState(3)

  return (
    <>   
  <div className='flex flex-col gap-10 h-fit absolute ml-16 mt-4'>
   <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[25rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Tamagatchi</h1>
      <p className='font-bold text-[5rem]'>0</p>
    </div>
    <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[10rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Applications Sent</h1>
      <p className='font-bold text-[5rem]'>0</p>
    </div>
    <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[10rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Responses</h1>
      <p className='font-bold text-[5rem]'>0</p>
    </div>
    <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[10rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Interviews</h1>
      <p className='font-bold text-[5rem]'>0</p>
    </div>
    <div className='bg-dimWhite text-center rounded-2xl w-[25rem] h-[10rem] border-2 border-gray-400 shadow-xl'>
      <h1 className='underline text-2xl font-bold'>Offers</h1>
      <p className='font-bold text-[5rem]'>0</p>
    </div>

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