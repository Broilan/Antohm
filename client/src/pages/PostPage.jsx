import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Usercard, UserGroups, News } from '../components'

import { Post, Comment} from '../components'

const PostPage = () => {
    const [foundPost, setFoundPost] = useState()
    const [foundComments, setFoundComments] = useState()
    const params = useParams()
    

    useEffect(() => {
        axios.get(`http://localhost:8000/post/${params.id}`)
            .then(response=> {
                setFoundPost(response.data.post)
            axios.get(`http://localhost:8000/post/comments/${params.id}`)
            .then(response => {
            setFoundComments(response.data.comments)
            })
            }
        )
    }, [])

  return (
    <>
     <div className='flex flex-col ml-[15%] top-[10%] fixed gap-4' >

        <div >
            <Usercard />
        </div>

        <div >
            <UserGroups />
        </div>
    </div>

    <div className='w-screen flex flex-col items-center'>
        <div className='w-[33%]'>
        <div className='border-gray-500 border-[1px] bg-dimWhite font-bold text-center'>Post</div>
        {foundPost? <Post postID={params.id} username={foundPost.UserID.name} displayName={foundPost.UserID.displayName} bookmarks={foundPost.bookmarks} comments={foundPost.comments} likes={foundPost.likes} datePosted={foundPost.date} content={foundPost.content} sourced={foundPost.sourced} /> :null }
        <div className='border-gray-500 border-[1px] bg-dimWhite font-bold text-center'>Comments</div>
        {foundComments?.map((c) => <Comment from={c.commentFrom} to={c.commentTo} comments={c.comments} content={c.content} likes={c.likes} postID={c.postID} /> )}
        </div>
    </div>
   
    
    </>
  )
}

export default PostPage
