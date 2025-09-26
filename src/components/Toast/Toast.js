import React from "react";
import "./Toast.css";

const Toast = ({ show, message, type = "success" }) => {
  if (!show) return null;

  const getToastIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "✅";
    }
  };

  const getToastClass = () => {
    return `toast toast-${type} ${show ? "toast-show" : ""}`;
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-content">
        <span className="toast-icon">{getToastIcon()}</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
