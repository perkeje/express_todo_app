const pool = require('../services/pool')
const {validationResult}  = require('express-validator')
const Task = require("../models/task")

module.exports.create_new_task = async(req,res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const user = req.user
        let task = await pool.query('INSERT INTO TASKS(content,user_id) VALUES($1,$2) RETURNING *',[req.body.content,user.sub])
        return res.status(201)
            .json(task.rows[0])
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}