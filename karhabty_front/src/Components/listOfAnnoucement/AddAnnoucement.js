import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../Redux/Actions/actionCars";
import Accordion from "react-bootstrap/Accordion";
import CustomInput from "./../../Atom/CustomInput";
import CustomTextarea from "../../Atom/CustomTextarea";

import Form from "react-bootstrap/Form";
import { flex_two_element } from "./../../Style/Style";
import CustomModal from "../../Atom/CustomModal";
import { getUser } from "../../Redux/Actions/actionUser";
import { MDBSwitch } from "mdb-react-ui-kit";
import { isEmpty } from "../../Validator/isEmpty";
import { addAnnoucement } from "../../Redux/Actions/actionAnnoucement";
import { toast } from "react-toastify";
import CustomButton from "../../Atom/CustomButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

function AddAnnoucement({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //agency and car information
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getAllCars());
  }, [id, dispatch]);
  const cars = useSelector((state) => state.ReducerCars.cars);
 const agency = useSelector((state) => state.ReducerUser.user);
  const agencyAdress = agency.address;

  ///cars////
 
  //get the image of the car (affichage de l'image de la voiture selctionné)
  const [selectedCarPath, setSelectedCarPath] = useState("");
  function handleCarSelect(event) {
    const selectedCar = cars.find((car) => car._id === event.target.value);
    setSelectedCarPath(selectedCar.photo);
    SetAnnoucement({ ...annoucement, car: event.target.value });
  }

  /// anouncement////
  // state annoucement
  const [annoucement, SetAnnoucement] = useState({
    agence: id,
    longitude: 125,
    latitude: 2569,
    address: agencyAdress,
    availableStartDate: null,
    availableEndDate: null
  });


  //remplissage du state
  //state de dates

  const handleChangeAnnoucement = (event) => {
    const { name, value } = event.target;

    if (name === "status") {
      if (event.target.checked) {
        SetAnnoucement({ ...annoucement, [name]: "Active" });
      } else {
        SetAnnoucement({ ...annoucement, [name]: "Inactive" });
      }
    }  else {
      SetAnnoucement({ ...annoucement, [name]: value });
    }
    
  };
  

  // envoi du state à l'action
  const handelAddAnnoucement = (e) => {
    e.preventDefault();
    
    if (!isEmpty(annoucement)) {
      dispatch(addAnnoucement(annoucement, navigate));
    } else {
      toast.error("les champs sont vides");
    }
  };

  //set modal for adding a car
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Accordion defaultActiveKey="0" className="container">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Genaral information</Accordion.Header>
        <Accordion.Body>
          <p>
            <CustomInput
              titelFieald={"Anoucement title :"}
              placeholder={"Tape the title of your annoucement"}
              name={"titre"}
              handleChange={handleChangeAnnoucement}
            />
          </p>
          <p>
            <CustomTextarea
              label={"Description of the annoucement"}
              placeholder={"Tape the discription of your annoucement"}
              style={{ height: "100px" }}
              name="description"
              data_error="Please,leave us a description."
              handleChange={handleChangeAnnoucement}
            />
          </p>
          <p>
            <MDBSwitch
              id="statusAnoucement"
              label="Status of the annoucement"
              name="status"
              onClick={handleChangeAnnoucement}
            />
          </p>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Car information </Accordion.Header>
        <Accordion.Body>
          <h6>Choise the car :</h6>
          <div style={{ ...flex_two_element }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Form.Select
                size="lg"
                onClick={handleCarSelect}
                style={{ width: "100%", height: "45px" }}
              >
                {Array.isArray(cars) &&
                  cars.map((car, index) => (
                    <option key={index} value={car._id}>
                      {car.brand}, {car.model}
                    </option>
                  ))}
              </Form.Select>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
              }}
            >
              {selectedCarPath && (
                <img
                  src={selectedCarPath}
                  alt={"car"}
                  width={"400px"}
                  height={"200px"}
                />
              )}
            </div>
          </div>

          <div style={{ marginTop: "2%" }}>
            <CustomButton handleClick={handleShow} title="Add a new Car" />

            <CustomModal
              modalTitle="Add New Car"
              variantClose="secondary"
              titleClose="Close"
              variantSave="primary"
              titleSave="Save"
              show={show}
              handleClose={handleClose}
            />
          </div>
          <hr style={{ marginTop: "2%" }} />
          <div style={flex_two_element}>
            <CustomInput
              titelFieald={"Price:"}
              placeholder={"Tape the price in DNT by day "}
              name={"price"}
              handleChange={handleChangeAnnoucement}
              style={{ width: "33vh" }}
            />

            <CustomInput
              titelFieald={" Security deposit :"}
              placeholder={"Tape the security deposit in DNT "}
              name={"securityDeposit"}
              handleChange={handleChangeAnnoucement}
              style={{ width: "35vh", marginRight: "20px" }}
            />
          </div>
          <hr style={{ marginTop: "2%" }} />
          <div style={flex_two_element}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h6>Choise the available period :</h6>
            </div>
            <div style={{ marginRight: "20px", marginBottom: "2%" }}>
            <DatePicker
  selected={annoucement.availableStartDate ? new Date(annoucement.availableStartDate) : null}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select a date"
  name="availableStartDate"
  onChange={(date) =>SetAnnoucement({ ...annoucement, availableStartDate: date })}
/>

<DatePicker
  selected={annoucement.availableEndDate ? new Date(annoucement.availableEndDate) : null}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select a date"
  name="availableEndDate"
  onChange={(date) => SetAnnoucement({ ...annoucement, availableEndDate: date })}
/>
            </div>
          </div>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <CustomButton
              handleClick={(e) => handelAddAnnoucement(e)}
              title=" Add annoucement"
              style={{ margin: "2%" }}
            />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AddAnnoucement;
