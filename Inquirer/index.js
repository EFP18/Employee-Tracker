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

function viewAllDepartments() {
  async (req, res) => {
    try {
      const [rows, fields] = await db.query('SELECT * FROM department');
      console.log("works")
    } catch (err) {
      console.log(err);
    }
  }
  
}


printMainMenu();

// Questions for inquirer
// const questions = [{
//   }, 
// {
//   type: 'input',
//   name: 'DepartmentName',
//   message: 'What is the name of the department?',
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },
// {
//   type: 'input',
//   name: 'RoleName',
//   message: 'What is the name of the role?',
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },
// {
//   type: 'input',
//   name: 'RoleSalary',
//   message: 'What is the salary of the role?',
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}},
// {
//   type: 'input',
//   name: 'DepartmentRole',
//   message: 'Which department does the role belong to?',
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },{
//   type: 'input',
//   name: 'EmployeeFirstName',
//   message: "What is the employee's first name?",
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },{
//   type: 'input',
//   name: 'EmployeeLastName',
//   message: "What is the employee's last name?",
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },{
//   type: 'input',
//   name: 'EmployeeRole',
//   message: "What is the employee's role?",
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },{
//   type: 'input',
//   name: 'EmployeeManager',
//   message: "Who is the employee's manager?",
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// },{
//   type: 'input',
//   name: 'UpdateEmployeeRole',
//   message: "Which employee's role would you like to update?",
//   validate: (value) => {if(value){return true;} else {return 'Please select a choice.'}}
// }
// // ,{
// //   type: 'input',
// //   name: 'Department name.',
// //   message: 'What is the name of the department?'
// // },{
// //   type: 'input',
// //   name: 'Department name.',
// //   message: 'What is the name of the department?'
// // },

// ]