const mysql = require('mysql');
const inquirer = require('inquirer');
const console = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    runInquiry(); 
});

function runInquiry() {
    inquirer.prompt({
        name: "directory",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update role",
            "Exit",
        ]
    })
    .then(function(answer){
        if (answer.directory === "View departments") {
            pullDepartments();
        } else if (answer.directory === "View roles") {
            pullRoles();
        } else if (answer.directory === "View employees") {
            pullEmployees();
        } else if (answer.directory === "Add department") {
            addDepartment();
        } else if (answer.directory === "Add role") {
            addRole();
        } else if (answer.directory === "Add employee") {
            addEmployee();
        } else if (answer.directory === "Update role") {
            updateRole();
        } else if (answer.directory === "Exit") {
            exit();
        }
    })
}