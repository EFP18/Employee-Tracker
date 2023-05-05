-- Make sure a database with that name doesn't exist, and then create departments_db.
DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

-- Use the database.
USE department_db;

-- Create a table in this database with 2 rows, id and name.
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

DROP DATABASE IF EXISTS role_db;
CREATE DATABASE role_db;

USE role_db;

CREATE TABLE role (
  id INT NOT NULL, 
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  -- manager id can be NULL if the employee has no manager.
  manager_id INT,
  PRIMARY KEY (id)
);

FOREIGN KEY (instructor_id)
  REFERENCES instructors(id)
-- department name is added to the database from inquirer response
