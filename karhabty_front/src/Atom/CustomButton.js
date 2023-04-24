import React from "react";
function CustomButton({ type, title, variant, style, handleClick }) {
  return (
    <button className="main-btn" type="submit" onClick={handleClick} style={style}>
      {title}
    </button>
  );
}

export default CustomButton;
