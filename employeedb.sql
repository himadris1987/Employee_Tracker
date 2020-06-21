DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE Departments (
    id INT PRIMARY KEY,
    NAME VARCHAR (100)
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