var express = require('express')
var router = express.Router()
var {create_new_user} = require('../../controllers/auth_controller')
const {body } = require('express-validator');

router.post('/',
    body('email').isEmail().normalizeEmail(),
    body('pass').isLength({ min: 3 }),
    create_new_user
    )

module.exports = router