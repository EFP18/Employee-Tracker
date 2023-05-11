-- Application allows users to view employees by department.

SELECT employee.first_name, employee.last_name, role.title, department.name
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
GROUP BY department.id;

