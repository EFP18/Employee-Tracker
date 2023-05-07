-- Make sure a database with that name doesn't exist, and then create departments_db.
DROP DATABASE IF EXISTS employeeDatabase_db;
CREATE DATABASE employeeDatabase_db;

-- Use the database.
USE employeeDatabase_db;

-- Create a table in this database with 2 rows, id and name.
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL, 
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id), 
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  -- manager id can be NULL if the employee has no manager.
  manager_id INT,
  PRIMARY KEY (id), 
  FOREIGN KEY (manager_id)
  REFERENCES role(id)
);


