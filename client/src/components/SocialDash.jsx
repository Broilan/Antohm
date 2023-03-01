import React, {useContext, useEffect, useState, } from 'react'
import axios from 'axios'
import { DataContext } from '../App'
import {Post, Usercard, UserGroups} from './'

const SocialDash = () => {
  const {currentUser} = useContext(DataContext)
  const [posts, setPosts] = useState()
  console.log(currentUser)
  
  // useEffect(() => {
  //     axios.get(`http://localhost:8000/user/${currentUser.id}/posts`)
  //    .then(response => {
  //     setPosts(response.data.usersPosts)
  //    })
  // }, [])

  function changeFeed(current) {
    switch (current) {
      case 'posts': 
      axios.get(`http://localhost:8000/user/${currentUser.id}/posts`)
     .then(response => {
      setPosts(response.data.usersPosts.map((p) =>  <Post postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
     })
     break;

      case 'likes':
        axios.get(`http://localhost:8000/user/${currentUser.id}/likes`)
        .then(response => {
          console.log(response.data.usersLikes)
         setPosts(response.data.usersLikes?.map((p) =>  <Post postID={p.likeOn._id} posterID={p.likeTo._id} username={p.likeTo.name} displayName={p.likeTo.displayName} bookmarks={p.likeOn.bookmarks} comments={p.likeOn.comments} likes={p.likeOn.likes} datePosted={p.likeOn.date} content={p.likeOn.content} sourced={p.likeOn.sourced}    /> ))
        })
        break;

      case 'comments':
        axios.get(`http://localhost:8000/user/${currentUser.id}/comments`)
        .then(response => {
          setPosts(response.data.usersComments?.map((p) =>  <Post postID={p._id} posterID={p.commentFrom._id} username={p.commentFrom.name} displayName={p.commentFrom.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.postID.date} content={p.content} sourced={p.sourced}    /> ))
        })
        break;

      case 'bookmarks':
        axios.get(`http://localhost:8000/user/${currentUser.id}/bookmarks`)
        .then(response => {
          setPosts(response.data.usersBookmarks?.map((p) =>  <Post postID={p.post._id} posterID={p.bookmarkTo._id} username={p.bookmarkTo.name} displayName={p.bookmarkTo.displayName} bookmarks={p.post.bookmarks} comments={p.post.comments} likes={p.post.likes} datePosted={p.post.date} content={p.post.content} sourced={p.post.sourced}    /> ))
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

      <div >
          <UserGroups />
      </div>

      </div>

    <div className='flex flex-col justify-center text-center'>
    <div className='mx-auto w-[50%]'>
    <div className='bg-gray-300 h-[8rem]'>hi</div>

    <div className='bg-white h-[18rem] flex flex-col justify-end'>
      <div className='bg-white absolute ml-4 border-[1px] border-black rounded-[50%] mb-[15rem] w-24 h-24'> pic</div>
      <div className='absolute mb-[10rem] ml-4 font-bold'>{currentUser.name} <br /> <p className='font-normal ml-1 text-[0.9rem]'>@{currentUser.displayName}</p> </div>

    <ul className='flex gap-10 justify-center text-xl'>
      <li className="cursor-pointer" onClick={(e) => changeFeed('posts')}>Posts</li>
      <li className="cursor-pointer" onClick={(e) => changeFeed('likes')}>Likes</li>
      <li className="cursor-pointer" onClick={(e) => changeFeed('comments')}>Comments</li>
      <li className="cursor-pointer" onClick={(e) => changeFeed('bookmarks')}>Bookmarks</li>
      <li className="cursor-pointer" onClick={(e) => changeFeed('followers')}>Followers</li>
      <li className="cursor-pointer" onClick={(e) => changeFeed('following')}>Following</li>
    </ul>
    </div>
    {posts}
    </div>
    </div>
  </>
  )
}

export default SocialDash