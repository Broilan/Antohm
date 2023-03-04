const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');


router.put('/send/:from/:to', ctrls.chat.postDM) //making a post


module.exports = router;