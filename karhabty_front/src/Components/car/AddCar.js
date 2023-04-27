import React, { useState } from "react";
import CustomInput from "../../Atom/CustomInput";
import { colors } from "../../Redux/constante";
import CustomTextarea from "../../Atom/CustomTextarea";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch } from "react-redux";
import { addCar, getAllCars } from "../../Redux/Actions/actionCars";
function AddCar({handleClose}) {
  


const [newCar, setNewCar] = useState({});
const dispatch = useDispatch();
const [file, setFile] = useState(null);

const handleFileInputChange = (event) => {
  const selectedFile = event.target.files[0];
  setFile(selectedFile);
};

const handleChangeCar = (event) => {
  const { name, value } = event.target;
  setNewCar({ ...newCar, [name]: value });
  
};

const handleSubmit = (event) => {
  event.preventDefault();
  
  // Créer une nouvelle instance de FormData
  const formData = new FormData();
  // Ajouter la photo à la FormData si elle est présente
  if (file) {
    formData.append("image", file);
  }
  
  // Ajouter les autres informations de la voiture à la FormData
  for (const key in newCar) {
    if (newCar.hasOwnProperty(key)) {
      formData.append(key, newCar[key]);
     

    }
  }
  // Envoyer la FormData au serveur en utilisant l'action addCar()
  dispatch(addCar(formData));
  
  // Mettre à jour la liste des voitures en appelant l'action getAllCars()
  dispatch(getAllCars());
  
  // Fermer le formulaire
  handleClose();
};

  return (
    <>
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>General Information</Accordion.Header>
            <Accordion.Body>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="The Brand of the Car"
                  type="text"
                  placeholder="The brand"
                  name="brand"
                  handleChange={handleChangeCar}
                />
              </div>

              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="The Model of the Car"
                  type="text"
                  placeholder="The model"
                  name="model"
                  handleChange={handleChangeCar}
                />
              </div>

              <div className="form-outline mb-4">
             
                        <label class="-label" for="file" style={{marginRight:"20px"}}>
                          
                           Photo car  
                        </label>
                        <input
                          id="file"
                          type="file"
                          onChange={handleFileInputChange}
                        />
             
                  
              </div>
              <div className="form-outline mb-4">
                <select
                  size="lg"
                  name="color"
                  onChange={handleChangeCar}
                  style={{ width: "100%", height: "45px" }}
                >
                  {colors.map((color, index) => (
                    <option
                      key={index}
                      value={Object.values(color)[0]}
                      style={{ backgroundColor: Object.values(color)[0] }}
                    >
                      {Object.keys(color)[0]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="The year of fabrication"
                  type="Number"
                  placeholder="The year"
                  name="year"
                  handleChange={handleChangeCar}
                />
              </div>

              <div className="form-outline mb-4">
                <CustomTextarea
                  label="Connectivity"
                  placeholder="Connectivity"
                  name="connectivity"
                  handleChange={handleChangeCar}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>FEATURES </Accordion.Header>
            <Accordion.Body>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="The Number of places "
                  type="Number"
                  placeholder="Number of places"
                  name="numberOfPlaces"
                  handleChange={handleChangeCar}
                />
              </div>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="The Number of doors "
                  type="Number"
                  placeholder="Number of doors"
                  name="numberOfDoors"
                  handleChange={handleChangeCar}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>CONSUMPTION </Accordion.Header>
            <Accordion.Body>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="The type Fuel of the Car"
                  type="text"
                  placeholder="The type Fuel"
                  name="typeFuel"
                  handleChange={handleChangeCar}
                />
              </div>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Urban consumption "
                  type="Number"
                  placeholder="Urban consumption"
                  name="urbanConsumtion"
                  handleChange={handleChangeCar}
                />{" "}
              </div>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Extra urdan consumpition"
                  type="Number"
                  placeholder="Extra urdan consumpition"
                  name="extra_urbanConsumtion"
                  handleChange={handleChangeCar}
                />{" "}
              </div>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Mixes consumpition"
                  type="Number"
                  placeholder="Mixes consumpition"
                  name="mixedConsumption"
                  handleChange={handleChangeCar}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>TRANSMISSION</Accordion.Header>
            <Accordion.Body>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Box  "
                  type="Number"
                  placeholder="Box "
                  name="box"
                  handleChange={handleChangeCar}
                />{" "}
              </div>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Number of reports"
                  type="numberOfReports"
                  placeholder="Number of reports"
                  name="urbanConsumtion"
                  handleChange={handleChangeCar}
                />{" "}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>PERFORMANCE </Accordion.Header>
            <Accordion.Body>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Max Speed "
                  type="Number"
                  placeholder="Max Speed "
                  name="maxSpeed"
                  handleChange={handleChangeCar}
                />{" "}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>MOTORIZATION</Accordion.Header>
            <Accordion.Body>
              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Number of cylinders"
                  type="Number"
                  placeholder="Number of cylinders"
                  name="numberOfCylinders"
                  handleChange={handleChangeCar}
                />{" "}
              </div>

              <div className="form-outline mb-4">
                <CustomInput
                  titelFieald="Fiscal power"
                  type="Number"
                  placeholder="Fiscal power"
                  name="fiscalPower"
                  handleChange={handleChangeCar}
                />{" "}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div
        style={{
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button type="button" className="btn btn-light btn-lg">
          Reset all
        </button>
        <button
          type="button"
          className="btn btn-warning btn-lg "
          style={{ backgroundColor: "#e83e8c", marginLeft: "5" }}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default AddCar;
