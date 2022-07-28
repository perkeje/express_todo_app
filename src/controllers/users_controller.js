const {pool} = require('../pool')
const bcrypt = require("bcrypt");
const {validationResult } = require('express-validator');

const create_new_user = async(req,res) => {
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
            res.status(500).json({ error: err});
        }
        
    
}

const find_by_email = async (email)=>{
    try{
        let user = await pool.query('SELECT * FROM USERS WHERE EMAIL=$1',[email])
        return user.rows[0]
    }
    catch(err){
        throw Error(err)
    }
    
    
}

module.exports = create_new_user
