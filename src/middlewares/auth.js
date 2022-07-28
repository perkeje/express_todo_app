const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

module.exports.authenticateToken = (req, res, next) =>{
  const authHeader = req.get('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)
  dotenv.config()
  jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user

    next()
  })
}