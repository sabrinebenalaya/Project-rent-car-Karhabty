import React from "react";
import { flex_two_element } from "../../Style/Style";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
              <img
                src="assets/images/logoKarhabty.png"
                alt="Logo"
                height="60px"
                width="160px"
              />
            </a>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                id="nav"
                className="navbar-nav ml-auto"
                style={{ ...flex_two_element, float: "right" }}
              >
                <li style={{ margin: "20px" }}>
                  <Link
                    data-scroll-nav={0}
                    style={{ color: " #e83e8c" }}
                    to="/login"
                  >
                    Log In
                  </Link>
                  <button
                  className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="bar-icon"></span>
                    <span className="bar-icon"></span>
                    <span className="bar-icon"></span>
                  </button>
                </li>
                <li style={{ margin: "20px" }}>
                  <Link
                    data-scroll-nav={0}
                    style={{ color: "#e83e8c" }}
                    to="/register"
                  >
                    SingUp
                  </Link>
                </li>
                <li style={{ margin: "20px" }}>
                  <Link
                    data-scroll-nav={0}
                    style={{ color: "#e83e8c" }}
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>{" "}
              {/* navbar nav */}
            </div>
          </nav>
          {/* navbar */}
        </div>

        <div>{/* row */}</div>
      </div>
    </div>
  );
}

export default Header;
