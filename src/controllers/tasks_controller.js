const pool = require("../services/pool");
const { validationResult } = require("express-validator");
const { get_paginated } = require("../services/pagination");
const { config } = require("../configs/pagination.config");
const {
  tasks_insert,
  select_all,
  delete_all,
  delete_with_id,
  get_with_id,
  update_with_id,
  update_isDone,
} = require("../services/tasks");

module.exports.create_new_task = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.user;
    let task = await tasks_insert(req.body.content, user.sub, pool);
    return res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.get_all_tasks = async (req, res) => {
  try {
    const user = req.user;
    let tasks = await select_all(user.sub, pool);
    return res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.get_all_tasks_paginated = async (req, res) => {
  try {
    let page = req.body.page || config.page;
    let per_page = req.body.per_page || config.per_page;
    let isDone = req.body.isDone || config.isDone;
    const user = req.user;
    let tasks = await get_paginated(page, per_page, isDone, user.sub, pool);
    return res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.delete_all_tasks = async (req, res) => {
  try {
    const user = req.user;
    await delete_all(user.sub, pool);
    return res.status(200).json({ msg: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.get_specific_task = async (req, res) => {
  try {
    const user = req.user;
    let task = await get_with_id(user.sub, req.params.id, pool);
    return res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.update_specific_task = async (req, res) => {
  try {
    const user = req.user;
    let task = await update_with_id(
      req.body.content,
      user.sub,
      req.params.id,
      pool
    );
    return res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.delete_specific_task = async (req, res) => {
  try {
    const user = req.user;
    await delete_with_id(user.sub, req.params.id, pool);
    return res.status(200).json({ msg: req.params.id + " deleted" });
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.change_done_flag = async (req, res) => {
  try {
    const user = req.user;
    let task = await update_isDone(user.sub, req.params.id, pool);
    return res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};
