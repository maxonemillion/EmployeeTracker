const mysql = require('mysql');
const inquirer = require('inquirer');
const consoletable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bugs1447!",
    database: "employee_db"
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
    });
};

function pullDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const table = consoletable.getTable(res);
        console.log(table);
        runInquiry();
    });
};

function pullRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        const table = consoletable.getTable(res);
        console.log(table);
        runInquiry();
    });
};

function pullEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const table = consoletable.getTable(res);
        console.log(table);
        runInquiry();
    });
};

function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Department name: "
    }).then(function (res) {
        connection.query(`INSERT INTO department (name) VALUES ('${res.department}')`, function (err, res) {
            if (err) throw err;
            console.log("department list updated");
            runInquiry();
        });
    });
};

function addRole() {
    inquirer.prompt({
        name: "roleTitle",
        type: "input",
        message: "Department name: "
    }).then(function (res) {
        connection.query(`INSERT INTO department (name) VALUES ('${res.department}')`, function (err, res) {
            if (err) throw err;
            console.log("department list updated");
            runInquiry();
        });
    });
};

function addEmployee() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Department name: "
    }).then(function (res) {
        connection.query(`INSERT INTO department (name) VALUES ('${res.department}')`, function (err, res) {
            if (err) throw err;
            console.log("department list updated");
            runInquiry();
        });
    });
};