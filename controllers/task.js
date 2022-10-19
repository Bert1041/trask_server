var qs = require("querystring");
const Task = require("../models/task.js");
// Create and Save a new Task

exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Task
  const task = new Task({
    task_name: req.body.task_name,
    task_detail: req.body.task_detail,
    date: req.body.date,
    published: req.body.published || 0,
  });
  // Save Task in the database
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    else res.send(data);
  });
};
// Retrieve all tasks from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.name;
  Task.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};
exports.findAllPublished = (req, res) => {
  Task.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};
// Find a single Task with a id
exports.findOne = (req, res) => {
  console.log(req.query.id);
  Task.findById(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.query.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Task with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Task identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);
  Task.updateById(req.query.id, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.query.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Tutorial with id " + req.query.id,
        });
      }
    } else res.send(data);
  });
};
// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  Task.remove(req.query.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.query.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Task with id " + req.query.id,
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};
// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Could not finish the operation",
      });
    } else {
      res.send({
        message: "Removed all task successfully",
      });
    }
  });
};
