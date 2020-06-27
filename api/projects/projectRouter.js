const express = require("express");

const router = express.Router();
const Project = require("./projectModel");
const Resource = require("../resources/resourceModel");

// GET - all projects, include completed
router.get("/", (req, res) => {
  Project.findProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

// GET - project by id - include id, name, desc, tasks, resources
router.get("/:id", (req, res) => {
  const wholeproject = {};
  wholeproject.id = Number(req.params.id);
  Project.findProjectById(req.params.id)
    .then((project) => {
      Object.assign(wholeproject, project);
      return Project.findTasksByProjectId(req.params.id);
    })
    .then((projectTasks) => {
      wholeproject.tasks = projectTasks;
      return Resource.findResourcesByProjectId(req.params.id);
    })
    .then((projectResources) => {
      wholeproject.resources = projectResources;
      res.status(200).json(wholeproject);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST - add a new project
router.post("/", (req, res) => {
  Project.addProject(req.body)
    .then((project) => {
      res.status(200).json(req.body);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
