import React, {useEffect, useState, useContext} from 'react'
import { DataContext } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GrLinkUp } from 'react-icons/gr';

const NotifDd = (props) => {
  const {currentUser} = useContext(DataContext)
  const {notifsOpen, setNotifsOpen} = props
  const [notifsArray, setNotifsArray] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/user/${currentUser.id}/notifications`)
        .then(response=> {
        setNotifsArray(response.data.notifs)
        }
    )
}, [])

console.log(notifsArray)

  return (
    <>
    <div className='absolute bg-white w-96 h-[25rem] rounded-3xl overflow-y-scroll z-10 right-6 border-gray-400 border-[2px]' id="notifs">

      <div className='mb-[0.75rem]'>
      <h1 className='font-bold p-2 border-b-black border-b-[1px]'>Notifications</h1>
      <div onClick={() => setNotifsOpen(false)} className='bg-black cursor-pointer rounded-[50%] h-5 w-5 text-white text-center ml-auto mr-5 mt-[-2rem]'>x</div>
      </div>

      <div className=''  >
        {notifsArray?.map((n) => 
    <div  className='flex truncate border-b-gray-500 border-b-[1px]  hover:bg-gray-200'>
    <div className='rounded-[50%] m-1 border-[1px] w-5 h-8 p-5 border-black'></div>
    
    <div>
    <div className='font-semibold text-sm mt-1'> <div className='cursor-pointer z-20' onClick={(e) => navigate('/profile')}>@{n.from.displayName}</div> {n.content}</div>
    <div onClick={(e) => navigate(`/post/${n.postID._id}`)} className='truncate text-sm cursor-pointer'>{n.likeCommentOrFollow == 'Follow'? n.content: n.postID.content}</div>
    </div>
    </div>
    )}
    </div>

    </div>
    
    </>
  )
}

export default NotifDd