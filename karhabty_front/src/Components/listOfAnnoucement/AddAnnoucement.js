import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../Redux/Actions/actionCars";
import Accordion from "react-bootstrap/Accordion";
import CustomInput from "./../../Atom/CustomInput";
import CustomTextarea from "../../Atom/CustomTextarea";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import { flex_two_element } from "./../../Style/Style";
import Button from "react-bootstrap/Button";
import CustomModal from "../../Atom/CustomModal";
import { getUser } from "../../Redux/Actions/actionUser";
import { MDBSwitch } from "mdb-react-ui-kit";
import { isEmpty } from "../../Validator/isEmpty";
import { addAnnoucement } from "../../Redux/Actions/actionAnnoucement";
import { toast } from "react-toastify";
import CustomButton from "../../Atom/CustomButton";

function AddAnnoucement({ id }) {
  //get the list of cars
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const cars = useSelector((state) => state.ReducerCars.cars);

  //get the image of the car
  const [selectedCarPath, setSelectedCarPath] = useState("");

  function handleCarSelect(event) {
    const selectedCar = cars.find((car) => car._id === event.target.value);
    setSelectedCarPath(selectedCar.photo);
    SetAnnoucement({ ...annoucement, car: event.target.value });
  }

  //set the date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    console.log({ dates });
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  //set modal for adding a car
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [annoucement, SetAnnoucement] = useState({});

  const handleChangeAnnoucement = (e) => {
    ///set state for the adress
    if (e.target.name === "status") {
      if (e.target.checked) {
        SetAnnoucement({ ...annoucement, [e.target.name]: "Active" });
      } else {
        SetAnnoucement({ ...annoucement, [e.target.name]: "Inactive" });
      }
    } else {
      SetAnnoucement({ ...annoucement, [e.target.name]: e.target.value });
    }
  };

  // get altitude et langetitude from adresse (string)
  const latitude = 53;
  const longitude = 10;

  // add annoucement
  const handelAddAnnoucement = (e) => {
    e.preventDefault();

    if (annoucement && typeof annoucement.address === "string") {
      const stateAddress = {};
      const parts = annoucement.address.split(",");
      stateAddress.city = parts[0];
      stateAddress.governorate = parts[1];
      stateAddress.postalCode = parts[2];
      stateAddress.country = parts[3];
      annoucement.address = stateAddress;
    }

    if (isEmpty(startDate)) {
      SetAnnoucement({ ...annoucement, availableStartDate: startDate });
    } else {
      console.log("prob");
    }
    if (isEmpty(endDate)) {
      SetAnnoucement({ ...annoucement, availableEndDate: endDate });
    }
    if (!isEmpty(latitude)) {
      SetAnnoucement({ ...annoucement, latitude: latitude });
    } else {
      console.log("laltitude", latitude);
    }

    if (!isEmpty(longitude)) {
      SetAnnoucement({ ...annoucement, longitude: longitude });
    }

    if (!isEmpty(annoucement)) {
      dispatch(addAnnoucement(annoucement));
    } else {
      toast.error("All the information are empty");
    }
  };
  console.log("anoucement", annoucement);

  //get agency information
  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  const agency = useSelector((state) => state.ReducerUser.user);

  const agencyAdress =
    agency.address.city +
    "," +
    agency.address.governorate +
    "," +
    agency.address.postalCode +
    "," +
    agency.address.country;

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
          <p>
            <CustomInput
              titelFieald={"Adress of the Agency :"}
              placeholder={agencyAdress}
              name={"address"}
              handleChange={handleChangeAnnoucement}
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
            <div style={{ marginRight: "20px", marginBottom:"2%" }}>
           
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                monthsShown={1}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selectsStart
                disabledKeyboardNavigation
                todayButton="Today"
                dateFormat="dd/MM/yyyy"
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                }) => (
                  <div>
                    <button onClick={decreaseMonth}>{"<"}</button>
                    <span>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        year: "numeric",
                      }).format(date)}
                    </span>
                    <button onClick={increaseMonth}>{">"}</button>
                  </div>
                )}
                ranges={[selectionRange]}
              />
            </div>
          </div>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <CustomButton
              handleClick={handelAddAnnoucement}
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
