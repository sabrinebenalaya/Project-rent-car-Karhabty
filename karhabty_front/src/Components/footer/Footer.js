
import { Link } from "react-router-dom";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
function Footer() {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm("service_zzf9bky",  "template_5xqlmzt", form.current, "mzYOmtdDxrLx9ikDG")
        .then((result) => {
            toast("message sent")
        }, (error) => {
            console.log(error.text);
            toast.error(error.text)
        });
    };
  return (
    <div>
      {" "}
      <div>
        {/*====== CONTACT PART START ======*/}
        <section id="contact" className="contact-area pt-115">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="contact-title text-center">
                  <h2 className="title">Get In Touch</h2>
                </div>{" "}
                {/* contact title */}
              </div>
            </div>{" "}
            {/* row */}
            <div className="contact-box mt-70">
              <div className="row">
                <div className="col-lg-4">
                  <div className="contact-info pt-25">
                    <h4 className="info-title">Contact Info</h4>
                    <ul>
                      <li>
                        <div className="single-info mt-30">
                          <div className="info-icon">
                            <i className="lni-phone-handset" />
                          </div>
                          <div className="info-content">
                            <p>+216 50 15 15 82</p>
                          </div>
                        </div>{" "}
                        {/* single info */}
                      </li>
                      <li>
                        <div className="single-info mt-30">
                          <div className="info-icon">
                            <i className="lni-envelope" />
                          </div>
                          <div className="info-content">
                            <p>benalayasabrine@karhabty.com</p>
                          </div>
                        </div>{" "}
                        {/* single info */}
                      </li>
                      <li>
                        <div className="single-info mt-30">
                          <div className="info-icon">
                            <i className="lni-home" />
                          </div>
                          <div className="info-content">
                            <p>10 Rue artisanat, La Marsa, Tunisia</p>
                          </div>
                        </div>{" "}
                        {/* single info */}
                      </li>
                    </ul>
                  </div>{" "}
                  {/* contact info */}
                </div>
                <div className="col-lg-8">
                  <div className="contact-form">
                    <form
                      ref={form} onSubmit={sendEmail}
                      data-toggle="validator"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="single-form form-group">
                            <input
                              type="text"
                              name="user_name"
                              placeholder="Enter Your Name"
                              data-error="Name is required."
                              required="required"
                            />
                            <div className="help-block with-errors" />
                          </div>{" "}
                          {/* single form */}
                        </div>
                        <div className="col-lg-6">
                          <div className="single-form form-group">
                            <input
                              type="email"
                              name="user_email"
                              placeholder="Enter Your Email"
                              data-error="Valid email is required."
                              required="required"
                            />
                            <div className="help-block with-errors" />
                          </div>{" "}
                          {/* single form */}
                        </div>
                        <div className="col-lg-12">
                           <div className="single-form form-group">
                            <textarea
                              name="message"
                              placeholder="Enter Your Message"
                              data-error="Please,leave us a message."
                              required="required"
                              defaultValue={""}
                            />
                            <div className="help-block with-errors" />
                          </div>{" "}
                          {/* single form */}
                        </div>
                        <p className="form-message" />
                        <div className="col-lg-12">
                          <div className="single-form form-group">
                            <button className="main-btn" type="submit">
                              CONTACT NOW
                            </button>
                          </div>{" "}
                          {/* single form */}
                        </div>
                      </div>{" "}
                      {/* row */}
                    </form>
                  </div>{" "}
                  {/* row */}
                </div>
              </div>{" "}
              {/* row */}
            </div>{" "}
            {/* contact box */}
          </div>{" "}
          {/* container */}
        </section>
        {/*====== CONTACT PART ENDS ======*/}
        {/*====== FOOTER PART START ======*/}
        <section id="footer" className="footer-area">
          <div className="container">
            <div className="footer-widget pt-75 pb-120">
              <div className="row">
                <div className="col-lg-3 col-md-5 col-sm-7">
                  <div className="footer-logo mt-40">
                    <Link to="/">
                      <img src="assets/images/logo.png" alt="Logo" />
                    </Link>
                    
                    <ul className="footer-social mt-25">
                      <li>
                        <Link to="/">
                          <i className="lni-facebook-filled" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="lni-twitter-original" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="lni-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>{" "}
                  {/* footer logo */}
                </div>
                <div className="col-lg-3 col-md-4 col-sm-5">
                  <div className="footer-link mt-50">
                    <h5 className="f-title">Services</h5>
                    <ul>
                      <li>
                        <a href="/">Rate a Car</a>
                      </li>
                      <li>
                        <a href="/">List the Cars</a>
                      </li>
                      <li>
                      <a href="/">Search a Car</a>
                    </li>
                      <li>
                        <a href="/">LogIn</a>
                      </li>
                      <li>
                        <a href="/">Sing Up</a>
                      </li>
                      <li>
                      <a href="/">Contact Us</a>
                    </li>
                    </ul>
                  </div>{" "}
                  {/* footer link */}
                </div>
               
                <div className="col-lg-4 col-md-5 col-sm-7">
                  <div className="footer-info mt-50">
                    <h5 className="f-title">Contact Info</h5>
                    <ul>
                      <li>
                        <div className="single-footer-info mt-20">
                          <span>Phone :</span>
                          <div className="footer-info-content">
                            <p>+216 50 15 15 82</p>
                            <p>+216 52 54 54 11</p>
                          </div>
                        </div>{" "}
                        {/* single footer info */}
                      </li>
                      <li>
                        <div className="single-footer-info mt-20">
                          <span>Email :</span>
                          <div className="footer-info-content">
                            <p>contact@karhabty.com</p>
                            <p>support@Karhabty.com</p>
                          </div>
                        </div>{" "}
                        {/* single footer info */}
                      </li>
                      <li>
                        <div className="single-footer-info mt-20">
                          <span>Address :</span>
                          <div className="footer-info-content">
                            <p>10 Rue artisanat, La Marsa, Tunisia</p>
                          </div>
                        </div>{" "}
                        {/* single footer info */}
                      </li>
                    </ul>
                  </div>{" "}
                  {/* footer link */}
                </div>
              </div>{" "}
              {/* row */}
            </div>{" "}
           
            {/*  footer copyright */}
          </div>{" "}
          {/* container */}
        </section>
      </div>
    </div>
  );
}

export default Footer;