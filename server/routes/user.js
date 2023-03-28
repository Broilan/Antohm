const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.post('/signup', ctrls.user.userSignup)
router.post('/login', ctrls.user.userLogin)
router.get('/:id', ctrls.user.getUsers);
router.get('/:id/posts', ctrls.user.getAUsersPosts);
router.get('/resources/:UserID', ctrls.user.getUserResources);
router.get('/tasks/:id', ctrls.user.getTasks);
router.get('/dms/:to', ctrls.user.getUsersDms);
router.get('/specdm/:from/:to', ctrls.user.getSpecificDms);
router.get('/', ctrls.user.getAllUsers);

router.get('/:id/notifications', ctrls.user.getUsersNotifs);
router.get('/:id/likes', ctrls.user.getAUsersLikes);
router.get('/:id/comments', ctrls.user.getAUsersComments);
router.get('/:id/bookmarks', ctrls.user.getAUsersBookmarks);

router.get('/taskcomments/:id', ctrls.user.taskComments);
router.get('/jobspopulated/:id', ctrls.user.getUserWithJobDataPopulated);
router.get('/:id/following', ctrls.user.getAUsersFollowing);
router.get('/nopop/:id/following', ctrls.user.getAUsersFollowingNoPopulate);
router.get('/:id/followers', ctrls.user.getAUsersFollowers);
router.get('/jobs/:name', ctrls.user.userJobs);
router.put('/postjob/:name', ctrls.user.postJob);
router.put('/follow/:to/:from', ctrls.user.followAUser);
router.put('/unfollow/:to/:from', ctrls.user.unfollowAUser);
router.put('/:id/createtask', ctrls.user.postTask);
router.put('/task/:id/update', ctrls.user.updateTaskIntent);
router.put('/tasknote/:userID/:taskID', ctrls.user.putNoteOnTask);
router.put('/updatejobs/:userID/:jobID', ctrls.user.updateUserJobData);
router.put('/:id/update', ctrls.user.updatePersonalInfo);
router.delete('/:id/delete', ctrls.user.deleteUser);
router.delete('/deletetask/:userID/:taskID', ctrls.user.deleteTask);
router.delete('/delete/comment/:id', ctrls.user.deleteTaskComment);
//delete route for task notes
router.delete('/deletenote/:userID/:taskID/:noteID', ctrls.user.deleteNoteFromTask);
//route for updating a task status
router.put('/task/status/:taskId', ctrls.user.updateTaskStatus);

//date routes
router.get('/dates/:id', ctrls.user.getUsersSavedDates);
//create a date for a user 
router.put('/date/:id', ctrls.user.createNewDate);
//update a date note for a user
router.put('/date/:id/:noteId', ctrls.user.updateNote);
//delete a date for a user
router.delete('/date/:id/:dateId/delete', ctrls.user.deleteDate);
//add a note to a date for a user
router.put('/adddatenote/:id/:dateId', ctrls.user.addNoteToDate);
//delete a note from a date for a user
router.delete('/deletedatenote/:id/:dateId/:noteId', ctrls.user.deleteNoteFromDate);

//archive routes
router.put('/archive/:id/:itemId', ctrls.user.archiveItem);
module.exports = router;