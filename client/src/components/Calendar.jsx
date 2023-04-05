import React, { useState, useRef, useEffect, useContext } from 'react';
import { DataContext } from '../App';
import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCalendar } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrashFill, BsArchive } from 'react-icons/bs';

const monthsNames = ["January", "February", "March", "April", 'May', "June", "July", "August", "September", "October", "November", "December"]

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

export function Calendar() {
  const { currentUser } = useContext(DataContext)
  const [name, setName] = useState(monthsNames[new Date().getMonth()])
  const [numba, setNumba] = useState([])
  const [success, setSuccess] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())
  const [day, setDay] = useState(new Date().getDate())
  const [error, setError] = useState(false)
  const [editting, setEditting] = useState(false)
  const [areYouSure, setAreYouSure] = useState(false)
  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [addDateModal, setAddDateModal] = useState(false)
  const [savedDates, setSavedDates] = useState([])
  const render = useRef(new Date().getMonth())

  
  
  useEffect(() => {
    axios.get(`https://thrive-server.herokuapp.com/user/dates/${currentUser.id}`).then((res) => {
      setSavedDates(res.data.savedDates)
    })
    subtract()
  }, [success])



function previousMonth() {
  if (render.current == 0) {
    render.current = 11
    setName(monthsNames[render.current])
    setYear(year - 1)
  }else {
  render.current = render.current - 1
  setName(monthsNames[render.current])
}
subtract()
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
  subtract()
}

async function checkDate(date) {
  date = date.toLocaleDateString('zh-ch', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
 let dateString = date.toString().replace('/', '-').replace('/', '-')
  function checkit() {
    return new Promise((resolve, reject) => {
      savedDates?.forEach((item) => {
        if (item.date == dateString) {
          resolve(setDateModalOpen([2, item, dateString]))
        }
      })
      reject(false)
    })
  }
  try{
    await checkit()
  } catch (err) {
    setAddDateModal(dateString)
  }
}

function checkDate2(date){
  let dateLength;
  date = date.toLocaleDateString('zh-ch', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
 let dateString = date.toString().replace('/', '-').replace('/', '-')
  savedDates?.forEach((item) => {
    if (item.date == dateString) {
      dateLength = item.notes.length
    }
  })
  if (dateLength >= 1) {
  return dateLength + ' item(s)'
  }
}

function subtract() {
  let arr = []
  let x = 32 - months[render.current]?.length
  if(x > 0) {
    for(let i = 0; i < x ; i++) {
      arr.push(i)
    }
  } 
  setNumba(arr)
  }

  return (
    <>
    <AddDateModal addDateModal={addDateModal} setAddDateModal={setAddDateModal} savedDates={savedDates} setSavedDates={setSavedDates} setSuccess={setSuccess} setError={setError} />
    <ClickedDateModal setDateModalOpen={setDateModalOpen} addDateModal={addDateModal} setAddDateModal={setAddDateModal} setAreYouSure={setAreYouSure} dateModalOpen={dateModalOpen} setEditting={setEditting}/>
    <EdittingModal editting={editting} setEditting={setEditting} setSuccess={setSuccess} setError={setError}  />
    <MakeSure setAreYouSure={setAreYouSure} areYouSure={areYouSure} setSuccess={setSuccess} setError={setError}/>
    <SuccessModal success={success} setSuccess={setSuccess} />
    <ErrorModal error={error} setError={setError} />
    <div className='mx-auto w-[60%] h-[80vh] p-2 flex flex-col justify-center rounded-3xl shadow-2xl border-gray-500 border-2 bg-dimWhite'>
      <div className='flex items-center mb-[-3rem] gap-4 '>
      <div className='font-bold text-3xl mr-auto'>{year}</div>
      <div onClick={() => setAddDateModal(true)} className='font-bold cursor-pointer text-[3rem]'>+</div>
      </div>
      <div className='flex gap-2 text-[2rem] w-fit mx-auto'>
      <div onClick={previousMonth} className="mt-2 cursor-pointer ml-auto"> <AiOutlineArrowLeft/> </div>
      <div>{name}</div>
      <div onClick={nextMonth} className="mt-2 cursor-pointer mr-auto"><AiOutlineArrowRight/></div>      
      </div>

      <div className='flex flex-wrap w-[100%] justify-center 3xl:mb-auto' >
        
      {months[render.current]?.map((d) => 
      <>
      <div onClick={()=> checkDate(new Date(`${name} ${d} ${year}`))} className='w-[8.5rem] hover:bg-gray-200 cursor-pointer 3xl:w-[7.5rem] 3xl:h-[8.5rem] font-bold text-lg h-[10rem] border-black border-[1px]'> <p className='bg-blue-300 text-xl pl-1'>{d}</p> 
      <p className='bg-green-300'>{day? d==day && name == monthsNames[new Date().getMonth()]? 'today':null:null}</p> 
       <div className='bg-red-300 pl-1 text-black'>{checkDate2(new Date(`${name} ${d} ${year}`))}</div>
      </div>
      </>
      ) }
      {numba?.map((d) =>
            <div className='w-[8.5rem] font-bold text-lg h-[10rem] border-black border-[1px] 3xl:w-[7.5rem] 3xl:h-[8.5rem] '>  <p className='bg-blue-300 text-blue-300 pl-1'>x</p></div> 
      )}
      </div>

    </div>
    </>
  );
}

export const SavedDates = ({setTaskOrDate}) => {
  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [addDateModal, setAddDateModal] = useState(false)
  const [archivedDates, setArchivedDates] = useState([])
  const [currentView, setCurrentView] = useState([])
  const [error, setError] = useState(false)
  const [areYouSure, setAreYouSure] = useState(false)
  const [success, setSuccess] = useState(false)
  const [editting, setEditting] = useState(false)
  const {currentUser} = useContext(DataContext)
  const [savedDates, setSavedDates] = useState([])

  useEffect(() => {
    axios.get(`https://thrive-server.herokuapp.com/user/dates/${currentUser.id}`).then((res) => {
      setSavedDates(res.data.savedDates)
      setCurrentView(res.data.savedDates)
      axios.get(`https://thrive-server.herokuapp.com/user/${currentUser.id}`).then((res) => {
        setArchivedDates(res.data.foundUser.archivedDates)
      })
    })
  }, [])

  return(
    <>
    <ClickedDateModal setDateModalOpen={setDateModalOpen} dateModalOpen={dateModalOpen} addDateModal={addDateModal} setAddDateModal={setAddDateModal} setAreYouSure={setAreYouSure} setEditting={setEditting}/>
    <AddDateModal addDateModal={addDateModal} setAddDateModal={setAddDateModal} setSuccess={setSuccess} setError={setError} />
    <EdittingModal editting={editting} setEditting={setEditting} setSuccess={setSuccess} setError={setError} />
    <MakeSure setAreYouSure={setAreYouSure} areYouSure={areYouSure} setSuccess={setSuccess} setError={setError} />
    <SuccessModal success={success} setSuccess={setSuccess}  />
  <div className=' w-[22rem] h-[30rem] m-5 mt-[15rem] bg-white absolute right-0 rounded-3xl shadow-2xl overflow-y-scroll scrollbar-remove'>

<div className='flex justify-center items-center border-black border-b-[1px]'>
<div className= 'font-bold mt-4 text-[1.5rem] fixed '>{currentView==savedDates? "Saved Dates" : "Archived Dates" }</div>
<div onClick={() => {currentView == savedDates? setCurrentView(archivedDates) : setCurrentView(savedDates) }} className='text-[1.5rem] ml-2 cursor-pointer'>{currentView==savedDates? <BsArchive/> : <AiOutlineCalendar /> }</div>
<div className='ml-auto text-[1.5rem]' onClick={() => setTaskOrDate(1)}><BiNotepad/></div>
<div onClick={() => setAddDateModal(true)} className='text-[2.3rem] mr-4'> + </div>
</div>

{currentView?.map((date) => 
<>  
<div onClick={() => setDateModalOpen([2, date, date.date])} className='p-2 border-[1px] border-gray-400 hover:bg-gray-300 cursor-pointer'> 
<h1 className='font-bold'>{date?.date}</h1>
<p>{date?.notes.length == 0? null: date.notes[0].content}</p>
</div>
</>  
)}

</div>
    </>
  )
}

const ClickedDateModal = ({setDateModalOpen, dateModalOpen, setEditting, setAreYouSure, setAddDateModal}) => {
  return(
  <>
  {dateModalOpen?
  <div className='w-screen flex items-center justify-center h-screen absolute top-0 bg-transBlack'>
  <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-fit py-2`}>
    <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>{dateModalOpen[2]}</h1>
    <div onClick={()=> setDateModalOpen(false)} className='ml-auto mr-2 cursor-pointer'>x</div></div>
    <h1 className='font-bold text-2xl pl-2 mt-2'>Stuff saved for this date:</h1>
    <div className='bg-white flex flex-col w-[90%] mt-4 h-52 mx-auto border-black border-2 overflow-y-scroll'>
      {dateModalOpen[1].notes.map((note) =>
            <div className='border-black border-2 h-fit p-2 hover:bg-gray-200 cursor-pointer'>
        <div className='flex gap-3'>
          
        <div onClick={() => setEditting({'dateId': dateModalOpen[1]._id, "noteId":note._id})} className='ml-auto'><FiEdit /></div>
        <div onClick={() => setAreYouSure({'dateId': dateModalOpen[1]._id, "noteId":note._id})} className='mr-2'><BsFillTrashFill /></div>
        </div>
        <p>{note.content}</p>
      </div>
      )}
    </div>
    <div className='flex justify-center gap-4'>
    <button onClick={() => setAreYouSure({'dateId': dateModalOpen[1]._id})} className='font-bold text-black mt-2  border-red-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Unsave date</button>
    <button onClick={() => setAddDateModal(dateModalOpen[2])} className='font-bold text-black mt-2  border-blue-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Add a note</button>
    </div>
  </div>
  </div>
  :null}
</>
)
}

const AddDateModal = ({addDateModal, setSavedDates, savedDates, setAddDateModal, setSuccess, setError}) => {
  const {currentUser} = useContext(DataContext)
  const [fillOutForm, setFillOutForm] = useState(false)
  const dateRef = useRef()
  const contentRef = useRef()

  function addDate(e){
    let executed = false
    if(addDateModal != true) {
      dateRef.current = addDateModal
    }  
    //if note or date aren't filled out, return
    if(!dateRef.current || !contentRef.current){
      setFillOutForm(true)
    } else {
    try{
  savedDates.forEach(async (date) => {
    if(date.date == addDateModal || date.date == dateRef.current){
      executed = true
     await axios.put(`https://thrive-server.herokuapp.com/user/adddatenote/${currentUser.id}/${date._id}`, {"content": contentRef.current}).then(()=>{
      setSuccess(true)
    }).catch(() => setError(true))
    setAddDateModal(false)
    throw new Error("stop")
    }
  }) 
  } catch (error) {
    console.log(error)
  }
  if(!executed){
    axios.put(`https://thrive-server.herokuapp.com/user/date/${currentUser.id}`, 
    {"date": `${dateRef?.current? dateRef.current: addDateModal}`, "notes": contentRef.current}).then((res)=>{
      setSuccess(true)
      setSavedDates(res.data.updatedUserDates)
    }).catch(() => setError(true))
    setAddDateModal(false)
  }
}
  } 

  return (
    <>
    {addDateModal?
      <>
      <FillOutForm setFillOutForm={setFillOutForm} fillOutForm={fillOutForm} />
      <div className='w-screen flex items-center justify-center h-screen absolute z-10 top-0 bg-transBlack'>
      <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-[40%]"}`}>
      <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>Add a date</h1>
      <div onClick={()=> setAddDateModal(false)}  className='ml-auto mr-2 cursor-pointer'>x</div></div>
      <div className='flex flex-col items-center gap-2 mt-4'>
      
      {addDateModal != true? 
      <input type="date" defaultValue={addDateModal} onChange={(e) => dateRef.current = e.target.value } className='border-black border-2 rounded-lg mb-8' readOnly/>
        :
      <>
      <h1 className='font-bold text-2xl'>Select a date</h1>
      <input type="date" onChange={(e) => dateRef.current = e.target.value } className='border-black border-2 rounded-lg mb-8'/>
      </>
      }
      <h1 className='font-bold text-2xl'>Add a note for yourself</h1>
      <input type="text" onChange={(e) => contentRef.current = e.target.value } className='w-[70%] border-black border-2 rounded-lg h-48' />
      </div>
      <div className='flex font-bold text-2xl justify-center mt-5 mb-2'>
        <button onClick={()=> setAddDateModal(false)} className='mx-auto bg-red-300 p-4 rounded-xl hover:bg-red-400'>Discard</button>
        <button onClick={addDate} className='mx-auto bg-blue-300 hover:bg-blue-400 rounded-xl p-4'>Save Date</button>
      </div>
      </div>
      </div>
      </>
      :null}
      </>
  )
} 





const EdittingModal = ({setEditting, editting, setSuccess, setError}) => {
  const {currentUser} = useContext(DataContext)
  const [date, setDate] = useState()
  const newNoteRef = useRef()

  const handleUpdate = () => {
    axios.put(`https://thrive-server.herokuapp.com/user/date/${currentUser.id}/${editting.noteId}`, {"content": newNoteRef.current}).then((res) => {
      setSuccess(true)
    })
  }

  return (
    <>
    {editting?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex flex-col justify-center'>
    
    <div>
    <label htmlFor='note' className='font-bold text-xl '>Edit note</label><br />
    <input id='note' type="text" onChange={(e) => newNoteRef.current = e.target.value} />
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

const MakeSure = ({setAreYouSure, areYouSure, setSuccess, setError }) => {    
  const {currentUser} = useContext(DataContext)
  function deleteNote(){
    axios.delete(`https://thrive-server.herokuapp.com/user/deletedatenote/${currentUser.id}/${areYouSure.dateId}/${areYouSure.noteId}`).then(()=> setSuccess(true)).catch(() => setError(true))
    }
  function deleteDate() {
    axios.delete(`https://thrive-server.herokuapp.com/user/date/${currentUser.id}/${areYouSure.dateId}/delete`).then(()=> setSuccess(true)).catch(() => setError(true))
  }

  function checkWhich() {
    if(areYouSure.noteId){
      deleteNote()
      setAreYouSure(false)
    } else {
      deleteDate()
      setAreYouSure(false)
    }
  }

  function Archive() {
    axios.put(`https://thrive-server.herokuapp.com/user/archive/${currentUser.id}/${areYouSure.dateId}`, {
      "item": "date"
    }).then(()=> setSuccess(true)).catch(() => setError(true))
  }
  return (

    <>
    {areYouSure?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Are you sure?</h1>
    <div onClick={() => setAreYouSure(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>If you delete this {areYouSure.noteId? "note" : "date"}, you can't recover it.</p>
    <div className='flex justify-evenly'>
    {areYouSure.noteId? null :<button onClick={Archive} className='bg-blue-300 p-1 font-bold rounded-lg'>Archive</button>}
    <button onClick={checkWhich} className='bg-red-400 p-1 font-bold rounded-lg'>Delete</button>
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
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
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
      <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
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

//Modal for telling a user they need to fill out the form 
const FillOutForm = ({setFillOutForm, fillOutForm}) => {
  
    useEffect(() => {
      setTimeout(() => {
        setFillOutForm(false)
      }, 3000)
    }, [fillOutForm])
  
    return (
      <>
      {fillOutForm?
      <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
      <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
      <div className='flex justify-center'>
      <h1 className='font-bold text-xl ml-auto'>Error!</h1>
      <div onClick={() => setFillOutForm(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
      </div>
      <p className='font-bold'>Please fill out the form before submitting.</p>
      </div>
      </div>
      :null}
      </>
    )
  }


