const User = require('../models/User')
// const Comment = require('../models/Comment')
// const Job = require('../models/Job')
// const Task = require('../models/Task')

require('dotenv').config();
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');


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
        console.log('Does the passwords match?', isMatch);
        if (isMatch) {
            // if user match, then we want to send a JSON Web Token
            // Create a token payload
            // add an expiredToken = Date.now()
            // save the user
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
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
    User.findOne({email: req.params.email})
    .then(foundUser => {
        res.json({foundUser: foundUser})
    })
}

//Get Tasks
const getTasks = (req, res) => {
    Task.find({createdBy: req.params.name})
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
            display_name: req.body.name,
            isSocialDash: req.body.isSocialDash,
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
        task: req.body.task,
        isComplete: false,
        comments: ['no comments yet'],
        createdBy: req.params.email,
    })
    .then(createdTask => {
        console.log("new task", createdTask)
        User.findOne({email: req.params.email})
.then(user => {
    console.log("found user", user)
    const currentTasks = user.tasks
    console.log(user)
    currentTasks.push(createdTask._id)
    User.findOneAndUpdate({email: req.params.email}, {
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
    userSignup,
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
