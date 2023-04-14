import React, { useEffect, useState } from "react";
import { getUser } from "../../Redux/Actions/actionUser";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { BsCameraFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { butonCircle, iconPink } from "../../Style/Style";
import { GrChapterAdd } from "react-icons/gr";
import CustomModal from "../../Atom/CustomModal";
import { isEmpty } from "./../../Validator/isEmpty";
function ProfilUser({ id, role }) {
  // get the user from stor

  const user = useSelector((state) => state.ReducerUser.user);

  // get the user when rendering the component
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  // configuaration des modals pour l'edit du profil
  const [showPhone, setShowPhone] = useState(false);
  const [showBirthDay, setShowBirthDay] = useState(false);
  const [showAdress, setShowAdress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showAgencyName, setShowAgencyName] = useState(false);

  const handleShowPhone = () => setShowPhone(true);
  const handleShowAdress = () => setShowAdress(true);
  const handleShowBirthDay = () => setShowBirthDay(true);
  const handleShowPassword = () => setShowPassword(true);
  const handleShowName = () => setShowName(true);
  const handleShowAgencyName = () => setShowAgencyName(true);

  const handleClosePhone = () => setShowPhone(false);
  const handleCloseAdress = () => setShowAdress(false);
  const handleCloseBirthDay = () => setShowBirthDay(false);
  const handleClosePassword = () => setShowPassword(false);
  const handleCloseName = () => setShowName(false);
  const handleCloseAgencyName = () => setShowAgencyName(false);
  return (
    <section className="container" style={{ backgroundColor: "#fffaf6" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-2">
              <div className="card-body text-center">
                <div className="container">
                  <img
                    src={user.photo}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px", marginRight: "-32px" }}
                  />

                  <button style={butonCircle} className="rounded-circle">
                    <BsCameraFill style={{ width: "80%", height: "80%" }} />
                  </button>
                </div>
                <h5 className="my-3">{user.username}</h5>
                <p className="text-muted mb-1">
                  {user.firstName} {user.lastName}{" "}
                </p>
                <p className="text-muted mb-1">{user.mail} </p>
                <div className="d-flex justify-content-center  mt-4">
                  {role === "Agency" ? (
                    <Link to="/AddAnnoucement">
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-1"
                      >
                        Add new Annoucement <GrChapterAdd />
                      </button>
                    </Link>
                  ) : (
                    <Link to="/">
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-1"
                      >
                        Add new Order <GrChapterAdd />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {user.firstName} {user.lastName}
                      <BiEditAlt style={iconPink} onClick={handleShowName} />
                    </p>
                  </div>
                  <CustomModal
                    modalTitle="Your Name"
                    titelFieald="Your name"
                    placeholder="Your name"
                    name="firstName-lastName"
                    variantClose="secondary"
                    titleClose="Close"
                    variantSave="primary"
                    titleSave="Save"
                    show={showName}
                    handleClose={handleCloseName}
                    id={user._id}
                  />
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.mail}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    <p>
                      *********{" "}
                      <BiEditAlt
                        style={iconPink}
                        onClick={handleShowPassword}
                      />
                    </p>
                  </div>
                  <CustomModal
                    modalTitle="Your Password"
                    titelFieald="Password"
                    placeholder="Password"
                    name="password"
                    variantClose="secondary"
                    titleClose="Close"
                    variantSave="primary"
                    titleSave="Save"
                    show={showPassword}
                    handleClose={handleClosePassword}
                    id={user._id}
                  />
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    {user.phone === 0 ? (
                      <Button
                        variant="success"
                        style={{ backgroundColor: "#FBCCD2", color: "black" }}
                        onClick={handleShowPhone}
                      >
                        <BiEditAlt />
                      </Button>
                    ) : (
                      <p className="text-muted mb-0">
                        {user.phone}{" "}
                        <BiEditAlt style={iconPink} onClick={handleShowPhone} />
                      </p>
                    )}
                  </div>
                  <CustomModal
                    modalTitle="Your Phone number"
                    titelFieald="Phone number"
                    placeholder="Phone number"
                    name="phone"
                    variantClose="secondary"
                    titleClose="Close"
                    variantSave="primary"
                    titleSave="Save"
                    show={showPhone}
                    handleClose={handleClosePhone}
                    id={user._id}
                    phone={user.phone}
                  />
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">
                      {role === "Agency" ? "Agency Name" : "Birthday"}
                    </p>
                  </div>
                  <div className="col-sm-9">
                    {role === "Agency" ? (
                      isEmpty(user.agencyName) ? (
                        <Button
                          variant="success"
                          style={{ backgroundColor: "#FBCCD2", color: "black" }}
                          onClick={handleShowAgencyName}
                        >
                          <BiEditAlt />
                        </Button>
                      ) : (
                        <p className="text-muted mb-0">
                          {user.agencyName}
                          <BiEditAlt
                            style={iconPink}
                            onClick={handleShowAgencyName}
                          />
                        </p>
                      )
                    ) : !user.birthDate ? (
                      <Button
                        variant="success"
                        style={{ backgroundColor: "#FBCCD2", color: "black" }}
                        onClick={handleShowBirthDay}
                      >
                        <BiEditAlt />
                      </Button>
                    ) : (
                      <p className="text-muted mb-0">
                        {user.birthDate.slice(0, 10)}{" "}
                        <BiEditAlt
                          style={iconPink}
                          onClick={handleShowBirthDay}
                        />
                      </p>
                    )}
                  </div>
                  <CustomModal
                    modalTitle="Your Phone Birthday"
                    titelFieald="Birthday"
                    placeholder="Birthday"
                    name="birthDate"
                    variantClose="secondary"
                    titleClose="Close"
                    variantSave="primary"
                    titleSave="Save"
                    show={showBirthDay}
                    handleClose={handleCloseBirthDay}
                    id={user._id}
                    birthDay={user.birthDate}
                  />
                  <CustomModal
                  modalTitle="Your Agency Name"
                  titelFieald="Agency Name"
                  placeholder="Agency Name"
                  name="agencyName"
                  variantClose="secondary"
                  titleClose="Close"
                  variantSave="primary"
                  titleSave="Save"
                  show={showAgencyName}
                  handleClose={handleCloseAgencyName}
                  id={user._id}
                  agencyName={user.agencyName}
                />
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    {isEmpty(user.address) ? (
                      <Button
                        variant="success"
                        style={{ backgroundColor: "#FBCCD2", color: "black" }}
                        onClick={handleShowAdress}
                      >
                        {" "}
                        <BiEditAlt />
                      </Button>
                    ) : (
                      <p className="text-muted mb-0">
                        {`${user.address.city}, ${user.address.governorate}, ${user.address.postalCode}, ${user.address.country}`}
                        <BiEditAlt
                          style={iconPink}
                          onClick={handleShowAdress}
                        />
                      </p>
                    )}
                  </div>
                  <CustomModal
                    modalTitle="Your address"
                    titelFieald="Adress"
                    placeholder="Adress"
                    name="Adress"
                    variantClose="secondary"
                    titleClose="Close"
                    variantSave="primary"
                    titleSave="Save"
                    show={showAdress}
                    handleClose={handleCloseAdress}
                    id={user._id}
                    adress={user.address}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilUser;
