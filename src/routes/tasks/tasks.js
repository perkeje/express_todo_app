var express = require('express')
var router = express.Router()
var {create_new_task} = require('../../controllers/tasks_controller')
const {body } = require('express-validator');

router.post('/',
    body("content").notEmpty(),
    create_new_task
    )

module.exports = router