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

// GET - project by id
router.get("/:id", (req, res) => {
  Project.findProjectById(req.params.id)
    .then((project) => {
      res.status(200).json(project);
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

// STRETCH GOAL.............................

// STRETCH- GET RESOURCES OF A SPECIFIC PROJECT
router.get("/:id/resources", (req, res) => {
  Project.findResourcesByProjectId(req.params.id)
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// STRETCH- GET A LIST OF PROJECT TASKS
router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;
  Project.findTasksByProjectId(id)
    .then((tasks) => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res
          .status(404)
          .json({ message: "Could not find steps for given scheme" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get tasks" });
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
