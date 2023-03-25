import React, { useState, useRef, useEffect, useContext } from 'react';
import { DataContext } from '../App';
import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';

const monthsNames = ["January", "February", "March", "April", 'May', "June", "July", "August", "September", "October", "November", "December"]

export function Calendar(props) {
  const { currentUser } = useContext(DataContext)
  const [name, setName] = useState(monthsNames[new Date().getMonth() + 1])
  const [year, setYear] = useState(new Date().getFullYear())
  const [day, setDay] = useState(new Date().getDate())
  const [editting, setEditting] = useState(false)
  const [areYouSure, setAreYouSure] = useState(false)
  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [addDateModal, setAddDateModal] = useState(false)
  const [savedDates, setSavedDates] = useState([])
  const render = useRef(new Date().getMonth() + 1)

  
  useEffect(() => {
    axios.get(`http://localhost:8000/user/dates/${currentUser.id}`).then((res) => {
      console.log(res.data.savedDates)
      setSavedDates(res.data.savedDates)
    })
  }, [])

const months =[
  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  
  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  
  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
]

function previousMonth() {
  if (render.current == 0) {
    render.current = 11
    setName(monthsNames[render.current])
    setYear(year - 1)
  }else {
  render.current = render.current - 1
  setName(monthsNames[render.current])
}
}

function nextMonth() {
  if (render.current == 11) {
    render.current = 0
    setName(monthsNames[render.current])
    setYear(year + 1)
  } else {
      render.current = render.current + 1
  setName(monthsNames[render.current])
  }

}

async function checkDate(date) {
  let dateAsString = date.toString()
  let dateAsArr = Array.from(dateAsString)
  if(dateAsString[1] == '/'){
  dateAsArr.splice(0, 0, '0')
  dateAsString = dateAsArr
  }
  if(dateAsString[2] == '/' && dateAsString[4] == '/'){
    dateAsString.splice(3, 0, '0')
  }
  dateAsString = dateAsString.join('')

  function checkit() {
    return new Promise((resolve, reject) => {
      savedDates.forEach((item) => {
        if (item.date == dateAsString) {
          resolve(setDateModalOpen([2, item, dateAsString]))
        }
      })
      reject(false)
    })
  }
  try{
    await checkit()
  } catch (err) {
    setAddDateModal(true)
  }

}


  return (
    <>
    <AddDateModal addDateModal={addDateModal} setAddDateModal={setAddDateModal} />
    <ClickedDateModal setDateModalOpen={setDateModalOpen} setAreYouSure={setAreYouSure} dateModalOpen={dateModalOpen} setEditting={setEditting}/>
    <EdittingModal editting={editting} setEditting={setEditting}  />
    <MakeSure setAreYouSure={setAreYouSure} areYouSure={areYouSure}/>
    <div className='mx-auto w-[60%] h-fit p-2 rounded-3xl shadow-2xl border-gray-500 border-2 bg-dimWhite'>
      <div className='flex items-center gap-4'>
      <div className='font-bold text-3xl mr-auto'>{year}</div>
      <div onClick={() => setAddDateModal(true)} className='font-bold cursor-pointer text-[3rem]'>+</div>
      </div>
      <div className='flex gap-2 text-[3rem]'>
      <div onClick={previousMonth} className="mt-3 cursor-pointer ml-auto"> <AiOutlineArrowLeft/> </div>
      <div>{name}</div>
      <div onClick={nextMonth} className="mt-3 cursor-pointer mr-auto"><AiOutlineArrowRight/></div>      
      </div>

      <div className='flex flex-wrap w-[100%] justify-start ml-24 mb-6' >
      {months[render.current]?.map((d) => <div onClick={()=> checkDate(new Intl.DateTimeFormat('en-us').format(new Date(Array.from(`${name} ${d} ${year}`).join(''))))} className='w-[12rem] hover:bg-gray-200 cursor-pointer font-bold text-xl h-[12rem] border-black border-[1px]'>{d} {day? d==day && name == monthsNames[new Date().getMonth() + 1]? 'today':null:null}</div> )}
      </div>

    </div>
    </>
  );
}

export const SavedDates = ({setTaskOrDate}) => {
  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [addDateModal, setAddDateModal] = useState(false)
  const [areYouSure, setAreYouSure] = useState(false)
  const [editting, setEditting] = useState(false)
  const {currentUser} = useContext(DataContext)
  const [savedDates, setSavedDates] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8000/user/dates/${currentUser.id}`).then((res) => {
      setSavedDates(res.data.savedDates)
    })
  }, [])

  return(
    <>
    <ClickedDateModal setDateModalOpen={setDateModalOpen} dateModalOpen={dateModalOpen} setAreYouSure={setAreYouSure} setEditting={setEditting}/>
    <AddDateModal addDateModal={addDateModal} setAddDateModal={setAddDateModal} />
    <EdittingModal editting={editting} setEditting={setEditting} />
    <MakeSure setAreYouSure={setAreYouSure} areYouSure={areYouSure} />
  <div className=' w-[30rem] h-[40rem] m-5 mt-[15rem] bg-white absolute right-0 rounded-3xl shadow-2xl overflow-y-scroll' id="todolist">

<div className='flex justify-center items-center border-black border-b-[1px]'>
<div className= 'font-bold mt-4 text-[2rem] fixed '>Saved Dates</div>
<div className='ml-auto text-[2rem]' onClick={() => setTaskOrDate(1)}><BiNotepad/></div>
<div onClick={() => setAddDateModal(true)} className='text-[3rem] mr-4'> + </div>
</div>

{savedDates?.map((date) => 
<>  
<div onClick={() => setDateModalOpen([2, date])} className='p-2 border-[1px] border-gray-400 hover:bg-gray-300 cursor-pointer'> 
<h1 className='font-bold'>{date?.date}</h1>
<p>{date?.notes.length == 0? null: date.notes[0].content}</p>
</div>
</>  
)}

</div>
    </>
  )
}

const ClickedDateModal = ({setDateModalOpen, dateModalOpen, setEditting, setAreYouSure}) => {
  return(
  <>
  {dateModalOpen?
  <div className='w-screen flex items-center justify-center h-screen absolute top-0 bg-transBlack'>
  <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-[40%]`}>
    <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>{dateModalOpen[2]}</h1>
    <div onClick={()=> setDateModalOpen(false)} className='ml-auto mr-2 cursor-pointer'>x</div></div>
    <h1 className='font-bold text-2xl pl-2 mt-2'>Stuff saved for this date:</h1>
    <div className='bg-white flex flex-col w-[90%] mt-4 h-52 mx-auto border-black border-2 overflow-y-scroll'>
      {dateModalOpen[1].notes.map((note) =>
            <div className='border-black border-2 h-20 p-2 hover:bg-gray-200 cursor-pointer'>
        <div className='flex gap-3'>
          
        <h1 className='font-bold'>Date name</h1>
        <div onClick={() => setEditting(true)} className='ml-auto'><FiEdit /></div>
        <div onClick={() => setAreYouSure(true)} className='mr-2'><BsFillTrashFill /></div>
        </div>
        <p className='truncate'>{note.content}</p>
      </div>
      )}
    </div>
    <div className='flex justify-center'><button className='font-bold text-black mt-2  border-blue-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Add a note</button></div>
  </div>
  </div>
  :null}
</>
)
}

const AddDateModal = ({addDateModal, setAddDateModal}) => {

  return (
    <>
    {addDateModal?
      <>
      <div className='w-screen flex items-center justify-center h-screen absolute top-0 bg-transBlack'>
      <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-[40%]"}`}>
      <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>Add a date</h1>
      <div onClick={()=> setAddDateModal(false)} className='ml-auto mr-2 cursor-pointer'>x</div></div>
      <div className='flex flex-col items-center gap-2 mt-4'>
      <h1 className='font-bold text-2xl'>Select a date</h1>
      <input type="date" className='border-black border-2 rounded-lg mb-8'/>
      <h1 className='font-bold text-2xl'>Add a note for yourself</h1>
      <input type="text" className='w-[70%] border-black border-2 rounded-lg h-48' />
      </div>
      <div className='flex font-bold text-2xl justify-center mt-5 mb-2'>
        <button onClick={()=> setAddDateModal(false)} className='mx-auto bg-red-300 p-4 rounded-xl hover:bg-red-400'>Discard</button>
        <button className='mx-auto bg-blue-300 hover:bg-blue-400 rounded-xl p-4'>Save Date</button>
      </div>
      </div>
      </div>
      </>
      :null}
      </>
  )
} 





const EdittingModal = ({setEditting, editting,}) => {
  const [date, setDate] = useState()

  // useEffect(() => {
  //     const formatted = dateModalOpen[3] + " " + dateModalOpen[1] + ", " + dateModalOpen[2]
  // const reformattedDate = new Intl.DateTimeFormat('zh-CN').format(new Date(formatted)).split("")
  // if(reformattedDate[4]  == '/' && reformattedDate[6]  == '/' ){
  //   reformattedDate.splice(5, 0, '0')
  // }   
  //  if(reformattedDate[reformattedDate.length-2] == '/'){
  //     reformattedDate.splice(-1, 0, '0')
  //   }
  // reformattedDate.forEach((i, index) => {
  //   if(i == '/'){
  //     reformattedDate.splice(index, 1, '-')
  //   }
  // })
  // setDate(reformattedDate.join(''))
  // }, [editting])
  
  return (
    <>
    {editting?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex flex-col justify-center'>

    <div>
      <div className='flex '>
    <label htmlFor='date' className='font-bold text-xl ml-auto'>Date</label><br />    
    <div onClick={() => setEditting(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
      </div>
    <input id='date' type="date" defaultValue={date?date:null}/>
    </div>
    
    <div>
    <label htmlFor='note' className='font-bold text-xl '>Notes</label><br />
    <input id='note' type="text" />
    </div>

    </div>
    <div className='flex justify-evenly'>
    <button className='bg-red-400 p-1 font-bold rounded-lg'>Discard Changes</button>
    <button className='bg-blue-300 p-1 font-bold rounded-lg'>Update</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}

const MakeSure = ({setAreYouSure, areYouSure}) => {
  return (
    <>
    {areYouSure?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Are you sure?</h1>
    <div onClick={() => setAreYouSure(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>If you delete this note, you can't recover it.</p>
    <div className='flex justify-evenly'>
    <button className='bg-blue-300 p-1 font-bold rounded-lg'>Archive</button>
    <button className='bg-red-400 p-1 font-bold rounded-lg'>Delete</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}

