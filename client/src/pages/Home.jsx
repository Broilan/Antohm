import React, {useState, useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import handleFile from '../utils/FileUpload'
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai'; 
import { Post, Usercard, News } from '../components'
import { GrEmoji } from 'react-icons/gr';
import { DataContext } from '../App';

const Home = () => {
const {currentUser, isAuthenticated} = useContext(DataContext)
const [postFeed, setPostFeed] = useState()
const [img, setImg] = useState()
const postForm = useRef()
const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://thrive-server.herokuapp.com/post')
            .then(response=> {
            setPostFeed(response.data.allPosts.reverse())
            }
        )
    }, [currentUser])
    
    const formChange = (e) => {
        postForm.current = e.target.value 
    }

   async function addPicture(e) {
  const response = await handleFile({"type": "post", "e": e, "userid": currentUser.id });
    setImg(response)
}

    const handleSubmit = (e) => {
        let data = {"content": postForm.current, "image": img}
        axios.put(`https://thrive-server.herokuapp.com/post/${currentUser.id}`, data)
        .then(response => {
              navigate(`/post/${response.data.response._id}`)
        })
    }

  return (
    <>
    
    <div className='flex flex-col ml-[16%] top-[10%] fixed gap-24' >

    <div >
        <Usercard />
    </div>

    </div>

    {/* <div className='right-[32%] top-[10%] fixed'>
        <News />
    </div> */}
    <div className='w-screen h-screen flex flex-col items-center overflow-y-scroll'>

    <div className='border-black border-[1px] w-[33%] p-3 pt-4 bg-white'>

    <div className=' bg-white flex gap-1 mb-[-6rem] w-16 h-12 z-10 p-1 mr-2'>
    <img src={currentUser?.pfp} className='rounded-[50%] border-[1px] w-12 h-12 mt-1 z-10 border-gray-400'/>
    <div className='font-semibold bg-white z-10'>{currentUser?.name} <br /> <p className='text-[0.8rem] after:content-[""] bg-white after:border-gray-300 after:ml-1 after:border-[1px] z-10'>@{currentUser?.displayName}</p></div>
    </div>

    <div onClick={handleSubmit} className=' relative cursor-pointer ml-auto mr-2 top-[5.7rem] bg-blue-500 h-10 w-24 text-center text-white font-bold p-2 rounded-3xl'>post</div>
    <input type="text" className='border-black border-[1px] rounded-3xl w-[100%] h-24 text-center truncate' onChange={(e) => formChange(e)} placeholder='Post Something!' />

    <div className='flex gap-4 relative mt-[-1.4rem] ml-5 text-xl '>
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

    {postFeed?.map((p, index) => <div className='w-[33%]'><Post index={index} pfp={p.UserID} subNiche={p.subNiche} niche={p.niche} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}  /></div> )}



    
  
    </div>
      
    </>
  )
}

export default Home