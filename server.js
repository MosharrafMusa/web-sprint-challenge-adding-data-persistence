const express = require("express");
const helmet = require("helmet");

const server = express();

const resourceRouter = require("./api/resources/resourceRouter");
const projectRouter = require("./api/projects/projectRouter");
const taskRouter = require("./api/tasks/taskRouter");

server.use(helmet());
server.use(express.json());

server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

server.get("/", (req, res) => {
  res.send("<h3>test route working</h3>");
});

module.exports = server;
