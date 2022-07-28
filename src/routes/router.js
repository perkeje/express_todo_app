var express = require('express')
var router = express.Router()
var register = require('./auth/register')
var login = require('./auth/login')
var tasks = require('./tasks/tasks')
var {authenticateToken} = require('../middlewares/auth')


router.use(express.json())

router.use('/login',login)
router.use('/register',register)
router.use('/tasks',authenticateToken)
router.use('/tasks',tasks)

module.exports = router;