import React from "react";
import design from "./inputFields.module.css";

export function InputFields({
  placeholder,
  type,
  required = false,
  label,
  id,
  value,
  onChange
}) {
  return (
    <>
      <label htmlFor={label}></label>
      <div className={design.inputFieldContainer}>
        <div className={design.inputWrapper}>
          <input
            className={design.inputField}
            type={type}
            placeholder={placeholder}
            id={id}
            {...(required ? { required: true } : {})}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
