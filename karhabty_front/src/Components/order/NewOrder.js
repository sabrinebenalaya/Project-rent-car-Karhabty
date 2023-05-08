import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AiFillStar } from "react-icons/ai";
import DatePicker from "react-datepicker";
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
import { differenceInDays } from "date-fns";
import { toast } from "react-toastify";

function NewOrder() {
  //get id of annoucement
  const { id } = useParams();
  const token = localStorage.getItem("jwt");
  const idUser = localStorage.getItem("idUser");
  //get annoucement information
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOne(id));
  }, [id, dispatch]);
  const annoucement = useSelector(
    (state) => state.ReducerAnnoucement.annoucement
  );
  console.log("info announce", annoucement);

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
  if (reviews.length > 0) {
    averageRating =
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length;
  }
  console.log("rate", averageRating);

  //get agency information
  const agency = useSelector((state) => state.ReducerAgency.agency);
  useEffect(() => {
    dispatch(getAgency(annoucement.agence, token));
  }, [annoucement.agence, token, dispatch]);

  /// dates of order
  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  function getDaysDifference(startDate, endDate) {
    const daysDifference = differenceInDays(
      new Date(endDate),
      new Date(startDate)
    );
    return daysDifference;
  }
  //new order
  function generateReference() {
    // Générer une chaîne de caractères aléatoire de longueur 8
    const randomString = Math.random().toString(36).substr(2, 8);

    // Générer la référence à partir de la date et de la chaîne aléatoire
    const reference = `RC-${new Date().getTime()}-${randomString}`;

    return reference;
  }
  const ref = generateReference();
  let totalprice =
    getDaysDifference(startDate, endDate) * annoucement.price +
    annoucement.securityDeposit;

  const [newOrder, setNewOrder] = useState({
    user: idUser,
    announcement: id,
    ref: ref,
    status: "awaiting",
    date: new Date(),
    agency: agency._id,
    photo: annoucement.photo,
  });
  const handelAddOrder = () => {
    console.log(startDate);
    console.log(endDate);
    if (totalprice > 0 && startDate && endDate) {
      setNewOrder({
        ...newOrder,
        price: totalprice,
        availableDates: {
          startDate: startDate,
          endDate: endDate,
        },
      });
    } else if (totalprice > 0) {
      setNewOrder({ ...newOrder, price: totalprice });
    } else if (startDate && endDate) {
      setNewOrder({
        ...newOrder,
        availableDates: {
          startDate: startDate,
          endDate: endDate,
        },
      });
    }
  };

  console.log(newOrder);
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
          Rent the {car.brand} , {car.model} for{" "}
          {getDaysDifference(startDate, endDate)} days with this price :{" "}
          {totalprice} Dnt.
        </h3>
        <div>
          <div>
            <div>
              <strong style={strongText}>Starting date :</strong>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) =>{
                    if (isEmpty(endDate)){
                      setStartDate(date);
                    }else if (date > endDate) {
                      toast.error(
                        "the date must be less  than the end date "
                      );
                    } else {
                      setStartDate(date);
                    }
                  } }
                  dateFormat="dd/MM/yyyy"
                  name="availableStartDate"
                  minDate={new Date(annoucement.availableStartDate)}
                  maxDate={new Date(annoucement.availableEndDate)}
                />
                {startDate && (
                  <p style={{ marginLeft: "-300px" }}>
                    La date debut de location est:{" "}
                    {startDate.toLocaleDateString()}
                  </p>
                )}
              </div>

              <strong style={strongText}>End date :</strong>
              <div style={{ display: "flex", flexDirection: "row" }}>
                .
                <DatePicker
                  showIcon
                  selected={endDate}
                  onChange={(date) => {
                    if(isEmpty(startDate)){setEndDate(date);}else if (date < startDate) {
                      toast.error(
                        "the date must be greater than the start date "
                      );
                    } else {
                      setEndDate(date);
                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                  name="availableEndDate"
                  minDate={new Date(annoucement.availableStartDate)}
                  maxDate={new Date(annoucement.availableEndDate)}
                />
                {endDate && (
                  <p style={{ marginLeft: "-300px" }}>
                    La date fin de location est : {endDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default NewOrder;
