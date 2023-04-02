import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { DataContext } from '../App'
const socket = io.connect('http://localhost:8000')

const DmModal = (props) => {
  const {currentUser} = useContext(DataContext)
    const {mOpen, setMOpen} = props
    const [currentDm, setCurrentDm] = useState()
    const [dropdownState, setDropdownState] = useState([])
    const [dmArray, setDmArray] = useState([])
    const [allDms, setAllDms] = useState()
    const [allUsers, setAllUsers] = useState()
    const [isTyping, setIsTyping] = useState(false)
    const searchRef = useRef()
    const messageRef = useRef()

    function getAllUsers() {
      axios.get(`http://localhost:8000/user`)
      .then(response => {
        setAllUsers(response.data.allusers)
      })
    } 


    useEffect(() => {
      axios.get(`http://localhost:8000/user/dms/${currentUser.id}`)
      .then(response => {
        setAllDms(response.data.dms.reverse())
        setDropdownState(response.data.dms.reverse())
      }).catch(err => console.log(err))
      getAllUsers()
      if(mOpen != true) {
        setCurrentDm(mOpen)
        axios.get(`http://localhost:8000/user/dms/${currentUser.id}`).then(response => {
          response.data.dms.forEach((dm) => {
            if(dm.to._id == mOpen._id || dm.from._id == mOpen._id) {
              setDmArray(dm.messages)
            } 
          })
        })
      }
    }, [])

    useEffect(() => {
      socket.on('recieve_message', (data) => {
        setDmArray(data)
      })
    }, [socket])

    const sendMessage = () => {
      axios.put(`http://localhost:8000/chat/send/${currentUser.id}/${currentDm._id}`, {"message": messageRef.current.value})
      .then(response => {
          setDmArray(response.data.newDmArr.messages)
        socket.emit("send_message", response.data.newDmArr.messages)
        if(dmArray == 0) {
          setAllDms(prev => [{"message": messageRef.current.value }, ...prev]  )
        }
      })      
    }

    const openDM = (dm) => {
      if(isTyping) {
        setCurrentDm(dm)
        setDmArray(["nothing to see here yet!"])
      } else {
      if(dm.to._id == currentUser.id) {
      setCurrentDm(dm.from)
        } else {
          setCurrentDm(dm.to)
        }
      setDmArray(dm.messages)
      }
      }


    function searchUsers(e) {
      setIsTyping(true)
      searchRef.current = e.target.value
      const regex = new RegExp(searchRef.current, 'i')
      if(searchRef.current == '') {
        setIsTyping(false)
        setDropdownState(allDms)
      } else {
        let filterDms = allUsers.filter(c => {
          return c.name.match(regex) && c._id != currentUser.id
        })
        setDropdownState(filterDms)
    }}

    


  return (
    <>
    <div className='w-screen h-screen absolute flex items-end justify-end '>
    <div className='flex bg-white rounded-3xl border-gray-400 border-[2px] rounded-b-none rounded-tr-none w-[45rem] h-[30rem] z-10 mb-[3.1rem]'>

    <div className='flex flex-col w-[40%] border-r-gray-400 border-r-[1px] overflow-y-scroll ' id="dmp">
        <h1 className='text-center font-bold mt-1 border-b-[1px] border-black pb-6'>Chats</h1>
        <input onChange={(e) => searchUsers(e)} type="text" className='border-black border-2 w-48 mx-auto my-2 relative mt-[-1rem] rounded-md p-1 ' placeholder='Search users'/>

    {dropdownState?.map((d) => 
    
        <div onClick={() => openDM(d)} className='flex truncate border-b-gray-500 border-b-[1px] hover:bg-gray-200'>
    <img src={d?.from?._id == currentUser?.id? d?.to?.pfp : d?.from?.pfp? d.from.pfp: d.pfp} className='rounded-[50%] m-1 border-[1px] w-12  border-black'/>
    <div>
    <div className='font-semibold text-sm mt-1'>{d.from?._id == currentUser.id? d.to?.name: d.from?.name? d.from?.name : d.name}</div>
     <div className='truncate text-sm'>{d.messages?.[d.messages.length-1].message[0] ?? d.message ?? null}</div>
    </div>
    </div>
    )}
    </div>

    <div className='w-[60%] h-[100%] overflow-y-scroll' id="dms">

        <div className='border-b-black border-b-[1px] mb-2 p-1'>
        <h1 className='font-bold m-5 '>{currentDm? currentDm.name: "Welcome to your chats!"}</h1>
        <div onClick={() => setMOpen(false)} className='bg-black cursor-pointer rounded-[50%] h-5 w-5 text-white text-center ml-auto mr-5 mt-[-2.5rem]'>x</div>
        </div>
            {/* replace this with the thrive logo later */}
           <img src={currentDm?.pfp ?? currentUser?.pfp} className='rounded-[50%] border-[1px] w-12 mx-auto border-black' />   

            <div className='mt-4'>
            {dmArray == false?<div className='rounded-lg border-black bg-blue-400 text-white font-bold break-words border-[1px] w-fit h-fit p-5 mx-auto'>Search for other users to chat with.<br></br> <p className='text-center text-2xl'>Be kind!</p> </div> : null} 

            <div className='mb-12'>
            {dmArray?.map((d) =>
            <>
            {d.from == currentUser.id?
            <div className='break-words rounded-lg border-black border-[1px] bg-blue-300 font-bold w-44 h-fit p-5 ml-auto mr-1'>{d.message?.[0] ?? d }</div>:
            <div className='break-words rounded-lg border-black border-[1px] bg-gray-300 font-bold w-44 h-fit p-5 ml-1'>{d.message?.[0] ?? d }</div>
            }
            </>
            )} 
            </div>   

            <div className='fixed border-b-gray-400 border-b-[2px] bottom-[0%] flex w-[24%] h-12 gap-2 bg-white'>
            <input type="text" ref={messageRef} className='border-black border-[1px] rounded-lg ml-16 p-2' placeholder='Be nice' />
             <div onClick={(e) => sendMessage()} className='w-16 h-10 cursor-pointer bg-blue-400 text-white text-center pt-2 font-bold rounded-lg'>Send</div> 
            </div>  
            
            </div>

    </div>

    </div>
    </div>
    </>
  )
}

export default DmModal