-- Application allows users to view employees by department.

SELECT employee.first_name, employee.last_name AS Employee Name 
FROM employee
INNER JOIN department ON employee.id = department.id;
-- GROUP BY department;


-- SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders
-- LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
-- GROUP BY ShipperName;