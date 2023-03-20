import React, {useContext, useEffect, useState, } from 'react'
import axios from 'axios'
import { DataContext } from '../App'
import {Post, Usercard, UserGroups} from './'
import handleFile from '../utils/FileUpload'
import { FcPlus } from 'react-icons/fc';

const SocialDash = () => {
  const {currentUser} = useContext(DataContext)
  const [posts, setPosts] = useState()
  const [userPfp, setUserPfp] = useState(currentUser.pfp)
  
  useEffect(() => {
    axios.get(`http://localhost:8000/user/${currentUser?.id}`)
    .then(response => {
      setUserPfp(response.data.foundUser.pfp)
    }).catch(err => console.log(err))
      axios.get(`http://localhost:8000/user/${currentUser?.id}/posts`)
     .then(response => {
      setPosts(response.data.usersPosts.reverse().map((p) =>  <Post niche={p.niche} subNiche={p.subNiche} pfp={currentUser.pfp} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
     }).catch(err => console.log(err))
  }, [])

  function changeFeed(current) {
    switch (current) {
      case 'posts': 
      axios.get(`http://localhost:8000/user/${currentUser?.id}/posts`)
     .then(response => {
      setPosts(response.data.usersPosts.reverse().map((p) =>  <Post niche={p.niche} subNiche={p.subNiche} pfp={currentUser.pfp} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
     }).catch(err => console.log(err))
     break;

      case 'likes':
        axios.get(`http://localhost:8000/user/${currentUser?.id}/likes`)
        .then(response => {
          console.log(response.data.usersLikes)
         setPosts(response.data.usersLikes.reverse()?.map((p) =>  <Post niche={p.niche} subNiche={p.subNiche} pfp={p.likeTo.pfp} image={p.image} postID={p.likeOn._id} posterID={p.likeTo._id} username={p.likeTo.name} displayName={p.likeTo.displayName} bookmarks={p.likeOn.bookmarks} comments={p.likeOn.comments} likes={p.likeOn.likes} datePosted={p.likeOn.date} content={p.likeOn.content} sourced={p.likeOn.sourced}    /> ))
        }).catch(err => console.log(err))
        break;

      case 'comments':
        axios.get(`http://localhost:8000/user/${currentUser?.id}/comments`)
        .then(response => {
          setPosts(response.data.usersComments.reverse()?.map((p) =>  <Post niche={p.niche} subNiche={p.subNiche} pfp={p.commentTo.pfp} image={p.image} postID={p._id} posterID={p.commentFrom._id} username={p.commentFrom.name} displayName={p.commentFrom.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.postID.date} content={p.content} sourced={p.sourced}    /> ))
        }).catch(err => console.log(err))
        break;

      case 'bookmarks':
        axios.get(`http://localhost:8000/user/${currentUser?.id}/bookmarks`)
        .then(response => {
          setPosts(response.data.usersBookmarks.reverse()?.map((p) =>  <Post niche={p.niche} subNiche={p.subNiche} pfp={p.bookmarkTo.pfp} image={p.image} postID={p.post._id} posterID={p.bookmarkTo._id} username={p.bookmarkTo.name} displayName={p.bookmarkTo.displayName} bookmarks={p.post.bookmarks} comments={p.post.comments} likes={p.post.likes} datePosted={p.post.date} content={p.post.content} sourced={p.post.sourced}    /> ))
        }).catch(err => console.log(err))
        break;
      case 'following':
        axios.get(`http://localhost:8000/user/${currentUser?.id}/following`)
        .then(response => {
          console.log(response.data.usersFollowing.following)
          setPosts(response.data.usersFollowing.following.reverse()?.map((p) =>  <Post pfp={p.pfp} username={p.name} displayName={p.displayName} posterID={p._id} currentFeed={'following'} /> ))
        }).catch(err => console.log(err))
        break;
      case 'followers':
        axios.get(`http://localhost:8000/user/${currentUser?.id}/followers`)
        .then(response => {
          console.log(response.data.usersFollowers.followers)
          setPosts(response.data.usersFollowers.followers.reverse()?.map((p) =>  <Post pfp={p.pfp} username={p.name} displayName={p.displayName} posterID={p._id} currentFeed={'followers'} /> ))
          }).catch(err => console.log(err))
          break;
  }
}


  return (
    <>

      <div className='flex flex-col left-[15%] top-[10%] fixed gap-32' >

      <div >
          <Usercard />
      </div>

      <div >
          <UserGroups />
      </div>

      </div>
    
    <div className='flex flex-col justify-center text-center'>
      
    <div className='mx-auto w-[35%] '>
      <body className='overflow-y-scroll scrollbar-hide'>
    <div className='bg-gray-300 h-[8rem]'>hi</div>

    <div className='bg-white h-[12rem] flex flex-col justify-end'>

      <div className='flex gap-4 mb-24 ml-4 cursor-pointer' >
      
      <img  src={userPfp}  className='bg-white border-[1px] border-black rounded-[50%]  w-24 h-24'/>
      <label htmlFor="file-input" className='cursor-pointer text-lg ml-[-2rem] mt-2'><FcPlus /> </label>
      <input type="file" id="file-input" className='z-[-1]' onChange={(e) => handleFile({"type": "pfp", "e": e, "userid": currentUser.id })} />
      <div className=' font-bold mt-16'>{currentUser.name} <br /> <p className='font-normal ml-1 text-[0.9rem]'>@{currentUser.displayName}</p> </div>
      </div>

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
    </body>
    </div>

    </div>
   
  </>
  )
}

export default SocialDash