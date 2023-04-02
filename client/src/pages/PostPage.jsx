import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Usercard, CommentForm  } from '../components'
import { Post, Comment} from '../components'
import { DataContext } from '../App'

const PostPage = () => {
    const {currentUser} = useContext(DataContext)
    const [foundPost, setFoundPost] = useState()
    const [foundComments, setFoundComments] = useState()
    const params = useParams()
    

    useEffect(() => {
        axios.get(`https://thrive-server.herokuapp.com/post/${params.id}`)
            .then(response=> {
                setFoundPost(response.data.post)
            axios.get(`https://thrive-server.herokuapp.com/post/comments/${params.id}`)
            .then(response => {
            setFoundComments(response.data.comments)
            })
            }
        )
    }, [currentUser])

  return (
    <>
     <div className='flex flex-col ml-[15%] top-[10%] fixed gap-4' >

        <div >
            <Usercard />
        </div>

    </div>

    <div className='w-screen flex flex-col items-center overflow-y-scroll h-screen'>
        <div className='w-[33%]'>
        <div className='border-gray-500 border-[1px] bg-white font-bold text-center'>Post</div>
        {foundPost? <Post subNiche={foundPost.subNiche} image={foundPost.image} niche={foundPost.niche} pfp={foundPost?.UserID.pfp} postID={params.id} posterID={foundPost.UserID._id} username={foundPost.UserID.name} displayName={foundPost.UserID.displayName} bookmarks={foundPost.bookmarks} comments={foundPost.comments} likes={foundPost.likes} datePosted={foundPost.date} content={foundPost.content} sourced={foundPost.sourced} /> :null }
        <div className='border-gray-500 border-[1px] bg-white font-bold text-center'>Comments</div>
        {foundComments?  <CommentForm postID={params.id} posterID={foundPost.UserID._id} />:null }
        {foundComments?.map((c, index) => <Comment key={index} pfp={c.commentFrom.pfp} from={c.commentFrom} to={c.commentTo} comments={c.comments} content={c.content} likes={c.likes} postID={c.postID} /> )}
        </div>
    </div>
   
    
    </>
  )
}

export default PostPage
