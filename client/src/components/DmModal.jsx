import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000')

const DmModal = (props) => {
    const {mOpen, setMOpen} = props
    const messageRef = useRef()
    const [msgs, setMsgs] = useState()
    const [socketId, setSocketId] = useState('')

    class textBubble {
      constructor(message, from) {
        this.message = message
        this.from = from
      }
    }

    const sendMessage = () => {
      socket.emit("send_message", {message: messageRef.current, from:'tanner' })
    }

    useEffect(() => {
      
      socket.on('recieve_message', (data, socket) => {
        setMsgs((new textBubble(data.message, data.from)))
        setSocketId(socket)
      })
    }, [socket])

    console.log(msgs)
  return (
    <>
    <div className='w-screen h-screen absolute flex items-end justify-end '>
    <div className='flex bg-white rounded-3xl border-gray-400 border-[2px] rounded-br-none w-[45rem] h-[30rem] z-10 mb-20'>

    <div className='w-[40%] border-r-gray-400 border-r-[1px] overflow-y-scroll ' id="dmp">
        <h1 className='text-center font-bold mt-1'>Chat</h1>

    <div className='flex truncate border-b-gray-500 border-b-[1px] hover:bg-gray-200'>
    <div className='rounded-[50%] m-1 border-[1px] w-5 h-8 p-5 border-black'></div>
    <div>
    <div className='font-semibold text-sm mt-1'>Name</div>
    <div className='truncate text-sm'>essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
    </div>
    
    </div>

    </div>

    <div className='w-[60%] h-[100%] overflow-y-scroll' id="dms">

        <div className='border-b-black border-b-[1px] mb-2 p-1'>
        <h1 className='font-bold m-5'>Chat with xyzabc</h1>
        <div onClick={() => setMOpen(false)} className='bg-black cursor-pointer rounded-[50%] h-5 w-5 text-white text-center ml-auto mr-5 mt-[-2.5rem]'>x</div>
        </div>

        <div className='rounded-[50%] border-[1px] w-10 h-10 p-6 mx-auto border-black'></div>
        
            <div className='fixed border-b-gray-400 border-b-[2px] bottom-[0%] mt-auto flex w-[24%] h-12 gap-2 bg-white'>
            <input type="text" onChange={(e) => messageRef.current = e.target.value} className='border-black border-[1px] rounded-lg ml-16 p-2' placeholder='Be nice' />
            <div onClick={sendMessage} className='w-16 h-10 bg-blue-400 text-white text-center pt-2 font-bold rounded-lg'>Send</div>
            </div>  

            <div className='mt-4'>
            <>
            <div className='rounded-lg border-black border-[1px] w-44 h-fit p-5 ml-auto mr-1'> {msgs?.message}</div>
            <div className='rounded-lg border-black border-[1px] w-44 h-fit p-5 ml-1'>text-bubble</div>
            </>
            </div>

    </div>

    </div>
    </div>
    </>
  )
}

export default DmModal