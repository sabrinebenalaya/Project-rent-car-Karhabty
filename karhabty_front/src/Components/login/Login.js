import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { logIn } from "../../Redux/Actions/actionAuth";
import { useNavigate } from "react-router-dom";
function Login() {
  //login
  const [loginUser, setLoginUser] = useState({
    mail: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handelSumbit = (e) => {
    dispatch(logIn(loginUser, navigate));
  };
 

  return (
    <div>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://images.pexels.com/photos/2633046/pexels-photo-2633046.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="login form"
                className="rounded-start w-100 h-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <img
                    src="assets/images/logoKarhabty.png"
                    alt="Logo"
                    height="60px"
                    width="160px"
                  />
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  name="mail"
                  type="mail"
                  size="lg"
                  onChange={handelChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  name="password"
                  type="password"
                  size="lg"
                  onChange={handelChange}
                />
                <Button
                  variant="info"
                  style={{ backgroundColor: "#e83e8c" }}
                  onClick={handelSumbit}
                >
                  LogIn
                </Button>

                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link style={{ color: "#393f81" }} to="/register">
                    Register here
                  </Link>
                </p>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Login;
