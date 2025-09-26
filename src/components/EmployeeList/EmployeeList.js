import React, { useState } from "react";
import "./EmployeeList.css";

const EmployeeList = ({ employees, onEdit, onDelete, searchTerm }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedEmployees = () => {
    if (!sortConfig.key) return employees;

    return [...employees].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleDeleteClick = (employee) => {
    setShowConfirmDelete(employee);
  };

  const confirmDelete = () => {
    if (showConfirmDelete) {
      onDelete(showConfirmDelete.id);
      setShowConfirmDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return "↕️";
    }
    return sortConfig.direction === "asc" ? "⬆️" : "⬇️";
  };

  const sortedEmployees = getSortedEmployees();

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <h2 className="list-title">
          <span className="list-icon">📋</span>
          Employee Directory
          {searchTerm && (
            <span className="search-indicator">
              - Showing results for "{searchTerm}"
            </span>
          )}
        </h2>
        <div className="list-stats">
          <span className="stats-text">
            Showing {employees.length} employee
            {employees.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3 className="empty-title">
            {searchTerm ? "No employees found" : "No employees yet"}
          </h3>
          <p className="empty-description">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "Add your first employee using the form above"}
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("id")}
                >
                  <span>ID {getSortIcon("id")}</span>
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("name")}
                >
                  <span>Name {getSortIcon("name")}</span>
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("email")}
                >
                  <span>Email {getSortIcon("email")}</span>
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("department")}
                >
                  <span>Department {getSortIcon("department")}</span>
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("position")}
                >
                  <span>Position {getSortIcon("position")}</span>
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("salary")}
                >
                  <span>Salary {getSortIcon("salary")}</span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => (
                <tr key={employee.id} className="employee-row">
                  <td className="id-cell">
                    {highlightSearchTerm(employee.id)}
                  </td>
                  <td className="name-cell">
                    <div className="name-container">
                      <span className="name-text">
                        {highlightSearchTerm(employee.name)}
                      </span>
                      {employee.phone && (
                        <span className="phone-text">📞 {employee.phone}</span>
                      )}
                    </div>
                  </td>
                  <td className="email-cell">
                    <a href={`mailto:${employee.email}`} className="email-link">
                      {highlightSearchTerm(employee.email)}
                    </a>
                  </td>
                  <td className="department-cell">
                    <span
                      className={`department-badge dept-${employee.department
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {highlightSearchTerm(employee.department)}
                    </span>
                  </td>
                  <td className="position-cell">
                    {highlightSearchTerm(employee.position)}
                  </td>
                  <td className="salary-cell">
                    {formatSalary(employee.salary)}
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button
                        onClick={() => onEdit(employee)}
                        className="action-btn edit-btn"
                        title="Edit Employee"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee)}
                        className="action-btn delete-btn"
                        title="Delete Employee"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <h3 className="modal-title">
                <span className="modal-icon">⚠️</span>
                Confirm Delete
              </h3>
            </div>
            <div className="modal-content">
              <p>
                Are you sure you want to delete employee{" "}
                <strong>{showConfirmDelete.name}</strong>?
              </p>
              <p className="modal-subtitle">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
