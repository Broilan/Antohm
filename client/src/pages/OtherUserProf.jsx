import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../App'
import {Post} from '../components'
import OtherUserCard from '../components/OtherUserCard'

const OtherUserProf = () => {
  const {mOpen, setMOpen, currentUser, setCurrentUser} = useContext(DataContext)
  const [posts, setPosts] = useState()
    const [otherUser, setOtherUser] = useState()

    const params = useParams()
    const userID = params.userid    


    useEffect(() => {
        axios.get(`https://thrive-server.herokuapp.com/user/${userID}/posts`)
       .then(response => {
        setPosts(response.data.usersPosts.map((p) =>  <Post postID={p._id} niche={p.niche} subNiche={p.subNiche} posterID={p.UserID._id} pfp={p.UserID.pfp} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
       })
       axios.get(`https://thrive-server.herokuapp.com/user/${userID}`)
       .then(response => {
        setOtherUser(response.data.foundUser)
       })
    }, [currentUser])
  
    const handleUnfollow = (id) => {
      axios.put(`https://thrive-server.herokuapp.com/user/unfollow/${id}/${currentUser.id}/`).then(response => {
        setCurrentUser({...currentUser, following:[...response.data.user.following]})
      }).catch(err => console.log(err))
    }
  
    const handleFollow = (id) => {
      axios.put(`https://thrive-server.herokuapp.com/user/follow/${id}/${currentUser.id}/`).then(response => {
        setCurrentUser({...currentUser, following:[...response.data.user.following]})
      }).catch(err => console.log(err))
    }

    function changeFeed(current) {
      switch (current) {
        case 'posts': 
        axios.get(`https://thrive-server.herokuapp.com/user/${userID}/posts`)
       .then(response => {
        setPosts(response.data.usersPosts.map((p) =>  <Post postID={p._id} niche={p.niche} subNiche={p.subNiche} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
       })
       break;
  
        case 'likes':
          axios.get(`https://thrive-server.herokuapp.com/user/${userID}/likes`)
          .then(response => {
           setPosts(response.data.usersLikes?.map((p) =>  <Post niche={p.niche} subNiche={p.subNiche} postID={p.likeOn._id} posterID={p.likeTo._id} username={p.likeTo.name} displayName={p.likeTo.displayName} bookmarks={p.likeOn.bookmarks} comments={p.likeOn.comments} likes={p.likeOn.likes} datePosted={p.likeOn.date} content={p.likeOn.content} sourced={p.likeOn.sourced}    /> ))
          })
          break;
  
        case 'comments':
          axios.get(`https://thrive-server.herokuapp.com/user/${userID}/comments`)
          .then(response => {
            setPosts(response.data.usersComments?.map((p) =>  <Post postID={p._id} posterID={p.commentFrom._id} username={p.commentFrom.name} displayName={p.commentFrom.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.postID.date} content={p.content} sourced={p.sourced}    /> ))
          })
          break;
    }
  }
  
  
    return (
      <>
  
  <div className='flex flex-col ml-[15%] top-[10%] fixed gap-4 2xl:ml-[10%] 1.5xl:ml-[5%] lg:hidden' >
            <OtherUserCard otherUser={otherUser}/>
        </div>
      
        <div className='flex flex-col justify-center text-center lg:w-screen'>
        
        <div className='mx-auto w-[35%] border-gray-400 border-[1px] lg:w-screen '>
        <body className='overflow-y-scroll scrollbar-hide'>
      <img src={otherUser?.header} className='bg-gray-300 w-[100%] h-[8rem] cursor-pointer object-cover'/>
  
      <div className='bg-white h-[12rem] flex flex-col justify-end'>

        <div className='flex flex-col justify-end gap-4 ml-4'>
        <div className='flex items-end'>
        <img src={otherUser?.pfp} className='bg-white border-[1px] border-black rounded-[50%] w-24 h-24'/>
        <div className='flex gap-2'>
        <div className=' font-bold'>{otherUser?.name} <br /> <p className='font-normal ml-1 text-[0.9rem]'>@{otherUser?.displayName}</p> </div>
        <div className='flex gap-2 h-8'>
          {currentUser?.following?.includes(otherUser?._id) ?
           <div className="bg-blue-300 rounded-xl p-1 font-bold text-white shadow-xl cursor-pointer" onClick={() => handleUnfollow(otherUser?._id)}>Unfollow</div>
           :
            <div className="bg-blue-300 rounded-xl p-1 font-bold text-white shadow-xl cursor-pointer" onClick={() => handleFollow(otherUser?._id)}>Follow</div>
           }
        
        <div className="bg-blue-300 rounded-xl p-1 font-bold text-white shadow-xl cursor-pointer" onClick={() => setMOpen(otherUser)}>Message</div>
        </div>
        </div>
        
        </div>
        
        <div className='text-left w-[30rem] h-[5rem] mt-2 text-lg'>{otherUser?.bio ?? null}</div>
        
        </div>
     <ul className='flex gap-10 justify-center text-xl'>
        <li className="cursor-pointer" onClick={(e) => changeFeed('posts')}>Posts</li>
        <li className="cursor-pointer" onClick={(e) => changeFeed('likes')}>Likes</li>
        <li className="cursor-pointer" onClick={(e) => changeFeed('comments')}>Comments</li>
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

