-- Application allows users to view employees by department.

-- SELECT employee.first_name, employee.last_name, role.title, department.name AS Department 
-- FROM employee
-- INNER JOIN role ON employee.role_id = role.id
-- INNER JOIN department ON role.department_id = department.id
-- WHERE department.id = 1
-- GROUP BY employee.id;


-- View the total utilized budget of a department&mdash;
-- in other words, the combined salaries of all employees in that department.


SELECT SUM(role.salary) AS TotalSalaries 
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
WHERE department.id = 1;
