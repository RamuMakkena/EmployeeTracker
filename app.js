const inquire = require('inquirer');
const validator = require('validator');
const dbOps = require('./db/dbOperations.js');
const cTable = require('console.table');

let getDepartments = async function () {
    console.log(cTable.getTable(await dbOps.getDepartments()));  
}

// choices: [ 'Update Employee Role'],

const beginingQuestion = {
    type: 'list',
    name: 'initialQuestion',
    message: 'What would you like to do?',
    choices: ['Add Employee', 'Add Role', 'Add Department', 'View All Departments','View All Roles','View All Employees', 'Update Employee Role', 'View All Managers','update manager', 'exit'],
    pageSize: 10,
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





//function to add department
const addDepartment = async function () {
    await inquire.prompt([departmentNameQuestion])
        .then((answers) => {
            dbOps.addDepartment(answers.departName);
        });
}



//function to update employee role
const updateEmployeeRole = async function () {
    let rolesList = (await dbOps.getRoles()).map(row => row.title);
    let roleForEmployeeQuestion = {
        type: 'list',
        name: 'roleForEmployee',
        message: 'What is employee role : ',
        choices: rolesList,
        default: rolesList[0]
    };

    await inquire.prompt([employeeIdToUpdate,roleForEmployeeQuestion ])
        .then(async (answers) => {
           let roleName= answers.roleForEmployee;
           let roleId = await dbOps.getRoleIDByTitle(roleName);
           dbOps.updateEmployeeRole(answers.employeeIDInput, roleId);
        });
    }

    //function to update employee role
const updateEmployeeManager = async function () {
    let managersList = (await dbOps.getManagers()).map(row => row.first_name+','+row.last_name);
             //Employee Manager
            const employeeManagerQuestion = {
                type: 'list',
                name: 'employeeManagerInput',
                message: 'Who is employee manager : ',
                choices: managersList,
                default: ''
            };

    await inquire.prompt([employeeIdToUpdate,employeeManagerQuestion ])
        .then(async (answers) => {
            let managerName = answers.employeeManagerInput ? await dbOps.geEmployeeIDByName(answers.employeeManagerInput ) : null;
           dbOps.updateEmployeeManager(answers.employeeIDInput, managerName);
        });
    }



//get a;; ,
const getAllManagers = async function () {
    return await dbOps.getManagers();
    }

async function getAllDepartments() {
    return Array.from(await dbOps.getDepartments());
    
}

const addRole = async function () {
    let departments = await getAllDepartments();
    let departmentForRoleQuestion = {
        type: 'list',
        name: 'departmentForRole',
        message: 'Which department does this role belongs to : ',
        choices: departments,
        default: departments[0]
    };
    await inquire.prompt([roleNameQuestion, salaryForRoleQuestion, departmentForRoleQuestion])
        .then(async (answers) =>  {
            let deprtment_id = await dbOps.getDepartmentIDByName(answers.departmentForRole);
            dbOps.addRole(answers.roleName, answers.salaryForRole,  deprtment_id);
        });
    
}


const getAllRoles = async function () {
    console.log(cTable.getTable(await dbOps.getRoles()));
    
}


//function to add Employee
const addEmployee = async function () {
    let rolesList = (await dbOps.getRoles()).map(row => row.title);
    let managersList = (await dbOps.getEmployees()).map(row => row.first_name+','+row.last_name);
    managersList.push('none');

        //employee role;
        let roleForEmployeeQuestion = {
            type: 'list',
            name: 'roleForEmployee',
            message: 'What is employee role : ',
            choices: rolesList,
            default: rolesList[0]
        };

                    //Employee Manager
            const employeeManagerQuestion = {
                type: 'list',
                name: 'employeeManagerInput',
                message: 'Who is employee manager : ',
                choices: managersList,
                default: ''
            };
    await inquire.prompt([employeeFirstNameQuestion, employeeLastNameQuestion, roleForEmployeeQuestion, employeeManagerQuestion])
        .then(async (answers) => {
           let roleName= answers.roleForEmployee;

           let roleId = await dbOps.getRoleIDByTitle(roleName);

           let managerName = answers.employeeManagerInput == 'none'?null: (await dbOps.geEmployeeIDByName(answers.employeeManagerInput ));
           
            dbOps.addEmployee(answers.employeeFirstNameInput, answers.employeeLastNameInput, roleId, managerName);
        });
}

const getAllEmployees = async function () {
    console.log('');
    console.log(cTable.getTable(await dbOps.getEmployees()));
    
}


const startTheApplication = async function () {
    let continueFlow = true;
    while(continueFlow){
    await inquire.prompt(beginingQuestion)
        .then(async (answers) => {
            switch (answers.initialQuestion) {
                case 'Add Employee':
                    await addEmployee();
                    break;
                case 'Add Role':
                    await addRole();
                    break;
                case 'Add Department':
                    await addDepartment();
                    break;
                case 'View All Departments':
                    await  getDepartments(); 
                    break;
                case 'View All Roles':
                    await getAllRoles(); 
                    break;
                case 'View All Employees':
                    await getAllEmployees();
                    break;
                case 'Update Employee Role':
                    await updateEmployeeRole();
                    break;
                case 'View All Managers':
                    console.log(cTable.getTable(await getAllManagers()));     
                    break;
                case 'update manager':
                    await updateEmployeeManager();
                    break;
                case 'exit':
                    continueFlow = false;
                    break;
            }
        });

    }

    return false;
}


 startTheApplication();
