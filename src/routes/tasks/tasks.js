var express = require("express");
var router = express.Router();
var {
  create_new_task,
  get_all_tasks,
  get_specific_task,
  delete_all_tasks,
  update_specific_task,
  delete_specific_task,
  change_done_flag,
  get_all_tasks_paginated,
} = require("../../controllers/tasks_controller");
const { body } = require("express-validator");

router.post("/", body("content").notEmpty(), create_new_task);

router.get("/", get_all_tasks_paginated);
router.delete("/", delete_all_tasks);

router.get("/:id", get_specific_task);
router.put("/:id", update_specific_task);
router.delete("/:id", delete_specific_task);

router.put("/:id/check", change_done_flag);

module.exports = router;
