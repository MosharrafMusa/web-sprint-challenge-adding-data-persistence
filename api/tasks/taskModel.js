const db = require("../../data/dbConfig");

module.exports = {
  findTasks,
  findTaskById,
  addTask,
};

function findTasks(id) {
  return db("tasks");
}

function findTaskById(id) {
  return db("tasks").where({ id });
}

function addTask(task) {
  return db("tasks").insert(task);
}
