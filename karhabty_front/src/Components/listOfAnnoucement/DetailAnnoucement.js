import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../../Redux/Actions/actionAnnoucement";
import GoogleMapReact from "google-map-react";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import {
  flex_two_element,
  rigth_Top,
  rigth_Body,
  left_Buttom,
  Rigth,
  Left,
  circle,
} from "../../Style/Style";
import DetailCar from "../car/DetailCar";
import { Link } from "react-router-dom";

function DetailAnnoucement() {
  /* Modal*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* end Modal */

  //get the id of car
  const { id } = useParams();

  // get the car
  const dispatch = useDispatch();
  const annoucement = useSelector(
    (state) => state.ReducerAnnoucement.annoucement
  );

  // get the car when rendering the component
  useEffect(() => {
    dispatch(getOne(id));
  }, [id, dispatch]);

  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }

  // cast the date to string
  let startDate = "";
  if (annoucement.availableStartDate) {
    startDate = annoucement.availableStartDate.slice(0, 10);
    startDate = reverseString(startDate);
  } else {
    startDate = "";
  }

  // console.log("99",annoucement.availableDates.startDate)
  let endDate = "";
  if (annoucement.availableEndDate) {
    endDate = annoucement.availableEndDate.slice(0, 10);
    endDate = reverseString(startDate);
  } else {
    endDate = "";
  }
  //Style
  const circleColor = { ...circle, backgroundColor: annoucement.color };

  return (
    <div style={{ backgroundColor: "#fffaf6", margin: "2%" }}>
      <div style={flex_two_element}>
        <div style={Left}>
          <img src={annoucement.photo} alt="the car" />
          <div style={left_Buttom}>
            <Button
              variant="info"
              style={{ marginRight: "5%" }}
              onClick={handleShow}
            >
              More Detail of car
            </Button>

            <Link to={`/profil/order/${annoucement._id}`}>
              <Button variant="success">Order</Button>
            </Link>
          </div>
        </div>
        <div style={Rigth}>
          <div style={rigth_Top}>
            <h5 style={{ color: "blue" }}>{annoucement.titre}</h5>
            <p>{annoucement.description}</p>
          </div>
          <hr style={{ border: "1px solid red" }} />

          <div style={rigth_Body}>
            <div style={flex_two_element}>
              <div>
                {" "}
                <h5>Color:</h5>
                <div style={circleColor}></div>
              </div>
              <div>
                <div>
                  {" "}
                  <h5>Price :</h5> {annoucement.price} DNT/Day
                </div>
                <div>
                  {" "}
                  <h5>Security Deposit:</h5> {annoucement.securityDeposit} DNT
                </div>
              </div>
            </div>
            <hr style={{ border: "1px solid red" }} />
            <div>
              <p>
                {``}
                This car is availeble between
                <strong>{startDate}</strong> And
                <strong>{endDate}</strong> in this adress
                <strong>{annoucement.address}</strong>
              </p>
            </div>{" "}
            <div style={{ height: "30vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDqJAmQ5hIyvktMCkh4Jpa_NkmVwvHtRcs",
                }}
                center={{
                  lat: annoucement.latitude,
                  lng: annoucement.longitude,
                }}
                zoom={11}
              ></GoogleMapReact>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DetailCar id={annoucement.car} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailAnnoucement;
