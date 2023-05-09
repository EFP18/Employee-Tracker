INSERT INTO department (name)
VALUES  ("Sales"),
        ("Management"),
        ("Customer Service"),
        ("Finance"),
        ("HR"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Rep", 50.000, 1),
        ("CFO", 80.000, 2),
        ("Sales Manager", 80.000, 2),
        ("Customer Service Rep", 40.000, 3),
        ("Accountant", 60.000, 4),
        ("HR Manager", 60.000, 5),
        ("Data Analyst", 60.000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Ester", "Pelosof", 1),
        ("Sarah", "Pelosof", 2),
        ("Bo", "Arrington", 4),
        ("John", "Doe", 5),
        ("Aaron", "Sampson", 5),
        ("Colin", "Leah", 3),
        ("Ben", "Carter", 6),
        ("Jim", "Harper", 7);



