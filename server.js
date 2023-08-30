const inquirer = require("inquirer");
const mysql = require("mysql2");
require('dotenv').config();


//Using .ENV which is in the git ignore for the following. 
//Please update the fields in connection to connect to your mysql database
const connection = mysql.createConnection({
    host: process.env.DB_LOCALHOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    start();
});


function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    connection.end();
                    console.log("Bye!");
                    break;
            }
        });
}


function viewAllDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}


function viewAllRoles() {
    const query = "SELECT * from role";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    const query = "Select * from employee"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Enter the name of the new department:",
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO department (name) VALUES ("${answer.name}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Added department ${answer.name}`);
                start();
            });
        });
}

function addRole() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the title of the new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the salary of the new role:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Select the department for the new role:",
                    choices: res.map(
                        (department) => department.id
                    ),
                },
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.name === answers.department
                );
                const query = "INSERT INTO role SET ?";
                connection.query(
                    query,
                    {
                        job_title: answers.title,
                        salary: answers.salary,
                        dep_id: department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department/`
                        );
                        start();
                    }
                );
            });
    });
}

function addEmployee() {
    
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the first name of the employee: ",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the last name of the employee: ",
        },
        {
            type: "input",
            name: "role",
            message: "Enter Role ID:",
            
        },
        {
            type: "input",
            name: "department",
            message: "Enter Department ID:",
           
        },
      ])
      .then((answers) => {
        const { firstName, lastName,role, department} = answers;
        const query = "INSERT INTO employee (first_name, last_name, role_id, dep_id) VALUES (?, ?, ?,? )";
        connection.query(query, [firstName, lastName,role, department], (err, result) => {
          if (err) {
            console.error("Error", err);
          } else {
            console.log("Employee added successfully!");
            start();
          }
        });
      });
  }


function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "Enter employee ID: ",
        },
        {
          type: "input",
          name: "roleName",
          message: "Enter the name of the new role: ",
        },
      ])
      .then((answers) => {
        const {id, roleName } = answers;
        const findRoleQuery = "SELECT id FROM role WHERE job_title = ?";
        connection.query(findRoleQuery, [roleName], (err, roleResults) => {
          if (err) {
            console.error("Error ", err);
            start();
          } 
            else {
              const newRoleId = roleResults[0].id;
              const updateQuery =
              "UPDATE employee SET role_id = ? WHERE emp_id = ?";
              connection.query(
                updateQuery,
                [newRoleId,id],
                (err, result) => {
                  if (err) {
                    console.error("Error ", err);
                  } else {
                    console.log("Employee role updated.");
                  }
                  start();
                }
              );
            }
          
        });
      });
    }
 
  




process.on("exit", () => {
    connection.end();
});
