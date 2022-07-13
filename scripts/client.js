// console.log('client.js sourced');

$(document).ready(readyNow);

function readyNow() {
    // console.log('jQuery sourced');
    $('#add-employee-submit').on('click', addEmployee);
};

const employees = [];

let employeeFirstName;
let employeeLastName;
let employeeID;
let employeeTitle;
let employeeAnnualSalary;

function addEmployee() {
    // console.log('In addEmployee');
    employeeFirstName = $('#input-first-name').val();
    // console.log(employeeFirstName);
    employeeLastName = $('#input-last-name').val();
    // console.log(employeeLastName);
    employeeID = $('#input-id').val();
    // console.log(employeeID);
    employeeTitle = $('#input-title').val();
    // console.log(employeeTitle);
    employeeAnnualSalary = $('#input-annual-salary').val();
    // console.log(employeeAnnualSalary);
    createEmployee(employeeFirstName, employeeLastName, employeeID, employeeTitle, employeeAnnualSalary);
    clearInputFields();
};

function createEmployee(firstName, lastName, ID, title, annualSalary) {
    console.log('In createEmployee');
    let employee = {
        firstName: firstName,
        lastName: lastName,
        id: ID,
        title: title,
        salary: annualSalary,
    }
    console.log(employee);
    employees.push(employee);
    console.log(employees);
};

function clearInputFields() {
    console.log('In clearInputFields');
    $('#input-first-name').val('');
    $('#input-last-name').val('');
    $('#input-id').val('');
    $('#input-title').val('');
    $('#input-annual-salary').val('');
};