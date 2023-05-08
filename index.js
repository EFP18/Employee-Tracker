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
  // add a promise in order to use .then (otherwise it calls the function twice)
  db.promise().query('SELECT * FROM department')
  .then((res, err) => {
    if (err) throw (err);
    console.table(res[0]);
  })
  .then(() => {
    printMainMenu();
  })
};

const viewAllRoles = () => {
  db.promise().query('SELECT * FROM role')
  .then((res, err) => {
    if (err) throw (err);
    console.table(res[0]);
  })
  .then(() => {
    printMainMenu();
  })
}

const viewAllEmployees = () => {
  db.promise().query('SELECT * FROM employee')
  .then((res, err) => {
    if (err) throw (err);
    console.table(res[0]);
  })
  .then(() => {
    printMainMenu();
  })
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'DepartmentName',
      message: 'What is the name of the department?'
    })
    .then((answers) => {
      db.query(`INSERT INTO department SET ?`, {name: answers.DepartmentName}, (err, res) => {
        if (err) {console.log(err)};
        console.log(`Department ${answers.DepartmentName} added successfully!`);
      });
    }) 
    .then(() => {
      printMainMenu();
    })
}

const addRole = () => {
  inquirer
    .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?'
    }, 
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?'
    }, 
    {
      type: 'input',
      name: 'department_id', 
      message: 'What department does this role belong to?'
    }])
    .then((answers) => {
      // const { RoleName, salary, department } = answers;
      db.query(`INSERT INTO role SET ?`, 
      {
        title: answers.title, 
        salary: answers.salary, 
        department_id: answers.department_id
      }, 
      (err, res) => {
        if (err) {console.log(err)};
        console.log(`Role ${answers} added successfully!`);
      })
    })
    .then(() => {
      printMainMenu();
    })
}

const addEmployee = () => {
  inquirer
    .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the employee you want to add?'
    }, 
    {
      type: 'input',
      name: 'last_name',
      message: 'What is their last name?'
    }, 
    {
      type: 'input',
      name: 'role_id',
      message: 'What is their role ID?'
    }, 
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is their manager?'
    }])
    .then((answers) => {
      // const { firstName, lastName, role, manager } = answers;
      db.query(`INSERT INTO employee SET ?`, answers, (err, res) => {
        if (err) {console.log(err)};
        console.log(res);
      });
    })
    .then(() => {
      printMainMenu();
    })
};

const updateEmployeeRole = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'update_role',
      message: "Which employee's role would you like to update?",
      choices: [db.query(`SELECT name FROM employee`)]
    })
    .then((answers) => {
      db.query(`INSERT INTO department SET ?`, {name: answers.NewEmployeeName}, (err, res) => {
        if (err) {console.log(err)};
        console.log(res);
      });
    })
    .then(() => {
      printMainMenu();
    })
}

printMainMenu();

