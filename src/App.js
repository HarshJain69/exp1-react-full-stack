import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Statistics from "./components/Statistics/Statistics";
import Toast from "./components/Toast/Toast";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      const parsedEmployees = JSON.parse(savedEmployees);
      setEmployees(parsedEmployees);
      setFilteredEmployees(parsedEmployees);
    }
  }, []);

  // Save employees to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
    setFilteredEmployees(
      employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [employees, searchTerm]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const addEmployee = (newEmployee) => {
    // Check for duplicate ID
    const existingEmployee = employees.find((emp) => emp.id === newEmployee.id);
    if (existingEmployee) {
      showToast("Employee with this ID already exists!", "error");
      return false;
    }

    const employeeWithTimestamp = {
      ...newEmployee,
      dateAdded: new Date().toISOString(),
    };

    setEmployees((prev) => [...prev, employeeWithTimestamp]);
    showToast("Employee added successfully!");
    return true;
  };

  const updateEmployee = (updatedEmployee) => {
    // Check for duplicate ID (excluding current employee)
    const existingEmployee = employees.find(
      (emp) => emp.id === updatedEmployee.id && emp.id !== editingEmployee.id
    );
    if (existingEmployee) {
      showToast("Employee with this ID already exists!", "error");
      return false;
    }

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmployee.id
          ? { ...updatedEmployee, dateAdded: emp.dateAdded }
          : emp
      )
    );
    setEditingEmployee(null);
    showToast("Employee updated successfully!");
    return true;
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    showToast("Employee deleted successfully!");
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const exportEmployees = () => {
    const dataStr = JSON.stringify(employees, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `employees-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    showToast("Employee data exported successfully!");
  };

  const importEmployees = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedEmployees = JSON.parse(e.target.result);
        if (Array.isArray(importedEmployees)) {
          setEmployees(importedEmployees);
          showToast(
            `Imported ${importedEmployees.length} employees successfully!`
          );
        } else {
          showToast("Invalid file format!", "error");
        }
      } catch (error) {
        showToast("Error reading file!", "error");
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = "";
  };

  return (
    <div className="App">
      <Header
        onSearch={handleSearch}
        onExport={exportEmployees}
        onImport={importEmployees}
        employeeCount={employees.length}
      />

      <main className="main-content">
        <div className="container">
          <div className="app-grid">
            <div className="form-section">
              <EmployeeForm
                onSubmit={editingEmployee ? updateEmployee : addEmployee}
                employee={editingEmployee}
                onCancel={handleCancelEdit}
                isEditing={!!editingEmployee}
              />
              <Statistics employees={employees} />
            </div>

            <div className="list-section">
              <EmployeeList
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={deleteEmployee}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </main>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default App;
