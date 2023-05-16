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
  // inquirer main menu to ask the user what the would like to do
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
        'Update an employee role.',
        'Exit'
      ],
    })
  
    // take the answers and depending on what the user chose, call the respective function
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
    if (options === 'Exit') {
      exitInquirer();
    }
    
  });
  
};

const viewAllDepartments = () => {
  // add a promise in order to use .then (otherwise it calls the function twice)
  db.promise().query('SELECT * FROM department')
  .then((res, err) => {
    if (err) throw (err);
    console.table(res[0]);
    printMainMenu();
  })
};

const viewAllRoles = () => {
  // promisify the query, select everyone, add that to res, and console.table the SQL table.
  db.promise().query('SELECT * FROM role')
  .then((res, err) => {
    if (err) throw (err);
    console.table(res[0]);
    // call back the main menu of inquirer
    printMainMenu();
  })
}

const viewAllEmployees = () => {
  db.promise().query('SELECT * FROM employee')
  .then((res, err) => {
    if (err) throw (err);
    console.table(res[0]);
    printMainMenu();
  })
};

const addDepartment = () => {
  inquirer
  // use inquirer to get the department name
    .prompt({
      type: 'input',
      name: 'DepartmentName',
      message: 'What is the name of the department?'
    })
    .then((answers) => {
      // insert the new name we got into the table
      db.query(`INSERT INTO department SET ?`, {name: answers.DepartmentName}, (err, res) => {
        if (err) {console.log(err)};
        // console log that the department was added succesfully
        console.log(`Department ${answers.DepartmentName} added successfully!`);
        printMainMenu();
      });
    }) 
}

const addRole = () => {
  // query the table to get everything from department
  db.query('SELECT * FROM department', (err, res) => {

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
      type: 'list',
      name: 'departmentId', 
      message: 'What department does this role belong to?', 
      // res comes back as an array
      // loop through the res array and make another one with just the names
      choices: res.map(department => department.name)
    }])
    .then((answers) => {
      // finds a dept name equal to our answer and brings it into the scope of .then
      const chosenDept = res.find(department => department.name === answers.departmentId)

      db.query(`INSERT INTO role SET ?`, 
      {
        title: answers.title, 
        salary: answers.salary, 
        department_id: chosenDept.id
      }, 
      (err, res) => {
        if (err) {console.log(err)};
        console.log(`Role ${answers.title} added successfully!`);
        printMainMenu();
      })
    })
  });
}

const addEmployee = () => {
  db.query('SELECT * FROM role', (err, res) => {

    // nested query so we can use the manager_id
    db.query('SELECT * FROM employee', (err, employeeData) => {

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
        type: 'list',
        name: 'role_id',
        message: 'What is their role?', 
        choices: res.map(({ id, title }) => ({
          value: id,
          name: title
        }))
      }, 
      {
        type: 'list',
        name: 'manager_id',
        message: 'Who is their manager?',
        choices: employeeData.map(({ id, first_name, last_name }) => ({
          value: id,
          name: `${first_name} ${last_name}`
        }))
      }
      ])
      .then((answers) => {
        // find the role where the title equals to the response we got from the choices in the inquirer        
        db.query(`INSERT INTO employee SET ?`, 
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id
        }, 
        (err, res) => {
          if (err) {console.log(err)};
          console.log(`Employee ${answers.first_name + ' ' + answers.last_name} added successfully!`);
          printMainMenu();
        })
      })
    })

  })
};

// update employee function
const updateEmployeeRole = () => {

  db.query('SELECT * FROM employee', (err, res) => {

    inquirer
    .prompt({
      type: 'list',
      name: 'update_role',
      message: "Which employee's role would you like to update?",
      choices: res.map(employee => employee.first_name + ' ' + employee.last_name)
    })
    .then((answers) => {
      const chosenEmployee = res.find(employee => employee.first_name + ' ' + employee.last_name === answers.update_role)
      db.query('SELECT * FROM role', (err, res) => {
        inquirer
        .prompt({
          type: 'list', 
          name: 'role_id',
          message: 'What will their new role ID be?',
          choices: res.map(role => role.title)
          })
        .then(answers => {
          const chosenTitle = res.find(role => role.title === answers.role_id);
          // update the employee based on the response from inquirer
          db.query('UPDATE employee SET role_id = ? WHERE id=?', [chosenTitle.id, chosenEmployee.id]);

          printMainMenu();
          // update employee table and set role_id where it matches the id of the chosen employee
        })
      }) 
    })
  })
}


const exitInquirer = () => {
  // exit function to stop inquirer
  db.end();  
}

printMainMenu();

