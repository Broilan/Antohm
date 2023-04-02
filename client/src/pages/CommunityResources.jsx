import React, {useContext, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App';
import axios from 'axios';
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai'; 
import { GrEmoji } from 'react-icons/gr';
import { Post, AboutGroup } from '../components';
import {math, science, engineering, disciplines} from '../data/data';
import wds from '../assets/wds.png'
import ogt from '../assets/ogt.png';
import kahn from '../assets/kahn.png';
import brocode from '../assets/brocode.jfif';
import fireship from '../assets/fireship.png';
import harvard from '../assets/harvard.png';
import freecode from '../assets/freecode.png';


const CommunityResources = () => {
  const {currentUser} = useContext(DataContext)
  const [postsArr, setPostsArr] = useState([])
  const [nicheArr, setNicheArr] = useState([])
  const postForm = useRef()
  const nicheRef = useRef()
  const [currentNiche, setCurrentNiche] = useState()
  const subNicheRef = useRef()
  const navigate = useNavigate()


  useEffect(() => {
    let arr = []
    axios.get(`https://thrive-server.herokuapp.com/post`).then(response => {
      response.data.allPosts.forEach((p) => {if(p.niche == false || p.niche == "false" || p.niche == undefined || p.niche == null) {return} else {arr.push(p)}})
      setPostsArr(arr)
    })
  }, [currentUser])
  
  const handleSubmit = (e) => {

    let data = {"content": postForm.current, "niche": nicheRef.current, "subNiche": subNicheRef.current} 
    axios.put(`https://thrive-server.herokuapp.com/post/${currentUser.id}`, data)
    .then(response => {
          navigate(`/post/${response.data.response._id}`)
    })
}

function changeGroup(group) {
  let newArr = []
  try {
      if(group == "All") {
    window.location.reload()
  } else {
    axios.get(`https://thrive-server.herokuapp.com/post`).then(response => {response.data.allPosts.forEach((p) => {if(p.niche == group) {newArr.push(p)}})
        setPostsArr(newArr)
        setCurrentNiche(group)
        nicheRef.current = group
        disciplines.forEach((d) => {
          if(d.discipline == group) {
            setNicheArr(d.types)
          }
        })
    })
 }
  } catch (err) {
    return err.json()
  }
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
    <div className='absolute bg-white rounded-2xl h-[32rem] w-96 border-gray-300 border-[1px] top-40 left-96'>
      <div className='bg-gray-500 w-[100%] h-20 rounded-t-2xl flex flex-col justify-center text-center font-bold text-white'> Our Recommended Resources</div>
      <div className="flex gap-2 text-sm border-[1px] border-gray-400 items-center justify-between p-2">
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('All')}>All</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Design')}>Design</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Engineering')}>Engineering</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Data')}>Data</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Math')}>Math</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Science')}>Science</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('other')}>other</p>
      </div>
      <div className=' flex flex-col gap-4 text-center overflow-y-scroll h-96'>
      <a target="_blank" href='https://www.youtube.com/@khanacademy' className='p-1 flex hover:bg-gray-300'><img src={kahn} className="w-16 rounded-2xl" /><p className='pt-4 pl-2'>Khan Academy</p></a >
      <a target="_blank" href='https://www.youtube.com/@TheOrganicChemistryTutor'  className='p-1 flex hover:bg-gray-300'><img src={ogt} className="w-16 rounded-2xl" /> <p className='pt-4 pl-2'>Organic Chemistry Tutor</p> </a >
     <a target="_blank" href='https://www.youtube.com/@WebDevSimplified' className='p-1 flex hover:bg-gray-300'><img src={wds} className="w-16 rounded-2xl" /> <p className='pt-4 pl-2'>Web Dev Simplified</p> </a >
      <a target="_blank" href='https://www.youtube.com/@BroCodez' className='p-1 flex hover:bg-gray-300'><img src={brocode} className="w-16 rounded-2xl"/><p className='pt-4 pl-2'>Bro Code</p></a>
      <a target="_blank" href='https://www.youtube.com/@freecodecamp' className='p-1 flex hover:bg-gray-300'><img src={freecode} className="w-16 rounded-2xl" /><p className='pt-4 pl-2'>FreeCodeCamp</p></a>
     <a target="_blank" href='https://www.youtube.com/@Fireship' className='p-1 flex hover:bg-gray-300'><img src={fireship} className="w-16 rounded-2xl" /><p className='pt-4 pl-2'>Fireship</p></a>
      <a target="_blank" href='https://pll.harvard.edu/course/cs50-introduction-computer-science?delta=0' className='p-1 flex hover:bg-gray-300'><img src={harvard} className="w-16 rounded-2xl" /><p className='pt-4 pl-2'>Harvard</p> CS50 (free)</a>
      </div>
    </div>

    <AboutGroup />
    <div className="flex flex-col w-screen h-screen items-center overflow-y-scroll">
<div className='border-black border-[1px] w-[33%] p-3 pt-4 bg-white'>

<div className=' bg-white flex gap-1 mb-[-6rem] w-16 h-12 z-10 p-1 mr-2'>
<img src={currentUser.pfp} className='rounded-[50%] border-[1px] w-12 h-12 mt-1 z-10 border-gray-400'/>
<div className='font-semibold bg-white z-10'>{currentUser.name} <br /> <p className='text-[0.8rem] after:content-[""] bg-white after:border-gray-300 after:ml-1 after:border-[1px] z-10'>@{currentUser.displayName}</p></div>
</div>

<div className='flex relative gap-4 top-[5.7rem]'>

{!currentNiche?<select onChange={(e) => getNiche(e)} className='ml-auto cursor-pointer text-white bg-blue-500 h-8 w-20 text-center font-bold p-1 rounded-3xl'>
  <option className='cursor-pointer' value="Niche" selected hidden>Niche</option>
  <option className='cursor-pointer' value="All">All</option>
  <option className='cursor-pointer' value="Design">Design</option>
  <option className='cursor-pointer' value="Engineering">Engineering</option>
  <option className='cursor-pointer' value="Data">Data</option>
  <option className='cursor-pointer' value="Math">Math</option>
  <option className='cursor-pointer' value="Science">Science</option>
  <option className='cursor-pointer' value="Other">Other</option>
</select> :
<select onChange={(e) => getSubNiche(e)} className='ml-auto cursor-pointer text-white bg-blue-500 h-8 w-20 text-center font-bold p-1 rounded-3xl'>
  {nicheArr.map((n) => 
  <>
    <option value="Niche" selected hidden>Subniche</option>
    <option value={n.type}>{n.type}</option>
</>
  )}
</select>

}
  

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
        <p className='cursor-pointer font-bold z-10' onClick={(e) => changeGroup('All')}>All</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Design')}>Design</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Engineering')}>Engineering</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Data')}>Data</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Math')}>Math</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('Science')}>Science</p>
        <p className='cursor-pointer font-bold' onClick={(e) => changeGroup('other')}>other</p>
      </div>
      {postsArr.map((p, index) => <div className='w-[33%]'> 
      <Post index={index} niche={p.niche} subNiche={p.subNiche} pfp={p.UserID} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}  /></div> )}
    </div>
    </>
  )
}

export default CommunityResources