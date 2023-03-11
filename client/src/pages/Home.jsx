import React, {useState, useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import handleFile from '../utils/FileUpload'
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai';
import { Post, Usercard, UserGroups, News } from '../components'
import { GrEmoji } from 'react-icons/gr';
import { DataContext } from '../App';

const Home = () => {
const {currentUser, isAuthenticated} = useContext(DataContext)
const [postFeed, setPostFeed] = useState()
const [img, setImg] = useState()
const postForm = useRef()
const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/post')
            .then(response=> {
            setPostFeed(response.data.allPosts.reverse())
            }
        )
    }, [])
    
    const formChange = (e) => {
        postForm.current = e.target.value 

    }

   async function addPicture(e) {
  const response = await handleFile({"type": "post", "e": e, "userid": currentUser.id });
    setImg(response)
}

    const handleSubmit = (e) => {
        console.log("imgg", img)
        let data = {"content": postForm.current, "image": img}
        axios.put(`http://localhost:8000/post/${currentUser.id}`, data)
        .then(response => {
              navigate(`/post/${response.data.response._id}`)
        })
    }

  return (
    <>
    
    <div className='flex flex-col ml-[15%] top-[10%] fixed gap-4' >

    <div >
        <Usercard />
    </div>

    <div >
        <UserGroups />
    </div>
    </div>

    <div className='right-[32%] top-[10%] fixed'>
        <News />
    </div>
    <div className='w-screen h-screen flex flex-col items-center overflow-y-scroll'>

    <h1 className='font-bold text-[3rem] border-black border-[1px] w-[33%] text-center bg-white opacity-90'>Home</h1>

    <div className='border-black border-[1px] w-[33%] h-fit p-2 bg-white'>

    <div className='flex gap-1'>
    <img src={currentUser.pfp} className='rounded-lg border-[1px] w-16 h-16 border-black'/>
    <div className='font-semibold'>{currentUser.name} <br /> <p className='text-[0.8rem]'>@{currentUser.displayName}</p></div>
    </div>

    <br />
    <div onClick={handleSubmit} className=' relative cursor-pointer ml-auto mr-2 top-[7.5rem] bg-blue-500 h-10 w-24 text-center text-white font-bold p-2 rounded-3xl'>post</div>
    <input type="text" className='border-black border-[1px] rounded-3xl w-[100%] h-32 text-center' onChange={(e) => formChange(e)} placeholder='Post Something!' />

    <div className='flex gap-4 relative mt-[-1.2rem] ml-5'>
        <div><AiOutlineFileGif /></div>
        <label htmlFor="add-pic" className='cursor-pointer'><AiFillPicture /></label>
        <input onChange={(e) => addPicture(e)} id="add-pic" className='z-[-1] absolute' type="file"/>
        <div><GrEmoji /></div>
    </div>

   

    </div>

    <select type="text" className='bg-white w-[33%] border-black border-[1px] text-center font-semibold'>
        <option value="Recent">Recent</option>
        <option value="Following">Following</option>
    </select>

    {postFeed?.map((p) => <div className='w-[33%]'><Post pfp={p.UserID} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}  /></div> )}



    
  
    </div>
      
    </>
  )
}

export default Home