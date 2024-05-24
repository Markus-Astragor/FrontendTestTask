import React from "react";
import "./dist/Input.css";

export default function Input({
  type = "text",
  placeholder = "",
  className = "login-input",
  classNameContainer = "login-input-container",
  callback = () => console.log("test"),
  error = "",
  value = "",
}) {
  return (
    <div className={classNameContainer}>
      <input
        value={value}
        onChange={(e) => callback(e.target.value)}
        placeholder={placeholder}
        type={type}
        className={className}
        required
      />
      <p className="error-paragraph">{error}</p>
    </div>
  );
}
