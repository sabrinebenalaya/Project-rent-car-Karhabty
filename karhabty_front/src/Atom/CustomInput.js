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
    <Form.Group className="mb-3" style={style}>
      <Form.Label>{titelFieald}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default CustomInput;
