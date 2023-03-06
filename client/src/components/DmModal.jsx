import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { DataContext } from '../App'
const socket = io.connect('http://localhost:8000')

const DmModal = (props) => {
  const {currentUser} = useContext(DataContext)
    const {mOpen, setMOpen} = props
    const messageRef = useRef()
    const [msgs, setMsgs] = useState() 
    const [newBubbles, setNewBubbles] = useState([])
    const [allDms, setAllDms] = useState()
    const [dmArray, setDmArray] = useState([])
    const [dmName, setDmName] = useState()
    const dmRef = useRef()

    class textBubble {
      constructor(message, from) {
        this.message = message
        this.from = from
      }
    }
    useEffect(() => {
      axios.get(`http://localhost:8000/user/dms/${currentUser.id}/`)
      .then(response => {
        console.log('res', response.data.dms)
        setAllDms(response.data.dms.reverse())
      })
    }, [])

    useEffect(() => {
      socket.on('recieve_message', (data) => {
        setDmArray(data)
      })
      
    }, [socket])

    const sendMessage = (to) => {
      const data = {"message": messageRef.current}
      const data2= {data, "userid":currentUser.id}
      axios.put(`http://localhost:8000/chat/send/${currentUser.id}/${dmRef.current}`, data)
      .then(response => {
        setDmArray(response.data.newDmArr.messages)
        socket.emit("send_message", response.data.newDmArr.messages)
      })
      
    }

    const openDM = (dm) => {
      setDmArray(dm.messages)
      dm.to._id == currentUser.id? setDmName(dm.from.name) : setDmName(dm.to.name)      
      dm.to._id == currentUser.id? dmRef.current = dm.from._id : dmRef.current = dm.to._id      
    }



  return (
    <>
    <div className='w-screen h-screen absolute flex items-end justify-end '>
    <div className='flex bg-white rounded-3xl border-gray-400 border-[2px] rounded-br-none w-[45rem] h-[30rem] z-10 mb-20'>

    <div className='w-[40%] border-r-gray-400 border-r-[1px] overflow-y-scroll ' id="dmp">
        <h1 className='text-center font-bold mt-1'>Chats</h1>

    {allDms?.map((d) => 
        <div onClick={(e) => openDM(d)} className='flex truncate border-b-gray-500 border-b-[1px] hover:bg-gray-200'>
    <div className='rounded-[50%] m-1 border-[1px] w-5 h-8 p-5 border-black'></div>
    <div>
    <div className='font-semibold text-sm mt-1'>{d.from.name == currentUser.name? d.to.name: d.from.name}</div>
    <div className='truncate text-sm'>{d.messages[d.messages.length-1].message[0]}</div>
    </div>
    </div>
    )}



    </div>

    <div className='w-[60%] h-[100%] overflow-y-scroll' id="dms">

        <div className='border-b-black border-b-[1px] mb-2 p-1'>
        <h1 className='font-bold m-5'>Chat with {dmName}</h1>
        <div onClick={() => setMOpen(false)} className='bg-black cursor-pointer rounded-[50%] h-5 w-5 text-white text-center ml-auto mr-5 mt-[-2.5rem]'>x</div>
        </div>

        <div className='rounded-[50%] border-[1px] w-10 h-10 p-6 mx-auto border-black'></div>
        


            <div className='mt-4'>
            {dmArray == false?<div className='rounded-lg border-black border-[1px] w-44 h-fit p-5 mx-auto'>Welcome to your DM's!</div> : null} 
 
            {dmArray?.map((d) =>
            <>
           {d.from == currentUser.id?<div className='rounded-lg border-black border-[1px] w-44 h-fit p-5 ml-auto mr-1'> {d.message[0]}</div> : 
            <div className='rounded-lg border-black border-[1px] w-44 h-fit p-5 ml-1'>{d.message[0]}</div>} 
            </>
            )}    
            <div className='relative border-b-gray-400 border-b-[2px] bottom-[0%] mt-auto flex w-[24%] h-12 gap-2 bg-white'>
            <input type="text" onChange={(e) => messageRef.current = e.target.value} className='border-black border-[1px] rounded-lg ml-16 p-2' placeholder='Be nice' />
            <div onClick={(e) => sendMessage()} className='w-16 h-10 bg-blue-400 text-white text-center pt-2 font-bold rounded-lg'>Send</div>
            </div>  
            
            </div>

    </div>

    </div>
    </div>
    </>
  )
}

export default DmModal