import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function CustomTextarea({label,name, placeholder, style, controlId,handleChange}) {
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Control
      as="textarea"
      placeholder={placeholder}
      style={style}
     onChange={handleChange} 
     name={name}
    />
  </FloatingLabel>
  )
}

export default CustomTextarea