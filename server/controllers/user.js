const User = require('../models/User')
const Resource = require('../models/Resource')
const Post = require('../models/Post')
const Notification = require('../models/Notification')
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
                name: foundUser.name
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
    User.findOne({_id: req.params.id})
    .then(foundUser => {
        res.json({foundUser: foundUser})
    })
}

const getAllUsers = (req, res) => {
    User.find({})
    .then(response => {
        res.json({allusers: response})
    })
}

//get all of users dms
const getUsersDms = (req, res) => {
    DmList.find({ $or: [{from: req.params.to}, {to: req.params.to}]})
    .populate('from').populate('to').populate('messages')
    .then(response => {
        res.json({dms: response})
    })
}

//get specific dms
const getSpecificDms = (req, res) => {
    DmList.findOne({ $and: [
        { $or: [{from: req.params.from}, {from: req.params.to}]},
        { $or: [{to: req.params.to}, {to: req.params.from}]},
    ]}).populate('messages').populate('to').populate('from')
    .then(response => {
        res.json({dms: response})
    })
}

// getting a users notifs 
const getUsersNotifs = (req, res) => {
    Notification.find({to: req.params.id})
    .populate('to')
    .populate('from')
    .populate('postID')
    .then(foundNotifs => {
        res.json({notifs: foundNotifs})
    })
}

//getting a users posts
const getAUsersPosts = (req, res) => {
    Post.find({UserID: req.params.id}).populate('UserID').then(response => {
        res.json({usersPosts: response})
    })
}

//getting a users likes
const getAUsersLikes = (req, res) => {
    Like.find({likeBy: req.params.id}).populate('likeTo').populate('likeOn').then(response => {
        res.json({usersLikes: response})
    })
}

//getting a users comments
const getAUsersComments = (req, res) => {
    Comment.find({commentFrom: req.params.id}).populate("commentFrom").populate('commentTo').populate('postID'
    ).then(response => {
        res.json({usersComments: response})
    })
}

//getting a users bookmarks
const getAUsersBookmarks = (req, res) => {
    Bookmark.find({bookmarkFrom: req.params.id}).populate('bookmarkTo').populate('bookmarkFrom').populate('post').then(response => {
        res.json({usersBookmarks: response})
    })
}

// const getAUsersFollowers = (req, res) => {
//     Follow.find({likeBy: req.params.id}).populate('UserID').then(response => {
//         res.json({usersPosts: response})
//     })
// }

// const getAUsersFollowing = (req, res) => {
//     Follow.find({likeBy: req.params.id}).populate('UserID').then(response => {
//         res.json({usersPosts: response})
//     })
// }

const getUserResources = (req, res) => {
    Resource.find({UserID: req.params.UserID})
    .populate('post')
    .populate('UserID')
    .populate('resourceBy')
    .then(foundResources => {
        res.json({resources: foundResources})
    })
}

//Get Tasks
const getTasks = (req, res) => {
    Task.find({owner: req.params.id})
    .then(userTasks => {
        res.json({userTasks: userTasks})
    })
}

//Get task comments
const taskComments = (req, res) => {
    Task.findById(req.params.id)
    .then(foundTask => {
        Comment.find({postID: foundTask._id})
        .then(foundComments => {
            res.json({foundComments: foundComments})
        })
    })
}

//Get user job list 
const userJobs = (req, res) => {
    Job.find({user: req.params.email})
    .then(jobsOfUser => {
        res.json({jobsOfUser: jobsOfUser})
    })
}

//Update personal user info
const updatePersonalInfo = (req, res) => {
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
        })
        .then(updatedUser => {
            console.log('Updated User =>>', updatedUser);
            res.json({updatedUser: updatedUser})
        })
        .catch(error => { 
            console.log('error', error) 
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
        comments: [],
        owner: req.params.id
    })
    .then(createdTask => {
        console.log("new task", createdTask)
        User.findOne({_id: req.params.id})
.then(user => {
    console.log("found user", user)
    const currentTasks = user.tasks
    console.log(user)
    currentTasks.push(createdTask._id)
    User.findOneAndUpdate({_id: req.params.id}, {
        tasks: currentTasks
    })
    .then(response => {
        console.log("new task", response)
        res.json({tasks: response.tasks})
    }).catch(error => { 
        console.log('error', error) 
        res.json({ message: error })
    });    
    })
    }).catch(error => { 
    console.log('error', error) 
    res.json({ message: error })
});   
}

//Update a task
const updateTaskIntent = (req, res) => {
       Task.findByIdAndUpdate(req.params.id, {
            task: req.body.newTask, 
            updated: Date.now(),
            isComplete: req.body.isComplete
        })
        .then(response => {
            console.log("task updated", response)
            res.json({updatedTask: response})
        }).catch(error => { 
            console.log('error', error) 
            res.json({ message: error })
        });    
    }

//Put a comment on a task
const postTaskComment = (req, res) => {
    Comment.create({
        createdBy: req.body.name,
        content: req.body.content,
        comments: ['no comments yet'],
        postID: req.params.postID
    }).then(createdComment => {
        console.log("new comment", createdComment)
        Task.findById( req.params.postID)
        .then(foundTask => {
            const taskComments = foundTask.comments
            taskComments.push(createdComment._id)
            Task.findByIdAndUpdate(req.params.postID, {
            comments: taskComments
        }).then(response =>{
            res.json({taskWithNewComment: response})
        })
        }).catch(error => { 
            console.log('error', error) 
            res.json({ message: error })
        });  
    }).catch(error => { 
        console.log('error', error) 
        res.json({ message: error })
    });  
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

//Delete a task
const deleteTask = (req, res) => {
    Task.findByIdAndRemove(req.params.id) 
        .then(deletedTask => {
            res.json({deletedTask: deletedTask})
        })
}

//Delete a task comment
const deleteTaskComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.id) 
        .then(deletedComment => {
            res.json({deletedComment: deletedComment})
        })
}





module.exports = {
    getAllUsers,
    getUsersDms,
    getSpecificDms,
    getUsersNotifs,
    getAUsersLikes,
    getAUsersComments,
    getAUsersBookmarks,
    getAUsersPosts,
    userSignup,
    getUserResources,
    userLogin,
    postTask,
    updateTaskIntent,
    postTaskComment,
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
