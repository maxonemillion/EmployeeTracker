DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    manager VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Web Development");

INSERT INTO role (title, salary, department)
VALUES ("Back-End Developer", "150000", "Web Development");

INSERT INTO employee (first_name, last_name, role, manager);
VALUES ("John", "Doe", "Back-End Developer", "Jim");
