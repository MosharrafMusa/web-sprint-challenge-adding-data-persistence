const express = require("express");

const router = express.Router();
const Resource = require("./resourceModel");

// GET - all resources
router.get("/", (req, res) => {
  Resource.find()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET - resource by id
router.get("/:id", (req, res) => {
  Resource.findById(req.params.id)
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST - add a new resource
router.post("/", (req, res) => {
  Resource.add(req.body)
    .then((ids) => {
      const id = ids[0];
      return Resource.findById(id);
    })
    .then((resource) => {
      res.status(200).json(req.body);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
