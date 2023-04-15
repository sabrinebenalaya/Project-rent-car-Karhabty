import React,{useState} from "react";
import { MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../Redux/Actions/actionAuth";
function Register() {

  const [newUser, setNewUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelChange = (e) => {
    if (e.target.name === "isAgency") {
      if (e.target.checked) {
        setNewUser({ ...newUser, [e.target.name]: true });
      } else {
        setNewUser({ ...newUser, [e.target.name]: false });
      }
    }else{
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handelSumbit = (e)=>{
    e.preventDefault();
    dispatch(register(newUser,navigate))
  }
  return (
    <section className="h-100 ">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Sample car "
                    className="img-fluid w-100 h-100"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem",
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration form</h3>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1m"
                            className="form-control form-control-lg"
                            name="firstName"
                            onChange={handelChange}
                          />
                          <label className="form-label" for="form3Example1m">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1n"
                            className="form-control form-control-lg"
                            name="lastName"
                            onChange={handelChange}
                          />
                          <label className="form-label" for="form3Example1n">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        name="agencyName"
                        onChange={handelChange}
                      />
                      <label className="form-label" for="form3Example8">
                        Agency Name
                      </label>
                      <MDBSwitch
                        id="flexSwitchCheckChecked"
                        label="You are an Agency"
                        name="isAgency"
                        onClick={handelChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        name="username"
                        onChange={handelChange}
                      />
                      <label className="form-label" for="form3Example8">
                        User Name
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        name="mail"
                          onChange={handelChange}
                      />
                      <label className="form-label" for="form3Example8">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example9"
                        className="form-control form-control-lg"
                        name="password"
                        onChange={handelChange}
                      />
                      <label className="form-label" for="form3Example9">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example9"
                        className="form-control form-control-lg"
                        name="reppassword"
                        onChange={handelChange}
                      />
                      <label className="form-label" for="form3Example9">
                        Retape Password
                      </label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" className="btn btn-light btn-lg">
                        Reset all
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning btn-lg ms-2 "
                        style={{ backgroundColor: "#e83e8c" }}
                        onClick={handelSumbit}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
