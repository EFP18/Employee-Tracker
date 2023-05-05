-- Make sure a database with that name doesn't exist, and then create departments_db.
DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

-- Use the database.
USE departments_db;

-- Create a table in this database with 2 rows, id and name.
CREATE TABLE departments (
  department_id INT NOT NULL,
  name VARCHAR(30) NOT NULL
);

DROP DATABASE IF EXISTS roles_db;
CREATE DATABASE roles_db;

USE roles_db;

CREATE TABLE roles(
  job_title VARCHAR(30) NOT NULL,
  role_id INT NOT NULL, 
  -- department_id
  salary INT NOT NULL
);

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
  employee_id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  -- department_id
  -- salary
  managers VARCHAR(30) NOT NULL
);

-- department name is added to the database from inquirer response
