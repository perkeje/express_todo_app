var express = require('express')
var router = express.Router()
var register = require('./auth/register')

router.use(express.json())

//router.post('/login')
router.use('/register',register)
router.all('/tasks',()=>{console.log("Hello")})

module.exports = router;