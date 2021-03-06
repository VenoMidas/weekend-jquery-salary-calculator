// console.log('client.js sourced');
// call readyNow after document is ready
$(document).ready(readyNow);
/**
 * Runs when document is ready, prepares click handlers
 */
function readyNow() {
    // console.log('jQuery sourced');
    // click handlers
    $('#add-employee-submit').on('click', addEmployee);
    $('body').on('click', '.delete-employee', deleteEmployee);
    $('#submit-monthly-budget').on('click', updateMonthlyBudget);
};
// array for employees
const employees = [];
// global variable declarations
let employeeFirstName;
let employeeLastName;
let employeeID;
let employeeTitle;
let employeeAnnualSalary;
let monthlyBudget = 20000;
/**
 * Gathers input data for employee object
 * Calls createEmployee with input data
 * Clears input fields
 * Appends employee data to table
 * Updates total monthly cost
 * @returns An alert if conditions are met
 */
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
    if (employeeFirstName === '' || employeeLastName === '' || employeeID === '' || employeeTitle === '' || employeeAnnualSalary === '') {
        alert('Please fill out all employee fields!');
        return;
    };
    if (isNaN(employeeAnnualSalary)) {
        alert('Please enter only numbers for employee salary!');
        return;
    };
    createEmployee(employeeFirstName, employeeLastName, employeeID, employeeTitle, employeeAnnualSalary);
    clearInputFields();
    appendEmployeeTable();
    updateTotalMonthly();
};
/**
 * Takes employee input data, creates an object, pushes object to array
 * @param {string} firstName - is for employee first name
 * @param {string} lastName - is for employee last name
 * @param {string} ID - is for employee ID
 * @param {string} title - is for employee title
 * @param {number} annualSalary - is for employee annual salary
 */
function createEmployee(firstName, lastName, ID, title, annualSalary) {
    // console.log('In createEmployee');
    let employee = {
        firstName: firstName,
        lastName: lastName,
        id: ID,
        title: title,
        salary: annualSalary,
    };
    // console.log(employee);
    employees.push(employee);
    // console.log(employees);
};
/**
 * Clears input fields
 */
function clearInputFields() {
    // console.log('In clearInputFields');
    $('#input-first-name').val('');
    $('#input-last-name').val('');
    $('#input-id').val('');
    $('#input-title').val('');
    $('#input-annual-salary').val('');
};
/**
 * Empties table, loops employees array and appends info to DOM along with a delete button
 */
function appendEmployeeTable() {
    $('#output-employee-table').empty();
    for (let employee of employees) {
        $('#output-employee-table').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td class="salary-cell">$ ${employee.salary}</td>
                <td class="delete-button-cell">
                    <button class="delete-employee">Delete</button>
                </td>
            </tr>
        `);
    };
};
/**
 * Sets totalMonthly to 0, then loops through employees array and updates salary cost and appends to DOM
 * Will also add or remove .red-background based on conditional
 */
function updateTotalMonthly() {
    // console.log('In updateTotalMonthly');
    let totalMonthly = 0;
    for (let employee of employees) {
        // console.log(employee.salary);
        totalMonthly += parseInt(employee.salary);
        // console.log(totalMonthly)
    };
    totalMonthly = (totalMonthly / 12);
    if (totalMonthly > monthlyBudget) {
        $('.output-total-monthly').addClass('red-background');
    } else {
        $('.output-total-monthly').removeClass('red-background');
    };
    totalMonthly = totalMonthly.toFixed(2);
    $('.output-total-monthly').text(`Total Monthly: $${totalMonthly}`);
};
/**
 * Removes employee from array when clicking the delete button
 * Updates total monthly and appends the table
 */
function deleteEmployee() {
    // console.log('In deleteEmployee');
    let employee = $('.delete-employee').index(this);
    // console.log('This is the employee you clicked', employee);
    // console.log('This is the array before removing', employees);
    removeFromArray(employees, employee);
    updateTotalMonthly();
    // console.log('This is the array after removing', employees);
    appendEmployeeTable();
    // $(this).parent().parent().remove();
};
/**
 * Removes employee from the array
 * @param {Object[]} array - Is for the employees array
 * @param {number} search - is for the index of the employee to remove
 */
function removeFromArray(array, search) {
    // console.log('In removeFromArray');
    employees.splice(search, 1);
};
/**
 * Updates the monthly budget
 * @returns an alert if conditions are met
 */
function updateMonthlyBudget() {
    console.log('In updateMonthlyBudget');
    if ($('#input-monthly-budget').val() === '') {
        alert('Please fill out monthly budget field to update!');
        return;
    };
    if (isNaN($('#input-monthly-budget').val())) {
        alert('Please enter only numbers for monthly budget!');
        return;
    };
    monthlyBudget = $('#input-monthly-budget').val();
    updateTotalMonthly();
};