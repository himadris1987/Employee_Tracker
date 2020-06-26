DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE Departments (
    id INT NOT NULL Auto_Increment,
    department VARCHAR (100),
    PRIMARY KEY (id)
    
);

CREATE TABLE Roles (
    id INT PRIMARY KEY,
    title VARCHAR (100),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE Employee (
    id INT PRIMARY KEY,
    first_name VARCHAR (100),
    last_name VARCHAR (100),
    middle_initial VARCHAR (1),
    manager_id INT NULL
);