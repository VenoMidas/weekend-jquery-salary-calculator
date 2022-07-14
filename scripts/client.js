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
    appendEmployeeTable();
    updateTotalMonthly();
};

function createEmployee(firstName, lastName, ID, title, annualSalary) {
    // console.log('In createEmployee');
    let employee = {
        firstName: firstName,
        lastName: lastName,
        id: ID,
        title: title,
        salary: annualSalary,
    }
    // console.log(employee);
    employees.push(employee);
    // console.log(employees);
};

function clearInputFields() {
    // console.log('In clearInputFields');
    $('#input-first-name').val('');
    $('#input-last-name').val('');
    $('#input-id').val('');
    $('#input-title').val('');
    $('#input-annual-salary').val('');
};

function appendEmployeeTable() {
    $('#output-employee-table').empty();
    for (let employee of employees) {
        $('#output-employee-table').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td>$ ${employee.salary}</td>
                <td>
                    <button>Delete</button>
                </td>
            </tr>
        `);
    };
};

function updateTotalMonthly() {
    // console.log('In updateTotalMonthly');
    let totalMonthly = 0;
    for (let employee of employees) {
        // console.log(employee.salary);
        totalMonthly += parseInt(employee.salary);
        // console.log(totalMonthly)
    };
    totalMonthly = (totalMonthly / 12);
    if (totalMonthly > 20000) {
        $('.output-total-monthly').addClass('red-background');
    };
    totalMonthly = totalMonthly.toFixed(2);
    $('.output-total-monthly').text(`Total Monthly: $${totalMonthly}`);
};