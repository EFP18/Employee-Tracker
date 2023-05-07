// Node modules
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: 'employeeDatabase_db'
  },
  console.log(`Connected to the employeeDatabase_db database.`)
);

const printMainMenu = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'options',
      message: 'What would you like to do? Choose one of the following options.',
      choices: [
        'View all departments.',
        'View all roles.',
        'View all employees.',
        'Add a department.',
        'Add a role.',
        'Add an employee.',
        'Update an employee role.'
      ],
  // validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}

    })
  
  .then((answers) => {
    const { options } = answers;

    if (options === 'View all departments.') {
      viewAllDepartments();
    }
    if (options === 'View all roles.') {
      viewAllRoles();
    }
    if (options === 'View all employees.') {
      viewAllEmployees();
    }
    if (options === 'Add a department.') {
      addDepartment();
    }
    if (options === 'Add a role.') {
      addRole();
    }
    if (options === 'Add an employee.') {
      addEmployee();
    }
    if (options === 'Update an employee role.') {
      updateEmployeeRole();
    }
    
  });
  
};

const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw (err);
    console.log(res);
  });
  printMainMenu();
};

const viewAllRoles = () => {
  db.query('SELECT * FROM role', (err, res) => {
    if (err) throw (err);
    console.table(res);
    // console.table??
  });
  printMainMenu();
}

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw (err);
    console.log(res);
  });
  printMainMenu();
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'DepartmentName',
      message: 'What is the name of the department?'
    })
    .then((answers) => {
      db.query(`INSERT INTO department SET ?`, answers.DepartmentName, (err, res) => {
        if (err) {console.log(err)};
        console.log(res);
      });
    })

  // viewAllDepartments();
}

const addRole = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'RoleName',
      message: 'What is the name of the role?'
    }, 
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?'
    }, 
    {
      type: 'input',
      name: 'department', 
      message: 'What department does this role belong to?'
    })
    .then((answers) => {
      const { RoleName, salary, department } = req.body;
      db.query(`INSERT INTO role SET ?`, req.body, (err, res) => {
        if (err) {console.log(err)};
        console.log(res);
      });
    })

  // viewAllDepartments();
}

const addEmployee = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the employee you want to add?'
    }, 
    {
      type: 'input',
      name: 'lastName',
      message: 'What is their last name?'
    }, 
    {
      type: 'input',
      name: 'role',
      message: 'What is their job title?'
    }, 
    {
      type: 'input',
      name: 'manager',
      message: 'Who is their manager?'
    })
    .then((answers) => {
      const { firstName, lastName, role, manager } = req.body;
      db.query(`INSERT INTO role SET ?`, req.body, (err, res) => {
        if (err) {console.log(err)};
        console.log(res);
      });
    })
  // viewAllDepartments();
}

const updateEmployeeRole = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'NewEmployeeName',
      message: 'What is the name of the department?'
    })
    .then((answers) => {
      db.query(`INSERT INTO department SET ?`, answers.NewEmployeeName, (err, res) => {
        if (err) {console.log(err)};
        console.log(res);
      });
    })

  // viewAllDepartments();
}

printMainMenu();

