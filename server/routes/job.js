const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.post('/', ctrls.job.postJobs)

module.exports = router;