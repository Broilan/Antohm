const User = require('../models/User')
const Post = require('../models/Post')
const Like = require('../models/Like')
const Resource = require('../models/Resource')
const Comment = require('../models/Comment')
const Notification = require('../models/Notification')
const Bookmark = require('../models/Bookmark')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

require('dotenv').config();

const getAllPosts = (req, res) => {
    Post.find({}).populate('UserID').then(response => {
        res.json({allPosts: response})
    })
}

const getAPost = (req, res) => {
    Post.findById(req.params.id)
    .populate('UserID')
    .populate('comments')
    .populate('likes')
    .populate('bookmarks')
    .populate('sourced')
    .then(response => {
        res.json({post: response})
    })
}

const getPostComments = (req, res) => {
    Comment.find({postID: req.params.id})
    .populate('commentFrom')
    .populate('commentTo')
    .populate('comments')
    .populate('likes')
    .then(response => {
        res.json({comments: response})
    })
}

const makeAPost = async (req, res) => {
    const photoUrl = req.body.image? await cloudinary.uploader.upload(req.body.image):null
    console.log(photoUrl)
    Post.create({   
    UserID: req.params.userid,
    content: req.body.content,
    image: photoUrl?.url,
    niche: req.body.niche? req.body.niche: false,
    subNiche: req.body.subNiche? req.body.subNiche: false,
    likes: [],
    comments: [],
    bookmarks: [],  
    })
    .then(newPost => {
        User.findById(req.params.userid)
        .then(foundUser => {
            userPosts = foundUser.posts
            userPosts.push(newPost._id)
        User.findByIdAndUpdate(req.params.userid, {
            posts: userPosts
        })
        .then(response => {
            res.json({response: newPost})
        })
        })
    })
}

const likeAPost = (req, res) => {
    Like.create({   
    likeBy: req.params.by,
    likeTo: req.params.to,
    likeOn: req.params.postid
    })
    .then(newLike => {
        Notification.create({
            from: req.params.by,
            to: req.params.to,
            likeCommentOrFollow: "Like",
            content: `liked your post!`,
            postID: req.params.postid,
            viewed: false
        })
        .then(newNotif => {
            User.findById(req.params.to)
            .then(foundUser => {
                userNotifs = foundUser.notifications
                userNotifs.push(newNotif._id)
            User.findByIdAndUpdate(req.params.to, {
                notifications: userNotifs
            })
            .then(responsex => {
                User.findById(req.params.by)
                .then(foundUserY => {
                    userLikes = foundUser.likes
                    userLikes.push(newLike._id)
                        User.findByIdAndUpdate(req.params.by, {
                            likes: userLikes
                        })
                        .then(responsey => {
                            Post.findById(req.params.postid)
                            .then(foundPost => {
                                postLikes = foundPost.likes
                                postLikes.push(newLike._id)
                            Post.findByIdAndUpdate(req.params.postid, {
                                likes: postLikes
                            })
                            .then(response => {
                                res.json({response: response})
                            })
                            })
                        })
                })
            })
            })

        })

    })
}

const commentOnAPost = (req, res) => {

    Comment.create({   
    commentTo: req.params.to,
    commentFrom: req.params.by,
    likeCommentOrFollow: "Comment",
    content: req.body.content,
    likes: [],
    comments: [],
    postID: req.params.postid
    })
    .then(newComment => {
        Notification.create({
            from: req.params.by,
            to: req.params.to,
            likeCommentOrFollow: "Comment",
            content: req.body.content,
            postID: req.params.postid,
            viewed: false
        })
        .then(newNotif => {
            User.findById(req.params.to)
            .then(foundUser => {
                userNotifs = foundUser.notifications
                userNotifs.push(newNotif._id)
            User.findByIdAndUpdate(req.params.to, {
                notifications: userNotifs
            })
            .then(responsex => {
                User.findById(req.params.by)
                .then(foundUserY => {
                    userComments = foundUser.comments
                    userComments.push(newComment._id)
                        User.findByIdAndUpdate(req.params.by, {
                            comments: userComments
                        })
                        .then(responsey => {
                            Post.findById(req.params.postid)
                            .then(foundPost => {
                                postComments = foundPost.comments
                                console.log("userlikess", postComments)
                                postComments.push(newComment._id)
                            Post.findByIdAndUpdate(req.params.postid, {
                                comments: postComments
                            })
                            .then(response => {
                                res.json({response: response})
                            })
                            })
                        })
                })
            })
            })

        })

    })
}

const bookmarkAPost = (req, res) => {
    Bookmark.create({   
    bookmarkTo: req.params.to,
    bookmarkFrom: req.params.by,
    post: req.params.postid
    })
    .then(newBookmark => {
        Notification.create({
            from: req.params.by,
            to: req.params.to,
            likeCommentOrFollow: "Bookmark",
            content: "bookmarked your post!",
            postID: req.params.postid,
            viewed: false
        })
        .then(newNotif => {
            User.findById(req.params.to)
            .then(foundUser => {
                userNotifs = foundUser.notifications
                userNotifs.push(newNotif._id)
            User.findByIdAndUpdate(req.params.to, {
                notifications: userNotifs
            })
            .then(responsex => {
                User.findById(req.params.by)
                .then(foundUserY => {
                    userBookmarks = foundUser.bookmarks
                    userBookmarks.push(newBookmark._id)
                        User.findByIdAndUpdate(req.params.by, {
                            bookmarks: userBookmarks
                        })
                        .then(responsey => {
                            Post.findById(req.params.postid)
                            .then(foundPost => {
                                postBookmarks = foundPost.bookmarks
                                postBookmarks.push(newBookmark._id)
                            Post.findByIdAndUpdate(req.params.postid, {
                                bookmarks: postBookmarks
                            })
                            .then(response => {
                                res.json({response: response})
                            })
                            })
                        })
                })
            })
            })

        })

    })
}

const makePostAResource = (req, res) => {
    Resource.create({   
    resourceBy: req.params.to,
    UserID: req.params.by,
    archived: false,
    linkTo: req.body.link,
    resourceType: "add a type!",
    post: req.params.postid,
    })
    .then(newResource => {
        Notification.create({
            from: req.params.by,
            to: req.params.to,
            likeCommentOrFollow: "Resource",
            content: "added your post as a resource!",
            postID: req.params.postid,
            viewed: false
        })
        .then(newNotif => {
            User.findById(req.params.to)
            .then(foundUser => {
                userNotifs = foundUser.notifications
                userNotifs.push(newNotif._id)
            User.findByIdAndUpdate(req.params.to, {
                notifications: userNotifs
            })
            .then(responsex => {
                User.findById(req.params.by)
                .then(foundUserY => {
                    userResources = foundUser.resources
                    userResources.push(newResource._id)
                        User.findByIdAndUpdate(req.params.by, {
                            resources: userResources
                        })
                        .then(responsey => {
                            Post.findById(req.params.postid)
                            .then(foundPost => {
                                postResources = foundPost.sourced
                                postResources.push(newResource._id)
                            Post.findByIdAndUpdate(req.params.postid, {
                                sourced: postResources
                            })
                            .then(response => {
                                res.json({response: response})
                            })
                            })
                        })
                })
            })
            })

        })

    })
}

const deleteAPost = (req, res) => {
    Post.findByIdAndDelete(req.params.postid)
}











module.exports = { 
    getPostComments,
    makePostAResource,
    getAllPosts,
    getAPost,
    makeAPost,
    likeAPost,
    commentOnAPost,
    bookmarkAPost,
    deleteAPost
};
