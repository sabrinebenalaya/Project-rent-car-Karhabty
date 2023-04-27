import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../Redux/Actions/actionUser";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isEmpty } from "./../Validator/isEmpty";
import { validatorPassword } from "./../Validator/validatorPassword";
import { validatorPhone } from "../Validator/validatorPhone";
import validator from "validator";
import { validatorName } from "../Validator/validatorName";
import AddCar from "../Components/car/AddCar";
import { getOne, updateAnnoucement } from "../Redux/Actions/actionAnnoucement";
import CustomTextarea from "./CustomTextarea";
function CustomModal({
  modalTitle,
  titelFieald,
  placeholder,
  name,
  variantClose,
  titleClose,
  variantSave,
  titleSave,
  show,
  handleClose,
  id,
  adress,
  type,
}) {
  //set the Adress
  const [adressState, SetAdressState] = useState({});
  const handleChangeStateAdress = (e) => {
    SetAdressState({ ...adressState, [e.target.name]: e.target.value });
  };

  //set the birthdate
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date, e) => {
    setSelectedDate(date);
    setAttribut("birthDate");
    setText(date);
  };

  //set the password
  const [passwordState, setPasswordState] = useState({});
  const handleChangeStatePassword = (e) => {
    setPasswordState({ ...passwordState, [e.target.name]: e.target.value });
  };

  //set the name
  const [nameState, setNameState] = useState({});
  const handleChangeStateName = (e) => {
    setNameState({ ...nameState, [e.target.name]: e.target.value });
  };

  // save the data and agencyName
  const [text, setText] = useState("");
  const [attribut, setAttribut] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const handleChangeState = (e) => {
    setText(e.target.value);
    setAttribut(e.target.name);
  };

  const handelChangeStarDate = (date, name) => {
    setAttribut(name);
    setStart(date);
  };
  const handelChangeEndDate = (date, name) => {
  
    setAttribut(name);
    setEnd(date);
  };
  const dispatch = useDispatch();

  const save = (e) => {
    e.preventDefault();
    const updatedAdressState = { ...adress, ...adressState };

    if (!isEmpty(updatedAdressState)) {
      if (!validator.isNumeric(updatedAdressState.postalCode)) {
        toast.error("Postal Code must be a number");
      } else {
        dispatch(updateUser({ address: updatedAdressState }, id));
        handleClose();
        dispatch(getUser(id));
      }
    }

    if (!isEmpty(passwordState)) {
      const { errors, isValid } = validatorPassword(passwordState);
      if (!isValid) {
        if (!isEmpty(errors.password)) {
          toast.error(errors.password);
        }
        if (!isEmpty(errors.reppassword)) {
          toast.error(errors.reppassword);
        }
      } else {
        dispatch(updateUser({ password: passwordState.password }, id));
        handleClose();
        dispatch(getUser(id));
      }
    }

    if (attribut === "phone") {
      const { errors, isValid } = validatorPhone(text);
      if (!isValid) {
        toast.error(errors.phone);
      } else {
        dispatch(updateUser({ phone: text }, id));
        handleClose();
        dispatch(getUser(id));
      }
    }
    if (!isEmpty(nameState)) {
      const { errors, isValid } = validatorName(nameState);
      if (!isValid) {
        if (!isEmpty(errors.lastName)) {
          toast.error(errors.lastName);
        }
        if (!isEmpty(errors.firstName)) {
          toast.error(errors.firstName);
        }
      } else {
        dispatch(updateUser(nameState, id));
        handleClose();
        dispatch(getUser(id));
      }
    }

    if (attribut === "birthDate" || attribut === "agencyName") {
      if (attribut === "agencyName") {
        if (!validator.isLength(text.trim(), { min: 1 })) {
          toast.error("The agencyName must have at least 1 letter.");
        } else {
          dispatch(updateUser({ [attribut]: text }, id));
          handleClose();
          dispatch(getUser(id));
        }
      } else {
        dispatch(updateUser({ [attribut]: text }, id));
        handleClose();
        dispatch(getUser(id));
      }
    }
    if (
      attribut === "description" ||
      attribut === "titre" ||
      attribut === "price" ||
      attribut === "securityDeposit" 
     
    ) {
      dispatch(updateAnnoucement({ [attribut]: text }, id));
      handleClose();
      dispatch(getOne(id));
    }

    if( attribut === "availableStartDate"){
      dispatch(updateAnnoucement({ [attribut]: start }, id));
      handleClose();
      dispatch(getOne(id));
    }
    if( attribut === "availableEndDate"){
      dispatch(updateAnnoucement({ [attribut]: end }, id));
      handleClose();
      dispatch(getOne(id));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalTitle === "The Deescription of annoucement" && (
          <CustomTextarea
            titelFieald={titelFieald}
            placeholder={placeholder}
            name={name}
            handleChange={handleChangeState}
          />
        )}

        {modalTitle === "The Title of annoucement" && (
          <CustomInput
            titelFieald={titelFieald}
            placeholder={placeholder}
            name={name}
            handleChange={handleChangeState}
          />
        )}
        {modalTitle === "The Price By Day" && (
          <CustomInput
            titelFieald={titelFieald}
            placeholder={placeholder}
            name={name}
            type={type}
            handleChange={handleChangeState}
          />
        )}

        {modalTitle === "The Security Deposit of this car" && (
          <CustomInput
            titelFieald={titelFieald}
            placeholder={placeholder}
            name={name}
            type={type}
            handleChange={handleChangeState}
          />
        )}

        {modalTitle === "The AvailableStartDate of this car" && (
          <DatePicker
            selected={start ? new Date(start) : null}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            onChange={(date) => handelChangeStarDate(date, name)}
            name={name}
          />
        )}
        {modalTitle === "The AvailableEndDate of this car" && (
          <DatePicker
            selected={end ? new Date(end) : null}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            onChange={(date) => handelChangeEndDate(date, name)}
            name={name}
          />
        )}

        {modalTitle === "Your Phone number" && (
          <CustomInput
            titelFieald={titelFieald}
            placeholder={placeholder}
            name={name}
            handleChange={handleChangeState}
          />
        )}
        {modalTitle === "Add New Car" && <AddCar handleClose={handleClose} />}
        {modalTitle === "Your Name" && (
          <>
            <CustomInput
              titelFieald={"First name"}
              placeholder={"Plz tape your first name"}
              name={"firstName"}
              handleChange={handleChangeStateName}
            />
            <CustomInput
              titelFieald={"Last name"}
              placeholder={"Plz tape your last name"}
              name={"lastName"}
              handleChange={handleChangeStateName}
            />
          </>
        )}

        {modalTitle === "Your Agency Name" && (
          <CustomInput
            titelFieald={"Agency name"}
            placeholder={"Plz tape your Agency name"}
            name={"agencyName"}
            handleChange={handleChangeState}
          />
        )}

        {modalTitle === "Your address" && (
          <>
            <CustomInput
              titelFieald={"City"}
              placeholder={"Plz tape your city"}
              name={"city"}
              handleChange={handleChangeStateAdress}
            />
            <CustomInput
              titelFieald={"Governorate"}
              placeholder={"Plz tape your Governorate"}
              name={"governorate"}
              handleChange={handleChangeStateAdress}
            />
            <CustomInput
              titelFieald={"Country"}
              placeholder={"Plz tape your country"}
              name={"country"}
              handleChange={handleChangeStateAdress}
            />
            <CustomInput
              titelFieald={"Postal Code"}
              placeholder={"Plz tape your postal Code"}
              name={"postalCode"}
              handleChange={handleChangeStateAdress}
            />
          </>
        )}
        {modalTitle === "Your Phone Birthday" && (
          <>
            {" "}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              value={selectedDate}
            />{" "}
            {selectedDate && (
              <p>
                La date sélectionnée est: {selectedDate.toLocaleDateString()}
              </p>
            )}
          </>
        )}
        {modalTitle === "Your Password" && (
          <>
            {" "}
            <CustomInput
              type={"password"}
              titelFieald={"Password"}
              placeholder={"Plz tape your new password"}
              name={"password"}
              handleChange={handleChangeStatePassword}
            />
            <CustomInput
              type={"password"}
              titelFieald={"Repeate your Password"}
              placeholder={"Plz retape your password"}
              name={"reppassword"}
              handleChange={handleChangeStatePassword}
            />
          </>
        )}
      </Modal.Body>
      {modalTitle !== "Add New Car" && (
        <Modal.Footer>
          <CustomButton
            variant={variantClose}
            title={titleClose}
            handleClick={handleClose}
          />
          <CustomButton
            variant={variantSave}
            title={titleSave}
            handleClick={save}
          />
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default CustomModal;
