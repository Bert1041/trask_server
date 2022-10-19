const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trasker",
});

connection.connect(function (err) {
  if (!!err) {
    console.log(err);
  }
  else {
    console.log("connected to MYSQL database");

  }
});

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });

module.exports = connection;
// connection.end();
