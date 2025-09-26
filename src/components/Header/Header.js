import React, { useState } from "react";
import "./Header.css";

const Header = ({ onSearch, onExport, onImport, employeeCount }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">
              <span className="header-icon">👥</span>
              Employee Management System
            </h1>
            <p className="header-subtitle">
              Manage your team efficiently with our modern interface
            </p>
          </div>

          <div className="header-right">
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search employees by name, ID, or department..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button
                  onClick={clearSearch}
                  className="search-clear-btn"
                  style={{ opacity: searchTerm ? 1 : 0 }}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="header-actions">
              <div className="employee-count">
                <span className="count-label">Total Employees:</span>
                <span className="count-number">{employeeCount}</span>
              </div>

              <button onClick={onExport} className="action-btn export-btn">
                <span className="btn-icon">📥</span>
                Export
              </button>

              <label className="action-btn import-btn">
                <span className="btn-icon">📤</span>
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={onImport}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
