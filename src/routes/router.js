var express = require('express')
var router = express.Router()
var register = require('./auth/register')
var login = require('./auth/login')

router.use(express.json())

router.use('/login',login)
router.use('/register',register)
router.all('/tasks',()=>{console.log("Hello")})

module.exports = router;