import React from "react";

import Form from "react-bootstrap/Form";

function CustomInput({
  titelFieald,
  type,
  placeholder,
  name,
  handleChange,
  style,
}) {
  
  return (
    <div className="single-form ">
      <input
      style= {style}
        type={type}
        name={name}
        placeholder={placeholder}
        data-error="Name is required."
        required="required"
        onChange={handleChange}
      />
      <div className="help-block with-errors" />
    </div>
  );
}

export default CustomInput;
