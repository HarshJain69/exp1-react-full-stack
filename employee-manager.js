#!/usr/bin/env node

const readline = require("readline");

// Employee storage array
let employees = [];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to display menu
function displayMenu() {
  console.log("\n=== Employee Management System ===");
  console.log("1. Add Employee");
  console.log("2. List All Employees");
  console.log("3. Remove Employee by ID");
  console.log("4. Exit");
  console.log("=====================================");
}

// Function to add a new employee
function addEmployee() {
  rl.question("Enter employee name: ", (name) => {
    if (!name.trim()) {
      console.log("Employee name cannot be empty!");
      showMenu();
      return;
    }

    rl.question("Enter employee ID: ", (id) => {
      if (!id.trim()) {
        console.log("Employee ID cannot be empty!");
        showMenu();
        return;
      }

      // Check if employee ID already exists
      const existingEmployee = employees.find((emp) => emp.id === id);
      if (existingEmployee) {
        console.log(`Employee with ID ${id} already exists!`);
        showMenu();
        return;
      }

      // Add new employee
      const newEmployee = {
        id: id.trim(),
        name: name.trim(),
      };

      employees.push(newEmployee);
      console.log(
        `\nEmployee "${name}" with ID "${id}" has been added successfully!`
      );
      showMenu();
    });
  });
}

// Function to list all employees
function listEmployees() {
  console.log("\n=== Employee List ===");

  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    console.log("ID\t\tName");
    console.log("--\t\t----");
    employees.forEach((employee) => {
      console.log(`${employee.id}\t\t${employee.name}`);
    });
    console.log(`\nTotal employees: ${employees.length}`);
  }

  showMenu();
}

// Function to remove employee by ID
function removeEmployee() {
  if (employees.length === 0) {
    console.log("No employees to remove.");
    showMenu();
    return;
  }

  rl.question("Enter employee ID to remove: ", (id) => {
    if (!id.trim()) {
      console.log("Employee ID cannot be empty!");
      showMenu();
      return;
    }

    const employeeIndex = employees.findIndex((emp) => emp.id === id);

    if (employeeIndex === -1) {
      console.log(`Employee with ID ${id} not found!`);
    } else {
      const removedEmployee = employees.splice(employeeIndex, 1)[0];
      console.log(
        `\nEmployee "${removedEmployee.name}" with ID "${id}" has been removed successfully!`
      );
    }

    showMenu();
  });
}

// Function to handle user menu choice
function handleChoice(choice) {
  switch (choice) {
    case "1":
      addEmployee();
      break;
    case "2":
      listEmployees();
      break;
    case "3":
      removeEmployee();
      break;
    case "4":
      console.log("Thank you for using Employee Management System!");
      rl.close();
      process.exit(0);
      break;
    default:
      console.log("Invalid choice! Please select a valid option (1-4).");
      showMenu();
      break;
  }
}

// Function to show menu and get user input
function showMenu() {
  displayMenu();
  rl.question("Please select an option (1-4): ", handleChoice);
}

// Welcome message and start the application
console.log("Welcome to Employee Management System!");
console.log("This application helps you manage employee records.");

// Start the application
showMenu();

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n\nGoodbye! Thank you for using Employee Management System!");
  rl.close();
  process.exit(0);
});
