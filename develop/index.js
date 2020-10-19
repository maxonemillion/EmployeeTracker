const mysql = require('mysql');
const inquirer = require('inquirer');
const consoletable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_db"
});

connection.connect(function (err) {
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
        .then(function (answer) {
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
            console.log("Department list updated");
            runInquiry();
        });
    });
};

function addRole() {

    var departmentChoice = [];
    connection.query("SELECT * FROM department", function (err, departmentChosen) {
        if (err) throw err;
        for (let i = 0; i < departmentChosen.length; i++) {
            departmentChoice.push(departmentChosen[i].name);
        };
    });

    inquirer.prompt([

        {
            name: "roleTitle",
            type: "input",
            message: "Title: ",
        },
        {
            name: "rolePay",
            type: "input",
            message: "Salary: "
        },
        {
            name: "inDepartment",
            type: "list",
            message: "Department: ",
            choices: departmentChoice
        }

    ]).then(function (res) {
        connection.query(`INSERT INTO role (title, salary, department) VALUES ('${res.roleTitle}', '${res.rolePay}', '${res.inDepartment}')`, function (err, res) {
            if (err) throw err;
            console.log("Role list updated");
            runInquiry();
        });
    });
};

function addEmployee() {
    var roleChoice = [];
    connection.query("SELECT title FROM role", function (err, roleChosen) {
        if (err) throw err;
        for (let i = 0; i < roleChosen.length; i++) {
            roleChoice.push(roleChosen[i].title);
        };
        var managerChoice = [];
        connection.query("SELECT last_name FROM employee", function (err, managerChosen) {
            if (err) throw err;
            for (let i = 0; i < managerChosen.length; i++) {
                managerChoice.push(managerChosen[i].last_name);
            };
            inquirer.prompt([{
                    name: "employeeFirst",
                    type: "input",
                    message: "First name: "
                },
                {
                    name: "employeeLast",
                    type: "input",
                    message: "Last name: "
                },
                {
                    name: "employeeRole",
                    type: "list",
                    message: "Role: ",
                    choices: roleChoice
                },
                {
                    name: "employeeManager",
                    type: "list",
                    message: "Manager: ",
                    choices: managerChoice
                }

            ]).then(function (res) {
                connection.query(`INSERT INTO employee (first_name, last_name, role, manager) VALUES ('${res.employeeFirst}', '${res.employeeLast}', '${res.employeeRole}', '${res.employeeManager}')`, function (err, res) {
                    if (err) throw err;
                    console.log("Employee list updated");
                    runInquiry();
                });
            });
        });
    });
};

function updateRole() {
    var updateEmployeeRole = [];
    connection.query("SELECT last_name FROM employee", function (err, newRole) {
        if (err) throw err;
        for (let i = 0; i < newRole.length; i++) {
            updateEmployeeRole.push(newRole[i].last_name);
        };
        var updatedRole = [];
        connection.query("SELECT title FROM role", function (err, newRole) {
            if (err) throw err;
            for (let i = 0; i < newRole.length; i++) {
                updatedRole.push(newRole[i].title);
            };
            inquirer.prompt([{
                    name: "employeeName",
                    type: "list",
                    message: "Employee: ",
                    choices: updateEmployeeRole
                },
                {
                    name: "updatedRole",
                    type: "list",
                    message: "New role: ",
                    choices: updatedRole
                }

            ]).then(function (res) {
                connection.query(`UPDATE employee SET role = ('${res.updatedRole}')`, function (err, res) {
                    if (err) throw err;
                    console.log("Employee list updated");
                    runInquiry();
                });
            });
        });
    });
};

function exit() {
    inquirer.prompt({
        name: "exit",
        type: "confirm",
        message: "Close application?"
    }).then(function (res) {
        if (res.exit === true) {
            connection.end();
        } else {
            runInquiry();
        };
    });
};