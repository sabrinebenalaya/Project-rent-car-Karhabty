import React, { useEffect } from "react";
import { MDBBadge } from "mdb-react-ui-kit";
import { getOne } from "../../Redux/Actions/actionAnnoucement";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";

import { getCar } from "../../Redux/Actions/actionCars";
import { getAgency } from "../../Redux/Actions/actionAgency";
import { getReviewCar } from "../../Redux/Actions/actionRate";
import { strongText } from "../../Style/Style";
function OrderItem({ order }) {
  //get annoucement information
  const dispatch = useDispatch();
  const annoucement = useSelector(
    (state) => state.ReducerAnnoucement.annoucement
  );
  useEffect(() => {
    dispatch(getOne(order.announcement));
  }, [order.announcement, dispatch]);
 
/*
  // get car information

  const car = useSelector((state) => state.ReducerCars.car);
  useEffect(() => {
    dispatch(getCar(annoucement.car));
  }, [annoucement.car, dispatch]);


  // get agency information

  const agency = useSelector((state) => state.ReducerAgency.agency);
  useEffect(() => {
    dispatch(getAgency(annoucement.agency));
  }, [annoucement.agency, dispatch]);


  //get the review of the car
  const reviews = useSelector((state) => state.ReducerReview.reviews);
  useEffect(() => {
    dispatch(getReviewCar(car._id));
  }, [car._id, dispatch]);*/
  useEffect(() => {
    if (annoucement) {
      Promise.all([
        dispatch(getCar(annoucement.car)),
        dispatch(getAgency(annoucement.agency)),
        dispatch(getReviewCar(annoucement.car)),
      ]);
    }
  }, [annoucement, dispatch]);
  
  const car = useSelector((state) => state.ReducerCars.car);
  const agency = useSelector((state) => state.ReducerAgency.agency);
  const reviews = useSelector((state) => state.ReducerReview.reviews);
  

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  // cast the date of order
  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }

  let orderDate = reverseString(order.date.slice(0, 10));

  //the calor of status
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
    <tr class={bgStatus.class} >
      <td>
        <p className="fw-normal mb-1" style={strongText}>
          {order.ref}
        </p>
        <p className="text-muted mb-0">{orderDate}</p>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={annoucement.photo}
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
      <td><MDBBadge
      color={bgStatus.color}
      
      style={{ marginTop: "10px" }}
    >
      {order.status}
    </MDBBadge></td>
      <td>
        {averageRating}/5 <AiFillStar />
      </td>
    </tr>
  );
}

export default OrderItem;
