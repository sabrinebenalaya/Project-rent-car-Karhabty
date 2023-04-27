import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../../Redux/Actions/actionAnnoucement";
import GoogleMapReact from "google-map-react";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
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
import CustomModal from "../../Atom/CustomModal";
import CustomButton from "../../Atom/CustomButton";
function DetailAnnoucement() {
  const role = localStorage.getItem("role");

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
    endDate = reverseString(endDate);
  } else {
    endDate = "";
  }
  //Style
  const circleColor = { ...circle, backgroundColor: annoucement.color };

  /////// les modal of edit
  // states
  //description
  const [showDescription, SetShowDescription] = useState(false);
  const handleShowDescription = () => SetShowDescription(true);
  const handleCloseDescription = () => SetShowDescription(false);
  //titre de l'announcement
  const [showTitle, SetShowTitle] = useState(false);
  const handleShowTitle = () => SetShowTitle(true);
  const handleCloseTitle = () => SetShowTitle(false);
  //price
  const [showPrice, SetShowPrice] = useState(false);
  const handleShowPrice = () => SetShowPrice(true);
  const handleClosePrice = () => SetShowPrice(false);
  //decurity deposit
  const [showSecurityDeposit, SetShowSecurityDeposit] = useState(false);
  const handleShowSecurityDeposit = () => SetShowSecurityDeposit(true);
  const handleCloseSecurityDeposit = () => SetShowSecurityDeposit(false);
  //AvailableStartDate
  const [showAvailableStartDate, SetShowAvailableStartDate] = useState(false);
  const handleShowAvailableStartDate = () => SetShowAvailableStartDate(true);
  const handleCloseAvailableStartDate = () => SetShowAvailableStartDate(false);
  //AvailableEndtDate
  const [showAvailableEndDate, SetShowAvailableEndDate] = useState(false);
  const handleShowAvailableEndDate = () => SetShowAvailableEndDate(true);
  const handleCloseAvailableEndtDate = () => SetShowAvailableEndDate(false);

  ///style icon edit
  const iconEdit = {
    color: annoucement.color,
    width: "20px",
    height: "20px",
  };
  return (
    <div className="container">
      <div style={{ marginTop: "2%" }}>
        <div style={flex_two_element}>
          <div style={Left}>
            <img src={annoucement.photo} alt="the car" />
            <div style={left_Buttom}>
              <CustomButton
                variant="info"
                style={{ marginRight: "5%" }}
                handleClick={handleShow}
                title="  More Detail of car"
              />
              {role === "User" && (
                <Link to={`/profil/order/${annoucement._id}`}>
                  <Button variant="success">Order</Button>
                </Link>
              )}
            </div>
          </div>
          <div style={Rigth}>
            <div style={rigth_Top}>
              <h5 style={{ color: "blue" }}>
                {annoucement.titre}
                {role === "Agency" && (
                  <BiEditAlt style={iconEdit} onClick={handleShowTitle} />
                )}
              </h5>
              <p>
                {annoucement.description}{" "}
                {role === "Agency" && (
                  <BiEditAlt style={iconEdit} onClick={handleShowDescription} />
                )}
              </p>
            </div>
            <hr style={{ border: `1px solid ${annoucement.color}` }} />

            <div style={rigth_Body}>
              <div style={flex_two_element}>
                <div>
                  {" "}
                  <h5>Color:</h5>
                  <div style={circleColor}></div>
                </div>
                <div>
                  <div>
                    <h5>Price :</h5> {annoucement.price} DNT/Day
                    {role === "Agency" && (
                      <BiEditAlt style={iconEdit} onClick={handleShowPrice} />
                    )}
                  </div>
                  <div>
                    {" "}
                    <h5>Security Deposit:</h5> {annoucement.securityDeposit} DNT
                    {role === "Agency" && (
                      <BiEditAlt
                        style={iconEdit}
                        onClick={handleShowSecurityDeposit}
                      />
                    )}
                  </div>
                </div>
              </div>
              <hr style={{ border: `1px solid ${annoucement.color}` }} />
              <div>
                <p>
                  {``}
                  This car is availeble between
                  <strong>{startDate}</strong>{" "}
                  {role === "Agency" && (
                    <BiEditAlt
                      style={iconEdit}
                      onClick={handleShowAvailableStartDate}
                    />
                  )}{" "}
                  And
                  <strong>{endDate}</strong>{" "}
                  {role === "Agency" && (
                    <BiEditAlt
                      style={iconEdit}
                      onClick={handleShowAvailableEndDate}
                    />
                  )}{" "}
                  in this adress
                  <strong>{annoucement.address}</strong>
                </p>
              </div>{" "}
              <div style={{ height: "30vh", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.ApiKey,
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

        <CustomModal
          modalTitle="The Deescription of annoucement"
          titelFieald="Description"
          placeholder="Description"
          name="description"
          variantClose="secondary"
          titleClose="Close"
          variantSave="primary"
          titleSave="Save"
          show={showDescription}
          handleClose={handleCloseDescription}
          id={annoucement._id}
        />

        <CustomModal
          modalTitle="The Title of annoucement"
          titelFieald="Title"
          placeholder="Title"
          name="titre"
          variantClose="secondary"
          titleClose="Close"
          variantSave="primary"
          titleSave="Save"
          show={showTitle}
          handleClose={handleCloseTitle}
          id={annoucement._id}
        />

        <CustomModal
          modalTitle="The Price By Day"
          titelFieald="The Price By Day"
          placeholder="The Price By Day"
          name="price"
          type="Number"
          variantClose="secondary"
          titleClose="Close"
          variantSave="primary"
          titleSave="Save"
          show={showPrice}
          handleClose={handleClosePrice}
          id={annoucement._id}
        />

        <CustomModal
          modalTitle="The Security Deposit of this car"
          titelFieald="The Security Deposit"
          placeholder="The Security Deposit"
          name="securityDeposit"
          type="Number"
          variantClose="secondary"
          titleClose="Close"
          variantSave="primary"
          titleSave="Save"
          show={showSecurityDeposit}
          handleClose={handleCloseSecurityDeposit}
          id={annoucement._id}
        />

        <CustomModal
          modalTitle="The AvailableStartDate of this car"
          titelFieald="AvailableStartDate"
          placeholder="AvailableStartDate"
          name="availableStartDate"
          type="date"
          variantClose="secondary"
          titleClose="Close"
          variantSave="primary"
          titleSave="Save"
          show={showAvailableStartDate}
          handleClose={handleCloseAvailableStartDate}
          id={annoucement._id}
        />

        <CustomModal
          modalTitle="The AvailableEndDate of this car"
          titelFieald="AvailableEndDate"
          placeholder="AvailableEndDate"
          name="availableEndDate"
          type="date"
          variantClose="secondary"
          titleClose="Close"
          variantSave="primary"
          titleSave="Save"
          show={showAvailableEndDate}
          handleClose={handleCloseAvailableEndtDate}
          id={annoucement._id}
        />
      </div>
    </div>
  );
}

export default DetailAnnoucement;
