const mysql = require('mysql2/promise');
const cTable = require('console.table');

const getAllDepartments = 'select * from department';
const getDepartmentIdByName = `select id from department where name = ?`
const getAllRoles = 'select r.id as role_id, r.title, r.salary, d.name as department from role r inner join department d on r.department_id = d.id';
const getAllEmployees = `select emp.id as 'employee id', emp.first_name as 'first name', emp.last_name as 'last name', r.title as 'role', r.salary as 'salary', d.name as department, IFNULL(CONCAT(mgr.first_name,' ', mgr.last_name), 'no manager') as 'Manager'  from employee emp inner join role r on emp.role_id = r.id inner join department d on r.department_id = d.id left join employee mgr on emp.manager_id = mgr.id order by 1`;
const getAllManagers = 'select managers.* from employee managers inner join employee employees on managers.id = employees.manager_id';

const insertIntoDepartment = `insert into department (name) values(?)`;
const insertIntoRole = `insert into role(title, salary, department_id) values (?,?,?) `;
const insertIntoEmployee = `insert into employee(first_name, last_name, role_id, manager_id) values (?,?,?,?) `;

const getEmployeeById = `select * from employee where id=?`;
const getEmployeeByName = `select * from employee where first_name=? and last_name = ?`;
const getEmployeesUnderManager = `select * from employee where manager_id=?`;
// const getEmployeesUnderDepartment = `select * from employee where depat=?`;

const getDepartmentByName = `select * from department where name=?`;
const getDepartmentById = `select * from department where id=?`;

const getRoleIDByName = `select id from role where title=?`;
const getRoleById = `select * from role where id=?`;

const updateEmployeeManager = `update employee set manager_id = ? where id=?`;
const updateEmployeeRoleQuery = `update employee set role_id = ? where id=?`;

const deleteEmployee = `delete from employee where id=?`;
const deleteRole = `delete from role where id=?`;
const deleteDepartment = `delete from department where id=?`;


/**
 * Prepared statements for 
 * 1. Insertion into department
 * 2. Insertion into role
 * 3. Insertion into employee
 * 4. Get all roles
 * 5. Get all departments
 * 6. Get all Employees
 * 7. Get all managers
 * 8. Ger all employees under manager
 * 9. Get all employees under department
 * 10. Delete employee
 * 11. Delete department
 * 12. Delete role
 * 13. Get salaries of all employees salary in a department
 * 14. Update employee manager
 * 15. Get employee by ID
 * 16. Get department by name
 * 17. Get role by name
 * 
 */

const addDepartment = async function (name) {
    mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => conn.query(insertIntoDepartment, name))
    .then( ([rows, fields]) => {
        console.log('department table updated');
      });

}


const addRole = function (title, salary, department_id) {
    const params = [title, salary, department_id];
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => conn.query(insertIntoRole, params))
    .then( ([rows, fields]) => {
        console.log('Role table updated');
      });
}


const addEmployee = function (first_name, last_name, role_id, manager_id) {
    const params = [first_name, last_name, role_id, manager_id];
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => conn.query(insertIntoEmployee, params))
    .then( ([rows, fields]) => {
        console.log('Employee table updated');
      });
}


const updateEmployeeRole = async function (employeeID, role_id) {
    console.log('updating emplyee role'+employeeID+' ', role_id);
    const params = [role_id, employeeID];
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => conn.query(updateEmployeeRoleQuery, params))
    .then( ([rows, fields]) => {
        console.log('Employee updated');
      });
}




const getDepartments = async function() {
    console.log('departments DB oprrations');
    return  mysql.createConnection({
            host: 'localhost',
            // Your MySQL username,
            user: 'root',
            // Your MySQL password
            password: 'gonePUDI@7',
            database: 'employee_db'
        }).then(conn => 
        conn.query(getAllDepartments)
    ).then(([rows, fields]) => {
        const table = cTable.getTable(rows);
        console.log(table);
       return rows.filter(row => row.name); 
    });
}

const getDepartmentIDByName = async function (name) {
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => 
    conn.query(getDepartmentIdByName, name)
).then(([rows, fields]) => {
    console.log( rows[0].id)
   return rows[0].id; 
});
}

const getRoles = async function() {
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => 
    conn.query(getAllRoles)
).then(([rows, fields]) => {
    const table = cTable.getTable(rows);
    console.log(table);
   return rows.filter(row => row.name); 
});
}


const getEmployees = async function() {
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => 
    conn.query(getAllEmployees)
).then(([rows, fields]) => {
    const table = cTable.getTable(rows);
    console.log(table);
   return rows.filter(row => row.first_name); 
});
}

const getManagers = async function() {
    return  mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'gonePUDI@7',
        database: 'employee_db'
    }).then(conn => 
    conn.query(getAllManagers)
).then(([rows, fields]) => {
    const table = cTable.getTable(rows);
    console.log(table);
   return rows.filter(row => row.first_name+','+row.last_name); 
});
}





module.exports = {addDepartment: addDepartment,
    getDepartments: getDepartments,
    addRole: addRole,
addEmployee: addEmployee,
getRoles: getRoles,
getEmployees : getEmployees,
updateEmployeeRole: updateEmployeeRole, getManagers, getDepartmentIDByName}
