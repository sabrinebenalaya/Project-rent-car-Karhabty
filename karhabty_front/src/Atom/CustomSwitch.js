import React from "react";
import { MDBSwitch } from "mdb-react-ui-kit";

function CustomSwitch({ id, label, name, handelClick }) {
  return <MDBSwitch id={id} label={label} name={name} onClick={handelClick} />;
}

export default CustomSwitch;
