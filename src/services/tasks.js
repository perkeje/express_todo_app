const Task = require("../models/task");

module.exports.tasks_insert = async (content, user_id, pool) => {
  let task = await pool.query(
    "INSERT INTO TASKS(content,user_id) VALUES($1,$2) RETURNING *",
    [content, user_id]
  );
  task = task.rows[0];
  return new Task(task.id, task.content, task.user_id, task.done);
};

module.exports.select_all = async (user_id, pool) => {
  let tasks = await pool.query("SELECT * FROM TASKS WHERE user_id=$1", [
    user_id,
  ]);
  return tasks.rows.map(
    (task) => new Task(task.id, task.content, task.user_id, task.done)
  );
};

module.exports.delete_all = async (user_id, pool) => {
  await pool.query("DELETE FROM TASKS WHERE user_id=$1", [user_id]);
};

module.exports.delete_with_id = async (user_id, id, pool) => {
  await pool.query("DELETE FROM TASKS WHERE user_id=$1 AND id=$2", [
    user_id,
    id,
  ]);
};

module.exports.get_with_id = async (user_id, id, pool) => {
  let task = await pool.query(
    "SELECT * FROM TASKS WHERE user_id=$1 AND id=$2",
    [user_id, id]
  );
  task = task.rows[0];
  if (task === undefined) throw Error("Invalid ID");
  return new Task(task.id, task.content, task.user_id, task.done);
};

module.exports.update_with_id = async (content, user_id, id, pool) => {
  let task = await pool.query(
    "UPDATE TASKS SET content=$1 WHERE user_id=$2 AND id=$3 RETURNING *",
    [content, user_id, id]
  );
  task = task.rows[0];
  if (task === undefined) throw Error("Invalid ID");
  return new Task(task.id, task.content, task.user_id, task.done);
};

module.exports.update_isDone = async (user_id, id, pool) => {
  let task = await pool.query(
    "UPDATE TASKS SET done=NOT done WHERE user_id=$1 AND id=$2 RETURNING *",
    [user_id, id]
  );
  task = task.rows[0];
  if (task === undefined) throw Error("Invalid ID");
  return new Task(task.id, task.content, task.user_id, task.done);
};
