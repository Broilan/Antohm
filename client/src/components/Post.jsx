import React, {useContext, useRef} from 'react'
import { DataContext } from '../App';
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import {BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { GrResources } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
  //context
  const {currentUser, setCurrentUser} = useContext(DataContext)
  //props
  const {postID, niche, subNiche, image, posterID, displayName, username, bookmarks, comments, likes, datePosted, content, sourced, pfp, currentFeed} = props
  //refs
  const likeNum = useRef(likes?.length)
  const bookmarkNum = useRef(bookmarks?.length)
  const commentsNum = useRef(comments?.length)
  const resourcesNum = useRef(sourced?.length)
  const likeRef = useRef(false)
  const bookmarkRef = useRef(false)
  //navigate
  const navigate=useNavigate()
   
  function nav(id) {
    navigate(`/post/${id}`)
  }

  const handleLike = () => {
    let unliked = false
    currentUser?.likes?.forEach((like) => {
      if(like.likeOn == postID) {
        unliked = true
        likeRef.current = false
        likeNum.current = likeNum.current - 1
        axios.put(`https://thrive-server.herokuapp.com/post/unlike/${currentUser.id}/${postID}`).then((response) => setCurrentUser({...currentUser, likes: response.data.user?.likes}))
      }})
    if(unliked == false) {
      likeNum.current = likeNum.current + 1
      axios.put(`https://thrive-server.herokuapp.com/post/like/${postID}/${currentUser.id}/${posterID}`).then((response) => setCurrentUser({...currentUser, likes: response.data.user?.likes}))
    }

  }
  
  const handleAddResource = () => {
    let filter = sourced.filter((resource) => resource.UserID == currentUser.id)
    let unsourced = false
    const link = {'link':`http://127.0.0.1:5173/post/${postID}`}
      if(filter.length > 0) {
        unsourced = true
        resourcesNum.current = resourcesNum.current - 1
        axios.delete(`https://thrive-server.herokuapp.com/user/deleteresource/${currentUser.id}/${filter[0]._id}`)
        .then(response => {
          setCurrentUser({...currentUser, resources: response.data.user?.resources})
        }).catch(err => console.log(err))
      }
    if(unsourced == false) {
      resourcesNum.current = resourcesNum.current + 1
    axios.put(`https://thrive-server.herokuapp.com/post/resource/${postID}/${currentUser.id}/${posterID}`, link )
    .then(response => {
      setCurrentUser({...currentUser, resources: response.data.user?.resources})
    }).catch(err => console.log(err))
  }
  }

  const handleBookmark = () => {
    let unbookmarked = false
    currentUser?.bookmarks?.forEach((bookmark) => {
      if(bookmark.post == postID) {
        unbookmarked = true
        bookmarkRef.current = false
        bookmarkNum.current = bookmarkNum.current - 1
        axios.put(`https://thrive-server.herokuapp.com/post/removebookmark/${postID}/${currentUser.id}`).then((response) => setCurrentUser({...currentUser, bookmarks: response.data.user?.bookmarks}))
      }})
    if(unbookmarked == false) {
      bookmarkNum.current = bookmarkNum.current + 1
      axios.put(`https://thrive-server.herokuapp.com/post/bookmark/${postID}/${currentUser.id}/${posterID}`).then((response) => setCurrentUser({...currentUser, bookmarks: response.data.user?.bookmarks}))
    }
  }

  const handleUnfollow = (id) => {
    axios.put(`https://thrive-server.herokuapp.com/user/unfollow/${id}/${currentUser.id}/`)
  }

  const handleFollow = (id) => {
    axios.put(`https://thrive-server.herokuapp.com/user/follow/${id}/${currentUser.id}/`).then(response => {
      setCurrentUser({...currentUser, following:[...response.data.user.following]})
    })
  }

  return (
    <>
    <div className='bg-white border-gray-400 border-[1px] h-fit z-10'>
    <div className='flex w-[100%] gap-2 m-5'>
    <img src={pfp?.pfp? pfp.pfp: pfp} onClick={(e) => posterID == currentUser.id? navigate('/profile') : navigate(`/profile/${posterID}`)} className='border-black border-[1px] h-16 w-16 rounded-[50%]'/>    
    <div>
      <div className='flex gap-2'>
    <h2 onClick={(e) => posterID == currentUser.id? navigate('/profile') : navigate(`/profile/${posterID}`)} className='font-bold'>{username? username: null}</h2>
    {currentUser? currentUser.following.includes(posterID) || posterID == currentUser.id? null: <div onClick={() => handleFollow(posterID)} className='cursor-pointer shadow-xl font-bold text-white p-1 rounded-xl bg-blue-400'>follow</div> :null }
    {niche? niche == "false"? null: <h2 className={`font-semibold ${niche=="Math"?'bg-blue-300':niche == 'Engineering'? 'bg-orange-300': niche=="Science"? "bg-purple-300":niche=="Data"? "bg-red-400": 'bg-yellow-200'} rounded-xl text-sm p-1 text-center shadow-xl`}>{niche}</h2> : null}
    {subNiche? subNiche == "false"? null: <h2 className='font-semibold bg-green-300 rounded-xl text-sm p-1 text-center shadow-xl'>{subNiche}</h2> : null}
      </div>
    <h2 onClick={(e) => posterID == currentUser.id? navigate('/profile') : navigate(`/profile/${posterID}`)} className='font-semibold'>@{displayName? displayName: null}</h2>
    
    </div>
    <div className='flex flex-col ml-auto items-center mr-8 gap-2 '>
      <div><BsThreeDots /></div>
      <div onClick={()=> handleUnfollow(posterID)}>{currentFeed? currentFeed == "following"? <div className=' cursor-pointer font-bold text-white p-1 rounded-xl bg-blue-400'>unfollow</div>:null:null }</div>
      </div>
    </div>
    
    <div className="px-4 cursor-pointer" onClick={() => nav(postID) }>{content}</div>
    {image? <img src={image} className="w-[70%] mx-auto"/> : null}

    {currentFeed? null : 
    <div className='flex pl-4 gap-10 mt-4 mb-1 border-t-[1px] border-t-gray-200'>
    <div className='flex gap-2 text-xl'>
    <div className='mt-1 cursor-pointer' onClick={handleLike}>
  
    {currentUser?.likes?.map((like, index) => {
      if(like.likeOn == postID) {
        likeRef.current = true
        return <AiFillHeart/>
      } else if(index == currentUser.likes.length - 1 && likeRef.current == false) {
        return <AiOutlineHeart/>
      }
    })}
      
      {currentUser?.likes?.length == 0? <AiOutlineHeart/>: null}
    </div>
    <div className='text-sm' onClick={handleLike}> {likeNum.current}</div>
    </div>
    <div onClick={() => nav(postID)} className='flex gap-2 text-xl'>
    <div className='mt-1 cursor-pointer'><FaRegCommentDots/></div>
    <div className='text-sm'>{commentsNum.current}</div>
    </div>
    <div className='flex gap-2 text-xl'>
    <div className='mt-1 cursor-pointer' onClick={handleAddResource}><GrResources/></div>
    <div className='text-sm'>{resourcesNum.current}</div>
    </div>
    <div className='flex relative gap-2 text-xl'>
    <div className='mt-1 cursor-pointer' onClick={handleBookmark}>    
    {currentUser?.bookmarks?.map((bookmark, index) => {
      if(bookmark.post == postID) {
        bookmarkRef.current = true
        return <BsFillBookmarkFill/>
      } else if(index == currentUser.bookmarks.length - 1 && bookmarkRef.current == false) {
        return <BsBookmark/>
      }
    })}
    {currentUser?.bookmarks?.length == 0? <BsBookmark/>: null}
    </div>
    <div className='text-sm'>{bookmarkNum.current}</div>
    </div>
    </div>
    }
    </div>


  
  
  </>
  )
}

export default Post