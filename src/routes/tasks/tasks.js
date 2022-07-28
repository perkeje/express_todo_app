var express = require('express')
var router = express.Router()
var {create_new_task, get_all_tasks,get_specific_task,delete_all_tasks} = require('../../controllers/tasks_controller')
const {body } = require('express-validator');

router.post('/',
    body("content").notEmpty(),
    create_new_task
    )

router.get('/',get_all_tasks)
router.delete('/',delete_all_tasks)

router.get('/:id',get_specific_task)

module.exports = router