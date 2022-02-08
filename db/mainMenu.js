const inquirer = require("inquirer");
async function mainMenu() {
  const response = await inquirer.prompt({
    type: "list",
    name: "query",
    id: 1,
    message: "what would you like to do?",
    choices: [
      {
        name: "View All Departments?",
        value: 1,
      },
      {
        name: "view all roles",
        value: 2,
        // value:
      },
      {
        name: "view all employees",
        value: 3,
        // value:
      },
      {
        name: "Add a department",
        value: 4,
        // value:
      },
      {
        name: "add a role",
        value: 5,
      },
      {
        name: "add an employee",
        value: 6,
      },
      {
        name: "update an employee role",
        value: 7,
      },
      {
        name: "Employees by Department",
        value: 8,
      },
      {
        name: "exit",
        value: 9,
      }
    ],
  });
  return response;
};

module.exports = mainMenu;
