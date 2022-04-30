const inquire = require('inquirer');
const validator = require('validator');

let listOfDepartments = getDepartmentsList();
let managersList = getManagers();
// all questions required for user entries
const teamNameQuestion =     {
    type: 'list',
    name: 'initialQuestion',
    message:'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles','Add Role', 'View All Departments', 'Add Department'],
    default: 'Engineer'
};

const departmentNameQuestion = {
    type: 'input',
    name: 'departName',
    message: 'Enter Department Name? ',
    validate: departNameInput => {
        if(!validator.isEmpty(departNameInput)){
            return true;
        } else{
            console.log('Please enter a valid department name ');
            return false;
        }
    }
};

const roleNameQuestion = {
    type: 'input',
    name: 'roleName',
    message: 'Enter role name? ',
    validate: roleNameInput => {
        if(!validator.isEmpty(roleNameInput)){
            return true;
        } else{
            console.log('Please enter a valid role name ');
            return false;
        }
    }
};

const salaryForRoleQuestion = {
    type: 'input',
    name: 'salaryForRole',
    message: 'Enter role salary : ',
    validate: salaryForRoleInput => {
        if(!validator.isEmpty(salaryForRoleInput)){
            return true;
        } else{
            console.log('Please enter valid salary ');
            return false;
        }
    }  
};

const departmentForRoleQuestion = {
    type: 'list',
    name: 'departmentForRole',
    message: 'Which department does this role belongs to : ',
    choices:  listOfDepartments, 
    default: listOfDepartments[0]
};

const employeeFirstNameQuestion = {
    type: 'input',
    name: 'employeeFirstNameInput',
    message: 'Enter employee First name: ',
    validate: employeeFirstNameInput => {
        if(!validator.isEmpty(employeeFirstNameInput)){
            return true;
        } else{
            console.log('Please enter valid employee first name ');
            return false;
        }
    }
};

const employeeLastNameQuestion = {
    type: 'input',
    name: 'employeeLastNameInput',
    message: 'Enter employee Last name: ',
    validate: employeeLastNameInput => {
        if(!validator.isEmpty(employeeLastNameInput)){
            return true;
        } else{
            console.log('Please enter valid employee last name ');
            return false;
        }
    }
};

const employeeManagerQuestion = {
    type: 'list',
    name: 'employeeManagerInput',
    message: 'Who is employee manager : ',
    choices: managersList,
    default: managersList[0]
};



