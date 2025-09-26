import React, { useState, useEffect } from "react";
import "./EmployeeForm.css";

const EmployeeForm = ({ onSubmit, employee, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        id: "",
        name: "",
        email: "",
        department: "",
        position: "",
        phone: "",
        salary: "",
      });
    }
    setErrors({});
  }, [employee]);

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Operations",
    "Customer Support",
    "Product Management",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = "Employee ID is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (
      formData.salary &&
      (isNaN(formData.salary) || Number(formData.salary) < 0)
    ) {
      newErrors.salary = "Please enter a valid salary amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = onSubmit(formData);

    if (success && !isEditing) {
      // Reset form only when adding new employee
      setFormData({
        id: "",
        name: "",
        email: "",
        department: "",
        position: "",
        phone: "",
        salary: "",
      });
    }
  };

  const handleReset = () => {
    if (isEditing) {
      onCancel();
    } else {
      setFormData({
        id: "",
        name: "",
        email: "",
        department: "",
        position: "",
        phone: "",
        salary: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="employee-form-container">
      <div className="form-header">
        <h2 className="form-title">
          <span className="form-icon">{isEditing ? "✏️" : "➕"}</span>
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="id" className="form-label">
              Employee ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`form-input ${errors.id ? "error" : ""}`}
              placeholder="e.g., EMP001"
              disabled={isEditing}
            />
            {errors.id && <span className="error-message">{errors.id}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="name@company.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "error" : ""}`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department <span className="required">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`form-input ${errors.department ? "error" : ""}`}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="error-message">{errors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="position" className="form-label">
              Position <span className="required">*</span>
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`form-input ${errors.position ? "error" : ""}`}
              placeholder="e.g., Senior Developer"
            />
            {errors.position && (
              <span className="error-message">{errors.position}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary" className="form-label">
              Annual Salary (USD)
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={`form-input ${errors.salary ? "error" : ""}`}
              placeholder="e.g., 75000"
              min="0"
            />
            {errors.salary && (
              <span className="error-message">{errors.salary}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            {isEditing ? "Cancel" : "Reset"}
          </button>

          <button type="submit" className="btn btn-primary">
            <span className="btn-icon">{isEditing ? "💾" : "➕"}</span>
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
