import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCar } from "../../Redux/Actions/actionCars";

import Accordion from "react-bootstrap/Accordion";
function DetailCar({ id }) {
  //get detail of car

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCar(id));
  });
  const Car = useSelector((state) => state.ReducerCars.car);



  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {Car.brand}, {Car.model}
          </Accordion.Header>
          <Accordion.Body>
            <p>{Car.brand ? `  Brand : ${Car.brand}` : ""}</p>
            <p>{Car.model ? `  Model : ${Car.model}` : ""}</p>
            <p>{Car.year ? ` Year of manufacture : ${Car.year}` : ""}</p>
            <p>
              {Car.connectivity ? ` Connectivity :${Car.connectivity}` : ""}
            </p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>FEATURES </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              {Car.numberOfPlaces
                ? ` Number of places : ${Car.numberOfPlaces}`
                : ""}
            </p>
            <p>
              {Car.numberOfDoors
                ? ` Number of doors : ${Car.numberOfDoors}`
                : ""}
            </p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>CONSUMPTION </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              {Car.urbanConsumtion
                ? `  Urban consumption: ${Car.urbanConsumtion}`
                : ""}
            </p>
            <p>
              {" "}
              {Car.extra_urbanConsumtion
                ? `Extra urdan consumpition :  ${Car.extra_urbanConsumtion}`
                : ""}
            </p>
            <p>
              {Car.urbanConsumtion
                ? ` Mixes consumpition : ${Car.urbanConsumtion}`
                : ""}
            </p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>TRANSMISSION</Accordion.Header>
          <Accordion.Body>
            <p>{Car.box ? ` Box :  ${Car.box}` : ""}</p>
            <p>
              {" "}
              {Car.numberOfReports
                ? ` Number of reports:   ${Car.numberOfReports}`
                : ""}
            </p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>PERFORMANCE </Accordion.Header>
          <Accordion.Body>
            <p>{Car.maxSpeed ? ` Max Speed:  ${Car.maxSpeed}` : ""}</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>MOTORIZATION</Accordion.Header>
          <Accordion.Body>
            <p>
              {Car.numberOfCylinders
                ? `Number of cylinders: ${Car.numberOfCylinders}`
                : ""}
            </p>

            <p>{Car.fiscalPower ? ` Fiscal power : ${Car.fiscalPower}` : ""}</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default DetailCar;
