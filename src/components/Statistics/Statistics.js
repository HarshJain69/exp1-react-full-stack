import React from "react";
import "./Statistics.css";

const Statistics = ({ employees }) => {
  const getStatistics = () => {
    if (employees.length === 0) {
      return {
        totalEmployees: 0,
        departments: {},
        averageSalary: 0,
        totalSalaryBudget: 0,
        recentHires: 0,
      };
    }

    const departments = {};
    let totalSalary = 0;
    let salaryCount = 0;
    let recentHires = 0;

    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    employees.forEach((emp) => {
      // Department count
      departments[emp.department] = (departments[emp.department] || 0) + 1;

      // Salary calculations
      if (emp.salary && !isNaN(emp.salary)) {
        totalSalary += Number(emp.salary);
        salaryCount++;
      }

      // Recent hires (added in last 30 days)
      if (emp.dateAdded && new Date(emp.dateAdded) > thirtyDaysAgo) {
        recentHires++;
      }
    });

    return {
      totalEmployees: employees.length,
      departments,
      averageSalary: salaryCount > 0 ? totalSalary / salaryCount : 0,
      totalSalaryBudget: totalSalary,
      recentHires,
    };
  };

  const stats = getStatistics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDepartmentIcon = (department) => {
    const icons = {
      Engineering: "💻",
      Marketing: "📢",
      Sales: "💼",
      "Human Resources": "👥",
      Finance: "💰",
      Operations: "⚙️",
      "Customer Support": "🎧",
      "Product Management": "📊",
    };
    return icons[department] || "📋";
  };

  const topDepartments = Object.entries(stats.departments)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h3 className="stats-title">
          <span className="stats-icon">📈</span>
          Company Statistics
        </h3>
      </div>

      <div className="stats-grid">
        {/* Total Employees */}
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>

        {/* Recent Hires */}
        <div className="stat-card success">
          <div className="stat-icon">🆕</div>
          <div className="stat-content">
            <div className="stat-number">{stats.recentHires}</div>
            <div className="stat-label">Recent Hires (30 days)</div>
          </div>
        </div>

        {/* Average Salary */}
        <div className="stat-card warning">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <div className="stat-number">
              {stats.averageSalary > 0
                ? formatCurrency(stats.averageSalary)
                : "N/A"}
            </div>
            <div className="stat-label">Average Salary</div>
          </div>
        </div>

        {/* Total Budget */}
        <div className="stat-card info">
          <div className="stat-icon">🏦</div>
          <div className="stat-content">
            <div className="stat-number">
              {stats.totalSalaryBudget > 0
                ? formatCurrency(stats.totalSalaryBudget)
                : "N/A"}
            </div>
            <div className="stat-label">Total Salary Budget</div>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      {Object.keys(stats.departments).length > 0 && (
        <div className="departments-section">
          <h4 className="section-title">
            <span className="section-icon">🏢</span>
            Department Breakdown
          </h4>

          <div className="departments-list">
            {topDepartments.map(([dept, count]) => {
              const percentage = ((count / stats.totalEmployees) * 100).toFixed(
                1
              );
              return (
                <div key={dept} className="department-item">
                  <div className="dept-header">
                    <span className="dept-icon">{getDepartmentIcon(dept)}</span>
                    <span className="dept-name">{dept}</span>
                    <span className="dept-count">{count}</span>
                  </div>
                  <div className="dept-bar">
                    <div
                      className="dept-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="dept-percentage">{percentage}%</div>
                </div>
              );
            })}

            {Object.keys(stats.departments).length > 3 && (
              <div className="more-departments">
                <span className="more-text">
                  +{Object.keys(stats.departments).length - 3} more departments
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Insights */}
      {stats.totalEmployees > 0 && (
        <div className="insights-section">
          <h4 className="section-title">
            <span className="section-icon">💡</span>
            Quick Insights
          </h4>

          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-icon">🎯</span>
              <span className="insight-text">
                {Object.keys(stats.departments).length} departments active
              </span>
            </div>

            {stats.recentHires > 0 && (
              <div className="insight-item">
                <span className="insight-icon">📈</span>
                <span className="insight-text">
                  Growing team with {stats.recentHires} new hire
                  {stats.recentHires > 1 ? "s" : ""} this month
                </span>
              </div>
            )}

            {topDepartments.length > 0 && (
              <div className="insight-item">
                <span className="insight-icon">🏆</span>
                <span className="insight-text">
                  {topDepartments[0][0]} is the largest department (
                  {topDepartments[0][1]} employees)
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
