var express = require('express')
var router = express.Router()
var {login_user} = require('../../controllers/auth_controller')

router.post('/', login_user)

module.exports = router