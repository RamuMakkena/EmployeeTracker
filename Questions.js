const inquire = require('inquirer');
const validator = require('validator');
const dbOps = require('./db/dbOperations.js');

let getDepartments = async function () {
    console.log('we here now');
    return Array.from(await dbOps.getDepartments());
}

// choices: [ 'Update Employee Role'],

const beginingQuestion = {
    type: 'list',
    name: 'initialQuestion',
    message: 'What would you like to do?',
    choices: ['Add Employee', 'Add Role', 'Add Department', 'View All Departments','View All Roles','View All Employees', 'Update Employee Role', 'View All Managers'],
    default: 'Add Employee'
};

//Dept name

const departmentNameQuestion = {
    type: 'input',
    name: 'departName',
    message: 'Enter Department Name? ',
    validate: departNameInput => {
        if (!validator.isEmpty(departNameInput)) {
            return true;
        } else {
            console.log('Please enter a valid department name ');
            return false;
        }
    }
};

//role name
const roleNameQuestion = {
    type: 'input',
    name: 'roleName',
    message: 'Enter role name? ',
    validate: roleNameInput => {
        if (!validator.isEmpty(roleNameInput)) {
            return true;
        } else {
            console.log('Please enter a valid role name ');
            return false;
        }
    }
};

//salary for role
const salaryForRoleQuestion = {
    type: 'input',
    name: 'salaryForRole',
    message: 'Enter role salary : ',
    validate: salaryForRoleInput => {
        if (!validator.isEmpty(salaryForRoleInput)) {
            return true;
        } else {
            console.log('Please enter valid salary ');
            return false;
        }
    }
};

//Ask employee ID which we need to update
const employeeIdToUpdate = {
    type: 'input',
    name: 'employeeIDInput',
    message: 'Enter employee ID: ',
    validate: employeeFirstNameInput => {
        if (!validator.isEmpty(employeeFirstNameInput)) {
            return true;
        } else {
            console.log('Please enter valid employee ID');
            return false;
        }
    }
};

//Employee first name
const employeeFirstNameQuestion = {
    type: 'input',
    name: 'employeeFirstNameInput',
    message: 'Enter employee First name: ',
    validate: employeeFirstNameInput => {
        if (!validator.isEmpty(employeeFirstNameInput)) {
            return true;
        } else {
            console.log('Please enter valid employee first name ');
            return false;
        }
    }
};

//Employee last name
const employeeLastNameQuestion = {
    type: 'input',
    name: 'employeeLastNameInput',
    message: 'Enter employee Last name: ',
    validate: employeeLastNameInput => {
        if (!validator.isEmpty(employeeLastNameInput)) {
            return true;
        } else {
            console.log('Please enter valid employee last name ');
            return false;
        }
    }
};

//employee role;
const roleForEmployeeQuestion = {
    type: 'input',
    name: 'roleForEmployee',
    message: 'What is employee role : ',
};

//Employee Manager
const employeeManagerQuestion = {
    type: 'input',
    name: 'employeeManagerInput',
    message: 'Who is employee manager : '
};


//function to add department
const addDepartment = async function () {
    console.log('we are here');
    await inquire.prompt([departmentNameQuestion])
        .then((answers) => {
            console.log(answers);
            dbOps.addDepartment(answers.departName);
        });
    startTheApplication();
}

//function to add Employee
const addEmployee = async function () {
    console.log('we are here to add Employee');
    await inquire.prompt([employeeFirstNameQuestion, employeeLastNameQuestion, roleForEmployeeQuestion, employeeManagerQuestion])
        .then((answers) => {
            console.log(answers);
            dbOps.addEmployee(answers.employeeFirstNameInput, answers.employeeLastNameInput, answers.roleForEmployee, (answers.employeeManagerInput ? answers.employeeManagerInput : null));
        });
    startTheApplication();
}

//function to update employee role
const updateEmployeeRole = async function () {
    console.log('we are here to update Employee role');
    await inquire.prompt([employeeIdToUpdate,roleForEmployeeQuestion ])
        .then((answers) => {
            console.log(answers);
            dbOps.updateEmployeeRole(answers.employeeIDInput, answers.roleForEmployee);
        });
    startTheApplication();
}

const getAllManagers = async function () {
    console.log('we are here to update Employee role');
    dbOps.getManagers();
    startTheApplication();
}

async function getAllDepartments() {
    console.log('we are here to get depat');
    return Array.from(await dbOps.getDepartments());
    // startTheApplication();
}

// let listOfDepartments = getAllDepartments();



const addRole = async function () {
    console.log('we are here to add Role');
    let departments = await getAllDepartments();
    let departmentForRoleQuestion = {
        type: 'list',
        name: 'departmentForRole',
        message: 'Which department does this role belongs to : ',
        choices: departments,
    };
    await inquire.prompt([roleNameQuestion, salaryForRoleQuestion, departmentForRoleQuestion])
        .then(async (answers) =>  {
            let deprtment_id = await dbOps.getDepartmentIDByName(answers.departmentForRole);
            console.log('department received : '+ deprtment_id);
            dbOps.addRole(answers.roleName, answers.salaryForRole,  deprtment_id);
        });
    startTheApplication();
}

const getAllRoles = async function () {
    dbOps.getRoles();
    startTheApplication();
}


const getAllEmployees = async function () {
    dbOps.getEmployees();
    startTheApplication();
}


const startTheApplication = async function () {
    await inquire.prompt(beginingQuestion)
        .then((answers) => {
            console.log(answers);
            switch (answers.initialQuestion) {
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'View All Departments':
                    getDepartments();
                    break;
                case 'View All Roles':
                    getAllRoles();
                    break;
                case 'View All Employees':
                    getAllEmployees();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Managers':
                    getAllManagers();
                    break;
            }
        });

}


module.exports = {
    startTheApplication: startTheApplication
};