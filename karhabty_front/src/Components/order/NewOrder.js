import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AiFillStar } from "react-icons/ai";

import {
  header_order,
  body_order,
  left_header_order,
  rigth_footer_order,
  strongText,
} from "./../../Style/Style";
import { getOne } from "../../Redux/Actions/actionAnnoucement";
import { getCar } from "../../Redux/Actions/actionCars";
import { getReviewCar } from "../../Redux/Actions/actionRate";
import { getAgency } from "../../Redux/Actions/actionAgency";
import { useSelector, useDispatch } from "react-redux";
import CustomDatePicker from "../../Atom/CustomDatePicker";
import { Link } from "react-router-dom";
import { isEmpty } from "./../../Validator/isEmpty";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from 'date-fns';


function NewOrder() {
  //get id of annoucement
  const { id } = useParams();
  const token = localStorage.getItem("jwt");

  //get annoucement information
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOne(id));
  }, [id, dispatch]);
  const annoucement = useSelector(
    (state) => state.ReducerAnnoucement.annoucement
  );
  console.log('info announce', annoucement)

  // get car info
  const car = useSelector((state) => state.ReducerCars.car);
  useEffect(() => {
    dispatch(getCar(annoucement.car));
  }, [annoucement.car, dispatch]);

  //get rate of car
  const reviews = useSelector((state) => state.ReducerReview.reviews);
  useEffect(() => {
    dispatch(getReviewCar(car._id));
  }, [car._id, dispatch]);

  let averageRating = 0;
  if (reviews.length>0){
   averageRating =  reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;
  }
   console.log("rate", averageRating) 

  //get agency information
  const agency = useSelector((state) => state.ReducerAgency.agency);
  useEffect(() => {
    dispatch(getAgency(annoucement.agence, token));
  }, [annoucement.agence,token, dispatch]);
 

  /// dates of order
  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const [endDate, setEndDate] = useState(null);
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  function getDaysDifference(startDate, endDate) {
    const daysDifference = differenceInDays(new Date(endDate), new Date(startDate));
    return daysDifference;
  }

 

  return (
    <div className="container">
      <div style={header_order}>
        <div style={left_header_order}>
          <h3>
            {car.brand}, {car.model}
          </h3>
          <p>
            <strong style={strongText}>price :</strong> {annoucement.price}{" "}
            Dnt/day
          </p>
          <p>
            <strong style={strongText}>Security Deposit:</strong>{" "}
            {annoucement.securityDeposit} Dnt
          </p>
          <p>
            <strong style={strongText}>Rate Car : </strong>
            {averageRating} <AiFillStar />
          </p>
        </div>
        <div>
          <img src={annoucement.photo} alt="car" width="500px" height="250px" />
        </div>
      </div>
      <hr />
      <div>
        <h3> Agency Information</h3>
        <div style={body_order}>
          <div>
            <img
              src={agency.photo}
              alt="avatar"
              className="rounded-circle img-fluid"
              style={{ width: "150px" }}
            />
            <p style={{ ...strongText, textAlign: "center", marginTop: "5px" }}>
              {agency.agencyName}
            </p>
          </div>
          <div style={{ width: "18rem", marginLeft: "200px" }}>
            <p>
              <strong style={strongText}>Phone : </strong>
              {agency.phone}
            </p>
            <p>
              <strong style={strongText}>Mail : </strong>
              {agency.mail}
            </p>
            <p>
              {" "}
              <strong style={strongText}>Adresse : </strong>{" "}
              {!isEmpty(agency.address) && (
                <span style={{ display: "inline" }}>
                  {agency.address.city}, {agency.address.country},{" "}
                  {agency.address.postalCode}, {agency.address.governorate}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h3>
          Rent the {car.brand} , {car.model} for {getDaysDifference(startDate, endDate)} days with this price :{" "}
          {(getDaysDifference(startDate, endDate)* annoucement.price)+annoucement.securityDeposit} Dnt.
        </h3>
        <div>
          <div>
            <div>
              <strong style={strongText}>Starting date :</strong>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <CustomDatePicker onDateChange={handleStartDateChange} />
                {startDate && (
                  <p style={{ marginLeft: "-300px" }}>
                    La date debut de location est: {startDate.toLocaleDateString()}
                  </p>
                )}
              </div>

              <strong style={strongText}>End date :</strong>
              <div style={{ display: "flex", flexDirection: "row" }}>
                .
                <CustomDatePicker
                  stDate={annoucement.availableStartDate}
                  enDate={annoucement.availableEndDate}
                  onDateChange={handleEndDateChange}
                />
                {endDate && (
                  <p style={{ marginLeft: "-300px" }}>
                    La date fin de location est : {endDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div style={rigth_footer_order}>
              <Link to="/">
                <button type="button" className="main-btn">
                  Paiement the Order
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default NewOrder;
