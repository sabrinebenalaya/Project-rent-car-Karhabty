import React, { useEffect } from "react";
import { MDBBadge } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { strongText } from "../../Style/Style";
import { isEmpty } from "../../Validator/isEmpty";
import { AiFillStar } from 'react-icons/ai';
function OrderItem({ order, role , agency, announcement, car, reviews}) {


 

  // cast the date of order
  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }

  let orderDate = reverseString(order.date.slice(0, 10));

  //the color of status
  let bgStatus = { color: "", class: "" };
  switch (order.status) {
    case "inactive": // order closed and car is return to the agency
      bgStatus.color = "danger";
      bgStatus.class = "table-danger";
      break;
    case "active": // order active the car is with the user
      bgStatus.color = "success";
      bgStatus.class = "table-success";
      break;
    case "awaiting": // order awaiting the user waite the car
      bgStatus.color = "warning";
      bgStatus.class = "table-warning";
      break;
    default:
      bgStatus.color = "";
      bgStatus.class = "";
      break;
  }

  return (
    <tr className={bgStatus.class}>
      <td>
        <p className="fw-normal mb-1" style={strongText}>
          {order.ref}
        </p>
        <p className="text-muted mb-0">{orderDate}</p>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={order.photo}
            alt="car"
            style={{ width: "100px", height: "100px" }}
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">
              {car.brand},{car.model}
            </p>
            <p className="text-muted mb-0">{agency.agencyName}</p>
          </div>
        </div>
      </td>
      <td>{order.price} Dnt</td>
      <td>
        <MDBBadge color={bgStatus.color} style={{ marginTop: "10px" }}>
          {order.status}
        </MDBBadge>
    
     </td>
    
    </tr>
  );
}

export default OrderItem;
