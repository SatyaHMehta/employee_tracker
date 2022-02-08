const connections = require("./db/connections");
const dbQueries = require("./db/dbQueries");
const mainMenu = require("./db/mainMenu");

// main menu function that will be called again and again after each option is selected.
function mainMainMenu() {
  const result = mainMenu();
  result
    .then(async (response) => {
      switch (response.query) {
        case 1:
          const queriesDepartments = await dbQueries.viewAllDepartments();
          console.table(queriesDepartments);
          break;
        case 2:
          const roles = await dbQueries.viewAllRoles();
          console.log(roles);
          break;
        case 3:
          const employees = await dbQueries.viewAllEmployees();
          console.log(employees);
          break;
        case 4:
          await dbQueries.addDepartment();
          break;
        case 5:
          await dbQueries.addRole();
          break;
        case 6:
          await dbQueries.addEmployee();
          break;
        case 7:
          await dbQueries.updateEmployeeRole();
          break;
        case 8:
          await dbQueries.empByDept();
          break;
        case 9:
          process.exit(0);
      }
    })
    .then(() => mainMainMenu());
}
mainMainMenu();
