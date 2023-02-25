const User = require('../models/User')
const Post = require('../models/Post')
const Like = require('../models/Like')
const Resource = require('../models/Resource')
const Comment = require('../models/Comment')
const Notification = require('../models/Notification')
const Bookmark = require('../models/Bookmark')

require('dotenv').config();

const getAllPosts = (req, res) => {
    Post.find({}).then(response => {
        res.json({allPosts: response})
    })
}

const makeAPost = (req, res) => {
    Post.create({   
    UserID: req.params.userid,
    content: req.body.content,
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
            res.json({response: response})
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
    makePostAResource,
    getAllPosts,
    makeAPost,
    likeAPost,
    commentOnAPost,
    bookmarkAPost,
    deleteAPost
};