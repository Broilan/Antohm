const User = require('../models/User')
const Resource = require('../models/Resource')
const Post = require('../models/Post')
const Notification = require('../models/Notification')
const Note = require('../models/Note')
const Like = require('../models/Like')
const Bookmark = require('../models/Bookmark')
const Dm = require('../models/Dm')
const DmList = require('../models/DmList')
const Comment = require('../models/Comment')
// const Job = require('../models/Job')
const Task = require('../models/Task')

require('dotenv').config();
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//USER SIGNUP
const userSignup = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            // Create a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                displayName: req.body.displayName,
                pfp: req.body.pfp,
                header: req.body.header,
                password: req.body.password,
            });

            // Salt and hash the password - before saving the user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log('==> Error inside of hash', err);
                    // Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json({ user: createdUser}))
                    .catch(err => {
                        console.log('error with creating new user', err);
                        res.json({ message: 'Error occured... Please try again.'});
                    });
                });
            });
        }
    })
    .catch(err => { 
        console.log('Error finding user', err);
        res.json({ message: 'Error occured... Please try again.'})
    })
};


//USER LOGIN
    const userLogin = async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
        // user is in the DB
        let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        console.log('Do the passwords match?', isMatch);
        if (isMatch) {
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
                displayName: foundUser.displayName,
                name: foundUser.name,
                pfp: foundUser.pfp,
                header: foundUser.header,
                following: foundUser.following
            }

            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    res.status(400).json({ message: 'Session has endedd, please log in again'});
                }
                const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 });
                console.log('===> legit', legit);
                res.json({ success: true, token: `Bearer ${token}`, userData: legit });
            });

        } else {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }
    } else {
        return res.status(400).json({ message: 'User not found' });
    }
};



//GET Users
const getUsers = (req, res) => {
    User.findOne({_id: req.params.id}).populate({path:'archivedDates', populate: {path: 'notes', model: 'Note'}}).populate('likes').populate('bookmarks').populate('resources')
    .then(foundUser => {
        res.json({foundUser: foundUser})
    }).catch(err => res.json({err:err}))
}

const getUserWithJobDataPopulated = (req, res) => {
    User.findOne({_id: req.params.id}).populate('applications').populate('responses').populate('offers').populate('interviews')
    .then(foundUser => {
        res.json({foundUser: foundUser})
    }).catch(err => res.json({err:err}))
}

//GET a users saved dates
const getUsersSavedDates = (req, res) => {
    User.findOne({_id: req.params.id}).populate({path:'savedDates', populate: {path: 'notes', model: 'Note'}})
    .then(foundUser => {
        console.log(foundUser)
        res.json({savedDates: foundUser.savedDates})
    }).catch(err => res.json({err:err.message}))
}

//put route that allows users to create a new date
const createNewDate = async (req, res) => {
    if(req.body.notes != null) {
        const newNote = new Note({
            owner: req.params.id,
            content: req.body.notes
        })
        await newNote.save()
        .then(savedNote => {
            req.body.notes = savedNote
        }).catch(err => res.json({err:err}))  
    } 
    User.findOne({_id: req.params.id}).populate({path:'savedDates', populate: {path: 'notes', model: 'Note'}})
    .then(foundUser => {
        foundUser.savedDates.push(req.body)
        foundUser.save()
        .then(updatedUser => {
            res.json({updatedUserDates: updatedUser.savedDates})
        }).catch(err => res.json({err:err}))   
    }).catch(err => res.json({err:err}))
}

//put route that allows a user to update a note on a date
const updateNote = async (req, res) => {
    Note.findOne({_id: req.params.noteId})
    .then(foundNote => {
        foundNote.content = req.body.content
        foundNote.save()
        .then(updatedNote => {
            res.json({updatedNote: updatedNote})
        }).catch(err => res.json({err1:err}))
    }).catch(err => res.json({err2:err}))
}


//delete a resource from a user
const deleteResource = async (req, res) => {
    Resource.findByIdAndDelete(req.params.resourceId)
        .then(() => {
            res.json({message: 'Resource deleted'})
        }).catch(err => res.json({err3:err}))
}



//add a new note to a date
const addNoteToDate = async (req, res) => {
    Note.create({
        owner: req.params.id,
        content: req.body.content
    }).then(newNote => {
        User.findOne({_id: req.params.id}).populate('savedDates')
        .then(foundUser => {
            foundUser.savedDates.id(req.params.dateId).notes.push(newNote._id)
            foundUser.save()
            .then(updatedUser => {
                res.json({updatedUser: updatedUser})
            }).catch(err => res.json({err1:err}))
        }).catch(err => res.json({err2:err}))
    })
}

//delete a note from a date
const deleteNoteFromDate = async (req, res) => {
    Note.findOne({_id: req.params.noteId})
    .then(foundNote => {
        foundNote.remove()
        .then(deletedNote => {
            User.findOne({_id: req.params.id}).populate('savedDates')
            .then(foundUser => {
                let notes = [...foundUser.savedDates.id(req.params.dateId).notes]
                let filteredNotes = notes.filter((note) => note === deletedNote._id ? false : true)
                foundUser.savedDates.id(req.params.dateId).notes = filteredNotes
                foundUser.save()
                .then(updatedUser => {
                    res.json({updatedUser: updatedUser})
                }).catch(err => res.json({err1:err}))
            }).catch(err => res.json({err2:err}))
        }).catch(err => res.json({err3:err}))
    }).catch(err => res.json({err4:err}))
}

//delete route that allows a user to delete a date
const deleteDate = (req, res) => {
    User.findOne({_id: req.params.id})
    .then(foundUser => {
        console.log(foundUser)
        foundUser.savedDates.id(req.params.dateId).remove()
        foundUser.save()
        .then(updatedUser => {
            res.json({updatedUser: updatedUser})
        }).catch(err => res.json({err1:err}))
    }).catch(err => res.json({err2:err}))
}

//move a given date, application, or task to the users associated archive
const archiveItem = (req, res) => {
    User.findOne({_id: req.params.id})
    .then(foundUser => {
        if(req.body.item == 'date') {
        foundUser.archivedDates.push(foundUser.savedDates.id(req.params.itemId))
        foundUser.savedDates.id(req.params.itemId).remove()
        } else if (req.body.item == 'task') {
            let taskid = foundUser.tasks.find(task => task._id == req.params.itemId)
            let taskidindex = foundUser.tasks.indexOf(taskid)
            foundUser.archivedTasks.push(taskid)
            foundUser.tasks.splice(taskidindex, 1)
        }
        foundUser.save()
        .then(updatedUser => {
            res.json({updatedUser: updatedUser})
        }).catch(err => res.json({err1:err}))
    }).catch(err => res.json({err2:err}))
}

//update the type on a resource
const updateResourceType = (req, res) => {
    Resource.findOne({_id: req.params.resourceId})
    .then(foundResource => {
        foundResource.resourceType = req.body.type
        foundResource.save()
        .then(updatedResource => {
            res.json({updatedResource: updatedResource})
        }).catch(err => res.json({err1:err}))
    }).catch(err => res.json({err2:err}))
}


//get a users archives
const getArchives = (req, res) => {
    User.findOne({_id: req.params.id}).populate('archivedDates').populate('archivedTasks')
    .then(foundUser => {
        res.json({archives: foundUser})
    }).catch(err => res.json({err:err}))
}

const getAllUsers = (req, res) => {
    User.find({})
    .then(response => {
        res.json({allusers: response})
    }).catch(err => res.json({err:err}))
}

//get all of users dms
const getUsersDms = (req, res) => {
    DmList.find({ $or: [{from: req.params.to}, {to: req.params.to}]})
    .populate('from').populate('to').populate('messages')
    .then(response => {
        res.json({dms: response})
    }).catch(err => res.json({err:err}))
}

//get specific dms
const getSpecificDms = (req, res) => {
    DmList.findOne({ $and: [
        { $or: [{from: req.params.from}, {from: req.params.to}]},
        { $or: [{to: req.params.to}, {to: req.params.from}]},
    ]}).populate('messages').populate('to').populate('from')
    .then(response => {
        res.json({dms: response})
    }).catch(err => res.json({err:err}))
}

// getting a users notifs 
const getUsersNotifs = (req, res) => {
    Notification.find({to: req.params.id})
    .populate('to')
    .populate('from')
    .populate('postID')
    .then(foundNotifs => {
        res.json({notifs: foundNotifs})
    }).catch(err => res.json({err:err}))
}

//getting a users posts
const getAUsersPosts = (req, res) => {
    Post.find({UserID: req.params.id}).populate('UserID').then(response => {
        res.json({usersPosts: response})
    }).catch(err => res.json({err:err}))
}

//adding an application, app response, interview, or offer to a user
const updateUserJobData = (req, res) => {
    const removeOrAdd = req.body.removeOrAdd
    const type = req.body.type
    const jobID = req.params.jobID
    User.findById(req.params.userID).then(user =>{
        let usersApplications = user.applications
        let usersOffers = user.offers
        let usersInterviews = user.interviews
        let usersResponses = user.responses
        switch(removeOrAdd){
            case"remove":
                switch(type){
                    case "Applications Sent":
                        let updatedApps = usersApplications.filter((j) => j.toString() == jobID.toString()? false: true)
                        console.log(updatedApps)
                        User.findByIdAndUpdate(req.params.userID, {
                            applications: updatedApps
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                    case "Offers":
                        let updatedOffers = usersOffers.filter((j) => j.toString() == jobID.toString()? false: true)
                        User.findByIdAndUpdate(req.params.userID, {
                            offers: updatedOffers
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                    case "Interviews":
                        let updatedInterviews = usersInterviews.filter((j) => j.toString() == jobID.toString()? false: true)
                        User.findByIdAndUpdate(req.params.userID, {
                            interviews: updatedInterviews
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                    case 'Responses':
                        let updatedResponses = usersResponses.filter((j) => j.toString() == jobID.toString()? false: true)
                        User.findByIdAndUpdate(req.params.userID, {
                            responses: updatedResponses
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                }
            break;
            case "add":
                switch(type){
                    case "Applications Sent":
                        User.findByIdAndUpdate(req.params.userID, {
                            applications: [...usersApplications, jobID]
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                    case "Offers":
                        User.findByIdAndUpdate(req.params.userID, {
                            offers: [...usersOffers, jobID]
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                    case "Interviews":
                        User.findByIdAndUpdate(req.params.userID, {
                            interviews: [...usersInterviews, jobID]
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                    case 'Responses':
                        User.findByIdAndUpdate(req.params.userID, {
                            responses: [...usersResponses, jobID]
                        }).then(response => console.log(response)).catch(err => res.json({error: err}))
                    break;

                }
            break;

        }
    }).catch(err => res.json({err:err}))
    User.findById(req.params.userID).then(response => res.json({updated: response})).catch(err => res.json({error: err}))
}

//getting a users likes
const getAUsersLikes = (req, res) => {
    Like.find({likeBy: req.params.id}).populate('likeTo').populate('likeOn').then(response => {
        res.json({usersLikes: response})
    }).catch(err => res.json({err:err}))
}

//getting a users comments
const getAUsersComments = (req, res) => {
    Comment.find({commentFrom: req.params.id}).populate("commentFrom").populate('commentTo').populate('postID'
    ).then(response => {
        res.json({usersComments: response})
    }).catch(err => res.json({err:err}))
}

//getting a users bookmarks
const getAUsersBookmarks = (req, res) => {
    Bookmark.find({bookmarkFrom: req.params.id}).populate('bookmarkTo').populate('bookmarkFrom').populate('post').then(response => {
        res.json({usersBookmarks: response})
    }).catch(err => res.json({err:err}))
}

const getAUsersFollowers = (req, res) => {
    User.findById(req.params.id).populate('followers').then(response => {
        res.json({usersFollowers: response})
    }).catch(err => res.json({err:err}))
}

const getAUsersFollowing = (req, res) => {
    User.findById(req.params.id).populate('following').then(response => {
        res.json({usersFollowing: response})
    }).catch(err => res.json({err:err}))
}

const getAUsersFollowingNoPopulate = (req, res) => {
    User.findById(req.params.id).then(response => {
        res.json({usersFollowing: response})
    }).catch(err => res.json({err:err}))
}

const getUserResources = (req, res) => {
    Resource.find({UserID: req.params.UserID})
    .populate('post')
    .populate('UserID')
    .populate('resourceBy')
    .then(foundResources => {
        res.json({resources: foundResources})
    }).catch(err => res.json({err:err}))
}

//Get Tasks
const getTasks = (req, res) => {
    User.findById(req.params.id).populate({path:'tasks', populate: {path: 'notes', model: 'Note'}}).populate({path:'archivedTasks', populate: {path: 'notes', model: 'Note'}})
    .then(userTasks => {
        res.json({userTasks: userTasks})
    }).catch(err => {res.json({error: err})})
}

//Get task notes
const taskNotes = (req, res) => {
    Task.findById(req.params.taskId).populate('notes')
    .then(foundTask => {
        res.json({foundNotes: foundTask.notes})
    }).catch(err => res.json({err:err}))
}

//Get task comments
const taskComments = (req, res) => {
    Task.findById(req.params.id)
    .then(foundTask => {
        Comment.find({postID: foundTask._id})
        .then(foundComments => {
            res.json({foundComments: foundComments})
        }).catch(err => res.json({err:err}))
    })
}

//Get user job list 
const userJobs = (req, res) => {
    Job.find({user: req.params.email})
    .then(jobsOfUser => {
        res.json({jobsOfUser: jobsOfUser})
    }).catch(err => res.json({err:err}))
}

//Update personal user info
const updatePersonalInfo = (req, res) => {
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
        })
        .then(updatedUser => {
            res.json({updatedUser: updatedUser})
        })
        .catch(error => { 
            res.json({ message: 'email already exists!' })
        });
    }

    const deleteUser = (req, res) => {
        User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            console.log('Deleted user =>>', deletedUser);
            res.json({deletedUser: deletedUser})
        })
        .catch(error => { 
            console.log('error', error) 
            res.json({ message: 'email already exists!' })
        });
    }



//creates task and adds it to the user
const postTask = (req, res) => {
    Task.create({
        taskName: req.body.taskName,
        task: req.body.task,
        importance: req.body.importance,
        isComplete: false,
        notes: [],
        status: "To Do",
        owner: req.params.id
    })
    .then(createdTask => {
        User.findOne({_id: req.params.id})
.then(user => {
    const currentTasks = user.tasks
    currentTasks.push(createdTask._id)
    User.findOneAndUpdate({_id: req.params.id}, {
        tasks: currentTasks
    })
    .then(response => {
        res.json({tasks: response.tasks})
    }).catch(error => { 
        res.json({ message: error })
    });    
    })
    }).catch(error => { 
    res.json({ message: error })
});   
}

//Update a task
const updateTaskIntent = (req, res) => {
       Task.findByIdAndUpdate(req.params.id, {
            task: req.body.newTask, 
            status: req.body.status
        })
        .then(response => {
            res.json({updatedTask: response})
        }).catch(error => { 
            res.json({ message: error })
        });    
    }


//Put a note on a task
const putNoteOnTask = (req, res) => {
    Note.create({
        owner: req.params.id,
        content: req.body.note,
    }).then(createdNote => {
        Task.findById(req.params.taskID).populate('notes')
        .then(foundTask => { 
            foundTask.notes.push(createdNote._id)
            foundTask.save()
            .then(response => {
                res.json({updatedTask: response})
            }).catch(error => res.json({ message1: error }));
        }).catch(error => res.json({message2: error}))    
    }).catch(error => res.json({message3: error}))
}

//Delete a note from a task
const deleteNoteFromTask = (req, res) => {
    Note.findByIdAndDelete(req.params.noteID)
    .then(() => {
        Task.findById(req.params.taskID).populate('notes')
        .then(foundTask => {
            const notes = foundTask.notes
            const newNotes = notes.filter(note => note._id != req.params.noteID)
            foundTask.notes = newNotes
            foundTask.save()
            .then(response => {
                res.json({updatedTask: response})
            }).catch(error => res.json({ message1: error }));
        }).catch(error => res.json({message2: error}))
    }).catch(error => res.json({message3: error}))
}

//add jobs of concern to user profile
const postJob = (req, res) => {
    Job.create({
        user: req.params.email,
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
        date_applied: Date.now(),
        date_response: Date.now()
    }).then(createdJob => {
        User.findOne({name: req.params.name})
        .then(foundUser => {
        const userJobs = foundUser.jobs
        userJobs.push(createdJob._id)
        User.findOneAndUpdate({name: req.params.name}, {
            jobs: userJobs 
        }).then(response => {
            res.json({res: response})
        })
        })
    })
}

const followAUser = (req, res) => {
    User.findById(req.params.to).then(foundUser1 => {
     User.findById(req.params.from).then(foundUser2 => {       
        Notification.create({
            from: req.params.from,
            to: req.params.to,
            likeCommentOrFollow: "Follow",
            content: 'followed you!'
        }).then(response1 => {
        User.findByIdAndUpdate(req.params.to, {
            followers: [...foundUser1.followers, foundUser2._id],
            notifications: [...foundUser1.notifications, response1._id]
        }).then(() => { 
        User.findByIdAndUpdate(req.params.from, {
            following: [...foundUser2.following, foundUser1._id]
        }).then(() => {
            User.findById(req.params.from).then((foundUser) => {
                res.json({ user: foundUser })
                }).catch(error => res.json({message: error}))
        })
        })
    })
        })
    })
}

const unfollowAUser = (req, res) => {
    User.findById(req.params.to).then(foundUser1 => {
     User.findById(req.params.from).then(foundUser2 => { 
        let updatedUser1Followers = foundUser1.followers.filter((f) => f.toString() == foundUser2._id.toString()? false: true)      
        let updatedUser2Following = foundUser2.following.filter((f) => f.toString() == foundUser1._id.toString()? false: true)    
        User.findByIdAndUpdate(req.params.to, {
            followers: updatedUser1Followers,
        }).then(() => { 
        User.findByIdAndUpdate(req.params.from, {
            following: updatedUser2Following
        }).then(() => {
            User.findById(req.params.from).then((foundUser) => {
                res.json({ user: foundUser })
                }).catch(error => res.json({message: error}))
        })
        })
        })
    })
}

//update a task status
const updateTaskStatus = (req, res) => {
    Task.findByIdAndUpdate(req.params.taskId, {
        status: req.body.status
    })
    .then(response => {
        res.json({updatedTask: response})
    }).catch(error => {
        res.json({message: error})
    })
}

//delete a task from the database and remove its id from the user's tasks array
const deleteTask = (req, res) => {
    Task.findByIdAndRemove(req.params.taskID)
    .then(() => {
        User.findById(req.params.userID)
        .then(foundUser => {
            const newTasks = foundUser.tasks.filter(task => task._id != req.params.id)
            foundUser.tasks = newTasks
            foundUser.save()
            .then(response => {
                res.json({updatedUser: response})
            }).catch(error => res.json({ message1: error }));
        }).catch(error => res.json({message2: error}))
    }).catch(error => res.json({message3: error}))
}


//Delete a task comment
const deleteTaskComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.id) 
        .then(deletedComment => {
            res.json({deletedComment: deletedComment})
        }).catch(err => res.json({err:err}))
}





module.exports = {
    archiveItem,
    deleteResource,
    getUserWithJobDataPopulated,
    getAllUsers,
    updateUserJobData,
    getAUsersFollowing,
    getAUsersFollowingNoPopulate,
    getAUsersFollowers,
    addNoteToDate,
    updateResourceType,
    getUsersSavedDates,
    deleteNoteFromDate,
    createNewDate,
    taskNotes,
    updateNote,
    deleteDate,
    deleteNoteFromTask,
    getUsersDms,
    getSpecificDms,
    getUsersNotifs,
    getAUsersLikes,
    getAUsersComments,
    getAUsersBookmarks,
    getAUsersPosts,
    userSignup,
    followAUser,
    updateTaskStatus,
    getUserResources,
    userLogin,
    postTask,
    getArchives,
    updateTaskIntent,
    unfollowAUser,
    putNoteOnTask,
    deleteTask,
    deleteTaskComment,
    updatePersonalInfo,
    deleteUser,
    postJob,
    userJobs,
    taskComments,
    getTasks,
    getUsers
};
