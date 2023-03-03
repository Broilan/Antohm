import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../App'
import {Post, Usercard} from '../components'

const OtherUserProf = () => {
    const {currentUser} = useContext(DataContext)
    const [posts, setPosts] = useState()
    const [otherUser, setOtherUser] = useState()

    const params = useParams()
    const userID = params.userid    


    useEffect(() => {
        axios.get(`http://localhost:8000/user/${userID}/posts`)
       .then(response => {
        setPosts(response.data.usersPosts.map((p) =>  <Post postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
       })
       axios.get(`http://localhost:8000/user/${userID}`)
       .then(response => {
        setOtherUser(response.data.foundUser)
       })
    }, [])
  
    function changeFeed(current) {
      switch (current) {
        case 'posts': 
        axios.get(`http://localhost:8000/user/${userID}/posts`)
       .then(response => {
        setPosts(response.data.usersPosts.map((p) =>  <Post postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
       })
       break;
  
        case 'likes':
          axios.get(`http://localhost:8000/user/${userID}/likes`)
          .then(response => {
            console.log(response.data.usersLikes)
           setPosts(response.data.usersLikes?.map((p) =>  <Post postID={p.likeOn._id} posterID={p.likeTo._id} username={p.likeTo.name} displayName={p.likeTo.displayName} bookmarks={p.likeOn.bookmarks} comments={p.likeOn.comments} likes={p.likeOn.likes} datePosted={p.likeOn.date} content={p.likeOn.content} sourced={p.likeOn.sourced}    /> ))
          })
          break;
  
        case 'comments':
          axios.get(`http://localhost:8000/user/${userID}/comments`)
          .then(response => {
            setPosts(response.data.usersComments?.map((p) =>  <Post postID={p._id} posterID={p.commentFrom._id} username={p.commentFrom.name} displayName={p.commentFrom.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.postID.date} content={p.content} sourced={p.sourced}    /> ))
          })
          break;
    }
  }
  
  
    return (
      <>
  
        <div className='flex flex-col right-[5%] top-[10%] fixed gap-4' >
  
        <div >
            <Usercard />
        </div>
  
        </div>
      
      <div className='flex flex-col justify-center text-center'>
        
      <div className='mx-auto w-[35%] '>
        <body className='overflow-y-scroll scrollbar-hide'>
      <div className='bg-gray-300 h-[8rem]'>hi</div>
  
      <div className='bg-white h-[12rem] flex flex-col justify-end'>
  
        <div className='flex gap-4 mb-24 ml-4' >
        <div className='bg-white border-[1px] border-black rounded-[50%]  w-24 h-24'> pic</div>
        <div className=' font-bold mt-16'>{otherUser?.name} <br /> <p className='font-normal ml-1 text-[0.9rem]'>@{otherUser?.displayName}</p> </div>
        </div>
  
      <ul className='flex gap-10 justify-center text-xl'>
        <li className="cursor-pointer" onClick={(e) => changeFeed('posts')}>Posts</li>
        <li className="cursor-pointer" onClick={(e) => changeFeed('likes')}>Likes</li>
        <li className="cursor-pointer" onClick={(e) => changeFeed('comments')}>Comments</li>
        <li className="cursor-pointer" onClick={(e) => changeFeed('followers')}>Followers</li>
        <li className="cursor-pointer" onClick={(e) => changeFeed('following')}>Following</li>
      </ul>
      </div>
      {posts} 
      </body>
      </div>
  
      </div>
     
    </>
    )
  }

export default OtherUserProf