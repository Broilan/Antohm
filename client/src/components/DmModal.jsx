import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { DataContext } from '../App'
const socket = io.connect('http://localhost:8000')

const DmModal = (props) => {
  const {currentUser} = useContext(DataContext)
    const {mOpen, setMOpen} = props
    const messageRef = useRef()
    const [allDms, setAllDms] = useState()
    const [dmArray, setDmArray] = useState([])
    const [dmName, setDmName] = useState()
    const [allUsers, setAllUsers] = useState()
    const [isTyping, setIsTyping] = useState(false)
    const searchRef = useRef()
    const [dmPfp, setDmPfp] = useState()
    const dmRef = useRef()

    function getAllUsers() {
            axios.get(`http://localhost:8000/user`)
      .then(response => {
        setAllUsers(response.data.allusers)
      })
    } 


    useEffect(() => {
      axios.get(`http://localhost:8000/user/dms/${currentUser.id}/`)
      .then(response => {
        setAllDms(response.data.dms.reverse())
      })
      if(Array.isArray(mOpen)) {
         axios.get(`http://localhost:8000/user/specdm/${currentUser.id}/${mOpen[1]}`)
        .then(response => {          
          if(response.data.dms !== null) {
          setDmArray(response.data.dms.messages)
          response.data.dms.to._id == currentUser.id? setDmName(response.data.dms.from.name) : setDmName(response.data.dms.to.name)      
          response.data.dms.to._id == currentUser.id? dmRef.current = response.data.dms.from._id : dmRef.current = response.data.dms.to._id
        } else {
         setDmName(mOpen[2])
         dmRef.current = mOpen[1]
        }
        })
      }
      getAllUsers()
    }, [])


    useEffect(() => {
      socket.on('recieve_message', (data) => {
        setDmArray(data)
      })
      
    }, [socket])

    const sendMessage = () => {
      const data = {"message": messageRef.current}
      axios.put(`http://localhost:8000/chat/send/${currentUser.id}/${dmRef.current}`, data)
      .then(response => {
          setDmArray(response.data.newDmArr.messages)
          console.log(response.data.newDmArr)    
        socket.emit("send_message", response.data.newDmArr.messages)
        if(dmArray == 0) {
          console.log(allDms)
          setAllDms(prev => [{"message": messageRef.current }, ...prev]  )
        }
      })      
    }

    const openDM = (dm) => {
      
      setDmArray(dm.messages)
      if(dm.from) { 
      dm.to._id == currentUser.id? setDmName(dm.from.name) : setDmName(dm.to.name) 
      dm.to._id == currentUser.id? setDmPfp(dm.from.pfp) : setDmPfp(dm.to.pfp)     
      dm.to._id == currentUser.id? dmRef.current = dm.from._id : dmRef.current = dm.to._id   
      } else if (window.location.pathname == '/profile/:id') {
        setDmName(mOpen[2])
        dmRef.current = mOpen[1]
      }

      if(!dm.from) { 
        allDms.map(d => {
          if(d.to.name == dm.name || d.from.name == dm.name) { 
          setDmName(dm.name)     
          setDmPfp(d.pfp)
          dmRef.current = dm._id
          setDmArray(d.messages)
          }
         })
      } 
        if(isTyping == true) {
          console.log('f3')
            dmRef.current = dm._id
          }
    }

    function searchUsers(e) {
      setIsTyping(true)
      searchRef.current = e.target.value
      const regex = new RegExp(searchRef.current, 'i')
      if(searchRef.current == '') {
        setIsTyping(false)
        getAllUsers()
      } else {
        let filterDms = allUsers.filter(c => {
          return c.name.match(regex)
        }
        )
        setAllUsers(filterDms)
        
    }}

    


  return (
    <>
    <div className='w-screen h-screen absolute flex items-end justify-end '>
    <div className='flex bg-white rounded-3xl border-gray-400 border-[2px] rounded-b-none rounded-tr-none w-[45rem] h-[30rem] z-10 mb-[3.1rem]'>

    <div className='flex flex-col w-[40%] border-r-gray-400 border-r-[1px] overflow-y-scroll ' id="dmp">
        <h1 className='text-center font-bold mt-1 border-b-[1px] border-black pb-6'>Chats</h1>
        <input onChange={(e) => searchUsers(e)} type="text" className='border-black border-2 w-48 mx-auto my-2 relative mt-[-1rem] rounded-md p-1 ' placeholder='Search users'/>
    {isTyping==false? allDms?.map((d) => 
        <div onClick={(e) => openDM(d)} className='flex truncate border-b-gray-500 border-b-[1px] hover:bg-gray-200'>
          {d.to?._id == currentUser.id?
    <img src={d.from.pfp} className='rounded-[50%] m-1 border-[1px] w-12 border-black'/>:
    <img src={d.to.pfp} className='rounded-[50%] m-1 border-[1px] w-12  border-black'/>}
    <div>
    <div className='font-semibold text-sm mt-1'>{d.from?.name == currentUser.name? d.to?.name: d.from?.name? d.from?.name: mOpen[2]}</div>
     <div className='truncate text-sm'>{Array.isArray(d.messages)?d.messages[d.messages.length-1].message[0] : d.message}</div>
    </div>
    </div>
    ) :
        allUsers?.map((d) => 
        <div onClick={(e) => openDM(d, e)} className='flex truncate  border-b-gray-500 border-b-[1px] hover:bg-gray-200'>
    <img src={d.pfp} className='rounded-[50%] m-1 border-[1px] w-10 h-10 border-black'/> 
    <div>
    <div className='font-semibold text-sm mt-1'>{d.name}</div>
     <div className='truncate text-sm'>d.bio</div>
    </div>
    </div>
    )}



    </div>

    <div className='w-[60%] h-[100%] overflow-y-scroll' id="dms">

        <div className='border-b-black border-b-[1px] mb-2 p-1'>
        <h1 className='font-bold m-5 '>{dmName? dmName: "Welcome to your chats!"}</h1>
        <div onClick={() => setMOpen(false)} className='bg-black cursor-pointer rounded-[50%] h-5 w-5 text-white text-center ml-auto mr-5 mt-[-2.5rem]'>x</div>
        </div>

       {dmArray == false? null:<img src={dmPfp} className='rounded-[50%] border-[1px] w-12 mx-auto border-black' />}

            <div className='mt-4'>
            {dmArray == false?<div className='rounded-lg border-black bg-blue-400 text-white font-bold break-words border-[1px] w-fit h-fit p-5 mx-auto'>Search for other users to chat with.<br></br> <p className='text-center text-2xl'>Be kind!</p> </div> : null} 

            <div className='mb-12'>
            {dmArray?.map((d) =>
            <>
           {d.from == currentUser.id?<div className=' break-words rounded-lg border-black border-[1px] w-44 h-fit p-5 ml-auto mr-1 bg-blue-400 text-white font-bold'> {d.message[0]}</div> : 
            <div className='break-words rounded-lg border-black border-[1px] bg-gray-300 font-bold w-44 h-fit p-5 ml-1'>{d.message[0]}</div>} 
            </>
            )} 
            </div>   
            <div className='fixed border-b-gray-400 border-b-[2px] bottom-[0%] flex w-[24%] h-12 gap-2 bg-white'>

              {dmName?
              <>
            <input type="text" onChange={(e) => messageRef.current = e.target.value} className='border-black border-[1px] rounded-lg ml-16 p-2' placeholder='Be nice' />
             <div onClick={(e) => sendMessage()} className='w-16 h-10 cursor-pointer bg-blue-400 text-white text-center pt-2 font-bold rounded-lg'>Send</div> 
             </>
             : null}

            </div>  
            
            </div>

    </div>

    </div>
    </div>
    </>
  )
}

export default DmModal