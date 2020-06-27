const db = require("../../data/dbConfig");

module.exports = {
  findProjects,
  findProjectById,
  addProject,
};

function findProjects() {
  return db("projects");
}

function findProjectById(id) {
  return db("projects as p")
    .select("p.name", "p.description", "p.completed")
    .where({ id })
    .first();
}

function addProject(project) {
  return db("projects").insert(project);
}
