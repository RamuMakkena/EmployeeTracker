const mysql = require('mysql2/promise');
const cTable = require('console.table');
const username = 'employeetracker';
const password =  'Empl0y@e';
const databaseName = 'employee_db';


const getAllDepartments = 'select * from department';
const getDepartmentIdByName = `select id from department where name = ?`
const getAllRoles = 'select r.id as role_id, r.title, r.salary, d.name as department from role r inner join department d on r.department_id = d.id';
const getAllEmployees = `select emp.id as 'employee id', emp.first_name , emp.last_name , r.title as 'role', r.salary as 'salary', d.name as department, IFNULL(CONCAT(mgr.first_name,' ', mgr.last_name), 'no manager') as 'Manager'  from employee emp inner join role r on emp.role_id = r.id inner join department d on r.department_id = d.id left join employee mgr on emp.manager_id = mgr.id order by 1`;
const getAllManagers = 'select distinct managers.* from employee managers inner join employee employees on managers.id = employees.manager_id';

const insertIntoDepartment = `insert into department (name) values(?)`;
const insertIntoRole = `insert into role(title, salary, department_id) values (?,?,?) `;
const insertIntoEmployee = `insert into employee(first_name, last_name, role_id, manager_id) values (?,?,?,?) `;

const getEmployeeByName = `select * from employee where first_name=? and last_name = ?`;
const getEmployeesUnderManager = `select * from employee where manager_id=?`;
// const getEmployeesUnderDepartment = `select * from employee where depat=?`;


const getRoleIDByName = `select id from role where title=?`;

const updateEmployeeManagerQuery = `update employee set manager_id = ? where id=?`;
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
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn => conn.query(insertIntoDepartment, name))
        .then(([rows, fields]) => {
            console.log('department table updated');
        });

}

// Add a role to database
const addRole = function (title, salary, department_id) {
    const params = [title, salary, department_id];
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn => conn.query(insertIntoRole, params))
        .then(([rows, fields]) => {
            console.log('Role table updated');
        });
}

// Add an employee to database
const addEmployee = function (first_name, last_name, role_id, manager_id) {
    const params = [first_name, last_name, role_id, manager_id];
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn => conn.query(insertIntoEmployee, params))
        .then(([rows, fields]) => {
            console.log('Employee table updated');
        });
}

//update employee role
const updateEmployeeRole = async function (employeeID, role_id) {
    const params = [role_id, employeeID];
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn => conn.query(updateEmployeeRoleQuery, params))
        .then(([rows, fields]) => {
            console.log('Employee updated');
        });
}

//update employee manager
const updateEmployeeManager = async function (employeeID, manager_id) {

    const params = [manager_id, employeeID];
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn => conn.query(updateEmployeeManagerQuery, params))
        .then(([rows, fields]) => {
            console.log('Employee updated');
        });
}



//get all departments
const getDepartments = async function () {
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getAllDepartments)
    ).then(([rows, fields]) => {
        return rows.filter(row => row.name);
    });
}

//get department id by its name
const getDepartmentIDByName = async function (name) {
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getDepartmentIdByName, name)
    ).then(([rows, fields]) => {
        return rows[0].id;
    });
}

// get all roles
const getRoles = async function () {
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getAllRoles)
    ).then(([rows, fields]) => {

        return rows;
    });
}

//get RoleID by title

// get all roles
const getRoleIDByTitle = async function (title) {
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getRoleIDByName, title)
    ).then(([rows, fields]) => {
        return rows[0].id;
    });
}


// Print all employees
const getEmployees = async function () {
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getAllEmployees)
    ).then(([rows, fields]) => {
        return rows;
    });
}

// get all managers
const getManagers = async function () {
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getAllManagers)
    ).then(([rows, fields]) => {
        return rows;
    });
}

// get manager/employee ID by name
const geEmployeeIDByName = async function (fullname) {
    let params = fullname.split(',');
    return mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: username,
        // Your MySQL password
        password: password,
        database: databaseName
    }).then(conn =>
        conn.query(getEmployeeByName, params)
    ).then(([rows, fields]) => {
        return rows[0].id;
    });
}




module.exports = {
    addDepartment,
    getDepartments,
    addRole,
    addEmployee,
    getRoles,
    getEmployees,
    updateEmployeeRole,
    getManagers,
    getDepartmentIDByName,
    getRoleIDByTitle,
    geEmployeeIDByName,
    updateEmployeeManager
}
