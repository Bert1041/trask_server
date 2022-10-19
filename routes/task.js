const express = require("express");
const tasks = require("../controllers/task.js");
const taskRouter = express.Router();


taskRouter.post("/", tasks.create);

  // Create a new Task
  taskRouter.post("/api/tasks/", tasks.create);
  // Retrieve all tasks
  taskRouter.get("/api/tasks/", tasks.findAll);
  // Retrieve all published tasks
  taskRouter.get("/api/tasks/published", tasks.findAllPublished);
  // Retrieve a single Task with id
  taskRouter.get("/api/tasks/one", tasks.findOne);
  // Update a Task with id
  taskRouter.put("/api/tasks/update", tasks.update);
  // Delete a Task with id
  taskRouter.delete("/api/tasks/delete", tasks.delete);
  // Delete all tasks
  taskRouter.delete("/api/tasks/", tasks.deleteAll);
  // app.use("/api/tasks", router);

// module.exports = (app) => {
//   const tasks = require("../controllers/task.js");
//   var router = require("express").Router();
//   // Create a new Task
//   router.post("/", tasks.create);
//   // Retrieve all tasks
//   router.get("/", tasks.findAll);
//   // Retrieve all published tasks
//   router.get("/published", tasks.findAllPublished);
//   // Retrieve a single Task with id
//   router.get("/one", tasks.findOne);
//   // Update a Task with id
//   router.put("/update", tasks.update);
//   // Delete a Task with id
//   router.delete("/delete", tasks.delete);
//   // Delete all tasks
//   router.delete("/", tasks.deleteAll);
//   app.use("/api/tasks", router);
// };

module.exports = taskRouter;
