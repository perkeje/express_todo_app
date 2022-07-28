const pool = require('../services/pool')
const bcrypt = require("bcrypt")
const {validationResult}  = require('express-validator')
const User = require("../models/user")
const generate_access_token = require("../services/jwt")

module.exports.create_new_user = async(req,res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            const found = await find_by_email(req.body.email)
            if( found !== undefined) return res.status(400).json({ error: "User already exists" });
            const salt = await bcrypt.genSalt(10)
            const hashed_pass = await bcrypt.hash(req.body.pass,salt)
            let user = await pool.query('INSERT INTO USERS(email,pass) VALUES($1,$2) RETURNING *',[req.body.email,hashed_pass])
            return res.status(201)
                .json(user.rows[0])
        }catch(err){
            res.status(500).json({ error: err.stack});
        }
}

find_by_email = async (email)=>{
    try{
        let user = await pool.query('SELECT * FROM USERS WHERE EMAIL=$1',[email])
        return user.rows[0]
    }
    catch(err){
        throw Error(err)
    }
    
}

module.exports.login_user = async(req,res) => {
    try{
        const user_res = await find_by_email(req.body.email)
        const user = new User(user_res.id,user_res.email,user_res.pass)
        const validPassword = await bcrypt.compare(req.body.pass, user.pass);
      if (validPassword) {
        const token = generate_access_token(user)
        return res.status(200).set('jwt',token ).json({message:"logged in"})
      } else {
        return res.status(400).json({error:"Invalid password"})
      }
    }catch(err){
        return res.status(500).json({error:"Internal error"})
    }
}
