const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.get('/:user', ctrls.upload.getPhoto) //getting a post
router.post('/:user', ctrls.upload.postPhoto) //making a post


module.exports = router;