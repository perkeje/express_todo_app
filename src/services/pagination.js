const Task = require("../models/task");

module.exports.get_paginated = async (
  page,
  per_page,
  isDone,
  user_id,
  pool
) => {
  let last_page = 1;
  let total = await pool.query(
    "SELECT COUNT(id) FROM TASKS WHERE user_id=$1 AND done=$2",
    [user_id, isDone]
  );
  let tasks = [];
  if (total != 0) {
    last_page = total / per_page;
    let skip = (page - 1) * per_page;
    tasks = await pool.query(
      "SELECT * FROM TASKS WHERE user_id=$1 AND done=$2 LIMIT $3 OFFSET $4",
      [user_id, isDone, per_page, skip]
    );
  }
  return tasks.rows.map(
    (task) => new Task(task.id, task.content, task.user_id, task.done)
  );
};
