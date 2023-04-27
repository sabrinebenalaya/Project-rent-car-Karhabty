import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/actionAuth";
import { useDispatch } from "react-redux";
function CustomNavBarUser({  username, role }) {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav
      aria-label="breadcrumb"
      className="rounded-3 p-3 mb-4 container mt-2"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fffaf6",
      }}
    >
      {role === "Agency" && (
        <>
          <Link style={{ color: "red" }} to="/">
            Annoucements
          </Link>

          <Link style={{ color: "red" }} to="ordersAgency">
            Orders 
          </Link>
        </>
      )}
      {role == "User" && (<Link style={{ color: "red" }} to="orders">
        Orders
      </Link>)}
      

      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="profil/" style={{ marginRight: "10px", color: "red" }}>
          {username}
        </Link>
        <Link
          style={{ color: "red" }}
          to="/"
          onClick={() => dispatch(logOut(navigate))}
        >
          Log out
        </Link>
      </div>
    </nav>
  );
}

export default CustomNavBarUser;
