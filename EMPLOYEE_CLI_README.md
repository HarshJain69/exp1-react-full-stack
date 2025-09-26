# Employee Management CLI Application

A simple Node.js command-line interface (CLI) application for managing employee records. The application stores employee data in memory during the session and provides interactive functionality to add, list, and remove employees.

## Features

- **Add Employee**: Add a new employee with name and ID
- **List Employees**: Display all employees in a formatted table
- **Remove Employee**: Remove an employee by their ID
- **Input Validation**: Prevents duplicate IDs and empty fields
- **Interactive Menu**: Easy-to-use command-line interface

## How to Run

1. Make sure you have Node.js installed on your system
2. Navigate to the project directory
3. Run the application using one of these methods:

```bash
# Method 1: Direct execution
node employee-manager.js

# Method 2: If file is executable
./employee-manager.js
```

## Usage

Once the application starts, you'll see a menu with the following options:

```
=== Employee Management System ===
1. Add Employee
2. List All Employees
3. Remove Employee by ID
4. Exit
=====================================
```

### Adding an Employee
- Select option 1
- Enter the employee's name when prompted
- Enter a unique employee ID when prompted
- The system will confirm successful addition

### Listing Employees
- Select option 2
- View all employees in a formatted table showing ID and Name
- See the total count of employees

### Removing an Employee
- Select option 3
- Enter the ID of the employee you want to remove
- The system will confirm successful removal

### Exiting
- Select option 4 or press Ctrl+C to exit the application

## Technical Details

- **Built with**: Node.js built-in modules only
- **Dependencies**: None (uses only built-in `readline` module)
- **Data Storage**: In-memory array (data is lost when application closes)
- **Input Handling**: Interactive prompts using readline interface
- **Error Handling**: Input validation and user-friendly error messages

## Example Session

```
Welcome to Employee Management System!
This application helps you manage employee records.

=== Employee Management System ===
1. Add Employee
2. List All Employees
3. Remove Employee by ID
4. Exit
=====================================
Please select an option (1-4): 1
Enter employee name: John Doe
Enter employee ID: 001

Employee "John Doe" with ID "001" has been added successfully!

=== Employee Management System ===
1. Add Employee
2. List All Employees
3. Remove Employee by ID
4. Exit
=====================================
Please select an option (1-4): 2

=== Employee List ===
ID		Name
--		----
001		John Doe

Total employees: 1
```

## Notes

- Employee IDs must be unique
- All data is stored in memory and will be lost when the application closes
- The application handles graceful shutdown with Ctrl+C
- Input validation prevents empty names and IDs