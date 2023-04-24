import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function CustomTextarea({label,name, placeholder, style, controlId,handleChange,data_error}) {
  return (
    <div className="single-form form-group">
    <textarea
      name={name}
      placeholder={placeholder}
      data-error={data_error}
      required="required"
      defaultValue={""}
      onChange={handleChange}
    />
    <div className="help-block with-errors" />
  </div>
  )
}

export default CustomTextarea