const connection = require("./connections");
const inquirer = require("inquirer");
// following  functions are for viewing adding and updating the various departments, roles, epmployees. 
function updateRole(chosenOne) {
  return inquirer
    .prompt({
      name: "newRole",
      type: "input",
      message: "enter new role id",
    })
    .then((response2) => {
      connection.query(
        `UPDATE employee SET role_id = "${response2.newRole} " WHERE first_name  = "${chosenOne}"`
      );
      console.table("you Updated Employee Role!");
    });
}
async function viewAllDepartments() {
  const departmentArray = [];
  const res = await connection.promise().query("SELECT * from department");
  res[0].forEach((depart, i) => departmentArray.push(res[0][i]));
  return departmentArray;
}
async function viewAllRoles() {
  const allRolesArray = [];
  const res = await connection.promise().query("SELECT * from role");
  res[0].forEach((role, i) => allRolesArray.push(res[0][i].title));
  return allRolesArray;
}
async function viewAllEmployees() {
  const allEmployeesArray = [];
  const res = await connection
    .promise()
    .query(
      "SELECT CONCAT(first_name, ' ', last_name) AS name, c.* FROM employee c"
    );
  res[0].forEach((role, i) => allEmployeesArray.push(res[0][i].name));
  return allEmployeesArray;
}
async function addDepartment() {
  await inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "Enter the deparment name.",
    })
    .then((response) => {
      connection.query(
        `insert into department (name) values ("${response.departmentName}");`,
        (err, res) => {
          if (err) return err;
          console.log("\n DEPARTMENT ADDED...\n ");
        }
      );
    });
}
async function addRole() {
  const role = [];
  await inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the role.",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter salary.",
      },
      {
        name: "departmentId",
        type: "input",
        message: "Enter department id.",
      },
    ])
    .then((response) => {
      role.push(response);
      const res = connection
        .promise()
        .query(
          `insert into role (title, salary, department_id) values ("${role[0].title}", "${role[0].salary}", "${role[0].departmentId}");`
        );
      console.log("we did it");
    });
}
async function addEmployee() {
  const employee = [];
  await inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter first name.",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter last name.",
      },
      {
        name: "roleId",
        type: "input",
        message: "Enter role id.",
      },
    ])
    .then((response) => {
      employee.push(response);
      const res = connection
        .promise()
        .query(
          `insert into employee (first_name, last_name, role_id) values ("${employee[0].firstName}", "${employee[0].lastName}", "${employee[0].roleId}");`
        );
      console.log("we did it");
    });
}
async function updateEmployeeRole() {
  const allEmployees = await viewAllEmployees();

  const response = await inquirer.prompt({
    name: "employees",
    type: "list",
    message: "choose the employee to update",
    choices: allEmployees,
  });
  await updateRole(response.employees.split(" ")[0]);
  console.log("hello");
}
async function empByDept() {
  const employee = [];
  const res = await connection
    .promise()
    .query(
      `SELECT employee.role_id , role.title , employee.first_name , employee.last_name FROM role INNER JOIN employee ON role.department_id = employee.role_id;`
    );
  console.table(res[0]);
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  empByDept,
};
