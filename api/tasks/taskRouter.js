const express = require("express");

const router = express.Router();
const Task = require("./taskModel");

// GET - all task
router.get("/", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET - task by id
router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST - add a new task
router.post("/", (req, res) => {
  Task.add(req.body)
    .then((ids) => {
      const id = ids[0];
      return Task.findById(id);
    })
    .then((task) => {
      res.status(200).json(req.body);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
