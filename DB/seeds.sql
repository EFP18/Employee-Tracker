INSERT INTO department (name)
VALUES  ("Sales"),
        ("Management"),
        ("Customer Service"),
        ("Finance"),
        ("HR"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Rep", 50000, 1),
        ("CFO", 80000, 2),
        ("Sales Manager", 80000, 2),
        ("Customer Service Rep", 40000, 3),
        ("Accountant", 60000, 4),
        ("HR Manager", 60000, 5),
        ("Data Analyst", 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Ester", "Pelosof", 1, 2),
        ("Sarah", "Pelosof", 2, 4),
        ("Bo", "Arrington", 4, NULL),
        ("John", "Doe", 5, 4),
        ("Aaron", "Sampson", 5, 3),
        ("Colin", "Leah", 3, 3),
        ("Ben", "Carter", 6, 7),
        ("Jim", "Harper", 7, NULL);



