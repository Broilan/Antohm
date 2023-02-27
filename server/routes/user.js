const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');


router.post('/signup', ctrls.user.userSignup)
router.post('/login', ctrls.user.userLogin)
router.get('/:name', ctrls.user.getUsers);
router.get('/resources/:UserID', ctrls.user.getUserResources);
router.get('/tasks/:name', ctrls.user.getTasks);
router.get('/taskcomments/:id', ctrls.user.taskComments);
router.get('/jobs/:name', ctrls.user.userJobs);
router.put('/postjob/:name', ctrls.user.postJob);
router.put('/:name/createtask', ctrls.user.postTask);
router.put('/task/:id/update', ctrls.user.updateTaskIntent);
router.put('/comment/task/:postID', ctrls.user.postTaskComment);
router.put('/:id/update', ctrls.user.updatePersonalInfo);
router.delete('/:id/delete', ctrls.user.deleteUser);
router.delete('/delete/task/:id', ctrls.user.deleteTask);
router.delete('/delete/comment/:id', ctrls.user.deleteTaskComment);

module.exports = router;