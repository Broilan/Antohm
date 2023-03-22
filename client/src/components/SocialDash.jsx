import React, {useContext, useEffect, useState, } from 'react'
import axios from 'axios'
import { DataContext } from '../App'
import {Post, Usercard, UserGroups, Modal} from './'
import handleFile from '../utils/FileUpload'
import { AiFillGithub, AiFillLinkedin  } from 'react-icons/ai';
import { RiTwitterFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { BiCamera } from 'react-icons/bi';

const SocialDash = () => {
  const {currentUser, open, setOpen} = useContext(DataContext)
  const [posts, setPosts] = useState()
  const [userHeader, setUserHeader] = useState(currentUser.header)
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
      <Modal component={<EditProfileModal/>}/>
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
    <input type="file" id="file-input" className='z-[-1] absolute' onChange={(e) => handleFile({"type": "header", "e": e, "userid": currentUser.id })} />
    <label htmlFor="file-input"><img src={userHeader} className='bg-gray-300 w-[100%] h-[8rem] cursor-pointer object-cover'/></label>
    

    <div className='bg-white h-[12rem] flex flex-col justify-end'>
      <div className='flex mb-24 ml-4 gap-2 cursor-pointer'>

      <label htmlFor="file-input"><img src={userPfp} className='bg-white border-[1px] border-black cursor-pointer mt-4 rounded-[50%]  w-24 h-24'/></label>
      <input type="file" id="file-input" className='z-[-1] absolute' onChange={(e) => handleFile({"type": "pfp", "e": e, "userid": currentUser.id })} />

      <div className='flex mt-12 gap-3 items-center'>
      <div className='font-bold  text-2xl'>{currentUser.name} <br /> <p className='font-bold ml-1 text-lg'>@{currentUser.displayName}</p> </div>
      <div onClick={() => setOpen(true)} className='bg-white rounded-3xl hover:bg-gray-300 border-blue-400 border-4 p-2 font-bold h-fit w-fit'>Edit Profile</div>
      </div>
      </div>

    <ul className='flex gap-10 justify-center text-xl border-black border-2'>
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


const EditProfileModal = () => {
  const {currentUser, open, setOpen} = useContext(DataContext)

  return(
    <>
    <div className='relative bg-white rounded-2xl border-gray-300 scale-[1.2] border-[1px] w-[18rem] h-fit'>

    <label htmlFor="header-input" className='cursor-pointer'><img src={currentUser.header} className='w-[100%] object-cover opacity-80 rounded-2xl h-16  rounded-br-none rounded-bl-none border-gray-400 border-b-black border-b-[1px]'/><div className='mt-[-3rem] mb-5 absolute ml-[1.2rem] text-2xl'><BiCamera/></div></label>
    <input type="file" id="header-input" className='hidden' onChange={(e) => handleFile({"type": "pfp", "e": e, "userid": currentUser.id })} />

    <div className='flex flex-col items-center gap-1 justify-center mt-[-3.5rem]'>
        <label htmlFor="pfp-input" className='cursor-pointer'><img src={currentUser.pfp} className=' rounded-[50%] opacity-80 outline outline-1 w-16 mt-5 mb-3'/><div className='mt-[-3rem] mb-5 absolute ml-[1.2rem] text-2xl'><BiCamera/></div></label>
        <input type="file" id="pfp-input" className='hidden' onChange={(e) => handleFile({"type": "pfp", "e": e, "userid": currentUser.id })} />
        <p className='font-bold text-xl underline'>Personal Info</p>
        <label className='font-bold' htmlFor="name-input">Name</label>
        <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser.name}/>
        <label className='font-bold' htmlFor="email-input">Email</label>
        <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser.email}/>
        <label className='font-bold' htmlFor="password-input">Password</label>
        <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue="*********"/>

        <label className='font-bold' htmlFor="bio">Bio</label>
        <input type="text" className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' id='bio' defaultValue="essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with" />

            <div className='flex flex-col items-center gap-3 border-t-black border-t-2 w-[100%] mt-2'>
            <p className='font-bold text-xl underline'>Public Links</p>
            <div className='flex flex-col items-center'>
            <div><AiFillGithub /> </div>
            <label className='font-bold' htmlFor="password-input">Github</label>
            <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue="*********"/>
            </div>

            <div className='flex flex-col items-center'>
            <div><RiTwitterFill /> </div>
            <label className='font-bold' htmlFor="password-input">Twitter</label>
            <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue="*********"/>
            </div>

            <div className='flex flex-col items-center'>
            <div><AiFillLinkedin /> </div>
            <label className='font-bold' htmlFor="password-input">LinkedIn</label>
            <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue="*********"/>
            </div>

            <div className='flex flex-col items-center'>
            <div><FaClipboardList /> </div>
            <label className='font-bold' htmlFor="password-input">Resume</label>
            <input className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue="*********"/>
            </div>
            </div>
            <div className='flex font-bold text-md border-t-black border-t-2 w-[100%] justify-center mt-2'>
            <button onClick={() => setOpen(false)} className='bg-red-300 rounded-bl-2xl hover:bg-red-400 w-[50%]'>Discard Changes</button>
            <button className='bg-blue-300 rounded-br-2xl hover:bg-blue-400 w-[50%]'>Save Changes</button>
            </div>
      </div>
    </div>
    </>
  )

}