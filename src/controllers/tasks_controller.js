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

module.exports.get_all_tasks = async(req,res) => {
    try{
        const user = req.user
        let tasks = await pool.query('SELECT * FROM TASKS WHERE user_id=$1',[user.sub])
        return res.status(200)
            .json(tasks.rows)
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}
module.exports.delete_all_tasks = async(req,res) => {
    try{
        const user = req.user
        let tasks = await pool.query('DELETE FROM TASKS WHERE user_id=$1',[user.sub])
        return res.status(200)
            .json({msg:"deleted"})
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}

module.exports.get_specific_task = async(req,res) => {
    try{
        const user = req.user
        let task = await pool.query('SELECT * FROM TASKS WHERE user_id=$1 AND id=$2',[user.sub, req.params.id])
        return res.status(200)
            .json(task.rows[0])
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}

module.exports.update_specific_task = async(req,res) => {
    try{
        const user = req.user
        let task = await pool.query('UPDATE TASKS SET content=$1 WHERE user_id=$2 AND id=$3 RETURNING *',[req.body.content,user.sub, req.params.id])
        return res.status(200)
            .json(task.rows[0])
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}

module.exports.delete_specific_task = async(req,res) => {
    try{
        const user = req.user
        let task = await pool.query('DELETE FROM TASKS WHERE user_id=$1 AND id=$2',[user.sub, req.params.id])
        return res.status(200)
        .json({msg:req.params.id + " deleted"})
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}

module.exports.change_done_flag = async(req,res) => {
    try{
        const user = req.user

        let task = await pool.query('UPDATE TASKS SET done=NOT done WHERE user_id=$1 AND id=$2 RETURNING *',[user.sub, req.params.id])
        return res.status(200)
        .json(task.rows[0])
    }catch(err){
        res.status(500).json({error: err.stack});
    }
}