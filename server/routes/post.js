const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.get('/', ctrls.post.getAllPosts) //making a post
router.get('/:id', ctrls.post.getAPost) //getting a post
router.get('/comments/:id', ctrls.post.getPostComments) //getting post comments
router.put('/:userid', ctrls.post.makeAPost) //making a post
router.put('/like/:postid/:by/:to', ctrls.post.likeAPost) //liking a post
//unliking a post
router.put('/unlike/:id/:postId', ctrls.post.unlikeAPost) //unliking a post
router.put('/comment/:postid/:by/:to', ctrls.post.commentOnAPost) //commenting on a post
router.put('/bookmark/:postid/:by/:to', ctrls.post.bookmarkAPost) //bookmarking a post
router.put('/resource/:postid/:by/:to', ctrls.post.makePostAResource) //making a post a resource
router.delete('/:postid', ctrls.post.deleteAPost) //deleting a post

module.exports = router;