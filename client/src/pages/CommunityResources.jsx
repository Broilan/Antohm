import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App';
import axios from 'axios';
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai'; 
import { GrEmoji } from 'react-icons/gr';
import { Post, AboutGroup } from '../components'
import {math, science, engineering} from '../data/data'


const CommunityResources = () => {
  const {currentUser} = useContext(DataContext)
  const [postsArr, setPostsArr] = useState([])
  const postForm = useRef()
  const nicheRef = useRef()
  const subNicheRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    let arr = []
    axios.get(`http://localhost:8000/post`).then(response => {
      response.data.allPosts.forEach((p) => {if(p.niche == false || p.niche == "false" || p.niche == undefined || p.niche == null) {return} else {arr.push(p)}})
      setPostsArr(arr)
    })
  }, [])
  const handleSubmit = (e) => {
    let data = {"content": postForm.current, "niche": nicheRef.current}
    axios.put(`http://localhost:8000/post/${currentUser.id}`, data)
    .then(response => {
          navigate(`/post/${response.data.response._id}`)
    })
}

function handleForm(e) {
  postForm.current = e.target.value
}

function getNiche(e) {
  nicheRef.current = e.target.value
}

function getSubNiche(e) {
  subNicheRef.current = e.target.value
}

  return (
    <>
    <AboutGroup />
    <div className="flex flex-col w-screen h-screen items-center">
<div className='border-black border-[1px] w-[33%] p-3 pt-4 bg-white'>

<div className=' bg-white flex gap-1 mb-[-6rem] w-16 h-12 z-10 p-1 mr-2'>
<img src={currentUser.pfp} className='rounded-[50%] border-[1px] w-12 h-12 mt-1 z-10 border-gray-400'/>
<div className='font-semibold bg-white z-10'>{currentUser.name} <br /> <p className='text-[0.8rem] after:content-[""] bg-white after:border-gray-300 after:ml-1 after:border-[1px] z-10'>@{currentUser.displayName}</p></div>
</div>

<div className='flex relative gap-4 top-[5.7rem]'>

<select onChange={(e) => getNiche(e)} className='ml-auto cursor-pointer text-white bg-blue-500 h-8 w-20 text-center font-bold p-1 rounded-3xl'>
  <option value="Niche" selected hidden>Niche</option>
  <option value="All">All</option>
  <option value="Design">Design</option>
  <option value="Engineering">Engineering</option>
  <option value="Data">Data</option>
  <option value="Math">Math</option>
  <option value="Science">Science</option>
  <option value="Other">Other</option>
</select>
  

<div onClick={handleSubmit} className='cursor-pointer mr-2 bg-blue-500 h-8 w-20 text-center text-white font-bold p-1 rounded-3xl'>Post</div>
</div>

<input onChange={(e) => handleForm(e)} type="text" className='border-black border-[1px] rounded-3xl w-[100%] h-24 text-center pl-12 truncate' placeholder='Post a resource to help your fellow job seekers!' />

<div className='flex gap-4 relative mt-[-1.4rem] ml-5 text-xl '>
    <div><AiOutlineFileGif /></div>
    <label htmlFor="add-pic" className='cursor-pointer'><AiFillPicture /></label>
    <input id="add-pic" className='z-[-1] absolute' type="file"/>
    <div><GrEmoji /></div>
</div>



</div>
      <div className="flex bg-white gap-2 border-[1px] border-gray-400 w-[33%] items-center justify-between p-2">
        <p>All</p>
        <p>Design</p>
        <p>Engineering</p>
        <p>Data</p>
        <p>Math</p>
        <p>Science</p>
        <p>other</p>
      </div>

      {postsArr.map((p) => <div className='w-[33%]'><Post niche={p.niche} pfp={p.UserID} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}  /></div> )}
    </div>
    </>
  )
}

export default CommunityResources