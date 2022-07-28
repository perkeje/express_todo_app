var express = require('express')
var router = express.Router()
var create_new_user = require('../../controllers/users_controller')
const {body } = require('express-validator');

router.post('/',
    body('email').isEmail(),
    body('pass').isLength({ min: 5 }),
    create_new_user
    )

module.exports = router