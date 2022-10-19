const mysql = require("../db_config.js");

// constructor
const Task = function (task) {
  this.task_name = task.task_name;
  this.task_detail = task.task_detail;
  this.date = task.date;
  this.published = task.published;
};
Task.create = (newTask, result) => {
  mysql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};
Task.findById = (id, result) => {
  console.log("The id is", id);
  mysql.query(`SELECT * FROM tasks WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found task: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Task with the id
    result({ kind: "not_found" }, null);
  });
};
Task.getAll = (name, result) => {
  let query = "SELECT * FROM tasks";
  if (name) {
    query += ` WHERE task_name LIKE '%${name}%'`;
  }
  mysql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tasks: ", res);
    result(null, res);
  });
};
Task.getAllPublished = (result) => {
  sql.query("SELECT * FROM tasks WHERE published=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tasks: ", res);
    result(null, res);
  });
};
Task.updateById = (id, task, result) => {
  mysql.query(
    "UPDATE tasks SET task_name = ?, task_detail = ?, published = ? WHERE id = ?",
    [task.task_name, task.task_detail, task.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated task: ", { id: id, ...task });
      result(null, { id: id, ...task });
    }
  );
};
Task.remove = (id, result) => {
  mysql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Task with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted task with id: ", id);
    result(null, res);
  });
};
Task.removeAll = (result) => {
  mysql.query("DELETE FROM tasks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} tasks`);
    result(null, res);
  });
};
module.exports = Task;
