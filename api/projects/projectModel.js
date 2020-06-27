const db = require("../../data/dbConfig");

module.exports = {
  findProjects,
  findProjectById,
  addProject,
  findTasksByProjectId,
  findResourcesByProjectId,
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

// STRETCH

function findResourcesByProjectId(id) {
  return db("project_resources as pr")
    .join("projects as p", "p.id", "pr.project_id")
    .join("resources as r", "r.id", "pr.resource_id")
    .select("r.id as resource_id", "r.name", "r.description")
    .where("p.id", "=", id);
}

function findTasksByProjectId(id) {
  return db("projects as p")
    .join("tasks as t", "p.id", "t.project_id")
    .where("p.id", id)
    .orderBy("t.id", "asc")
    .select("t.id", "t.description", "t.completed", "t.notes");
}
