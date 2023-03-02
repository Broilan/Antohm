import React, {useState, useContext, useRef} from 'react'
import axios from 'axios';
import { DataContext } from '../App'
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';

const commentForm = (props) => {
    const {posterID, postID} = props
    const {currentUser} = useContext(DataContext)
    const postForm = useRef()

    const formChange = (e) => {
        postForm.current = e.target.value 
    }

    const handleSubmit = () => {
        let data = {"content": postForm.current}
        axios.put(`http://localhost:8000/post/comment/${postID}/${currentUser.id}/${posterID}`, data)
        .then(response => {
              console.log(response)
        })
    }
    

  return (
    <>
    <div className='border-black border-[1px] h-fit p-4 bg-white'>

        <div onClick={handleSubmit} className=' relative cursor-pointer ml-auto mr-2 top-[7.5rem] bg-blue-500 h-10 w-24 text-center text-white font-bold p-2 rounded-3xl'>post</div>

<input type="text" className='border-black border-[1px] rounded-3xl w-[100%] h-32 text-center' onChange={(e) => formChange(e)} placeholder='Send a comment!' />
<div className='flex gap-4 relative mt-[-1.2rem] ml-5'>
    <div><AiOutlineFileGif /></div>
    <div><AiFillPicture /></div>
    <div><GrEmoji /></div>
</div>


    </div>
  </>
  )
}

export default commentForm