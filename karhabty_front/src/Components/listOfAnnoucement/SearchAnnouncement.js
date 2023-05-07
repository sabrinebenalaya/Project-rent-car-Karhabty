import React, { useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import DatePicker from "react-datepicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdressOptions } from "../../Redux/constante";
import CustomInput from "./../../Atom/CustomInput";
import ReactStars from "react-rating-stars-component";
function SearchAnnouncement() {


  // reduire le bloc du recherche
  const [estReduit, setEstReduit] = useState(false);

  const toggleReduction = () => {
    setEstReduit(!estReduit);
  };
  const reduit = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: estReduit ? "70px" : "100%",
    width: "100%",
    transition: "height 0.5s ease",
   
  };
  const formStyle = {
    display: estReduit ? "none" : "block",
    width: "80%",
    maxWidth: "600px",
    padding :"20px",
    margin: "auto", boxShadow: estReduit ? "" : "0px 2px 5px rgba(0, 0, 0, 0.25)"
  };

  /// date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // adress
  const [adress, setAdress] = useState("");

  const handleChange = (event) => {
    setAdress(event.target.value);
  };

  /// price
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  //rate
  const [rate, setRate] = useState(0);

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };
  return (
    <div style={reduit}>
      <div className="contact-title text-center" style={{ height: "50px" }}>
        <h2 className="title">Search for your Car</h2>
      </div>

      <form data-toggle="validator" style={formStyle}>
        <div className="row">
          <div className="col-lg-6">
            <div className="single-form form-group">
              <label for="id_du_champ">Date de retrait</label>
            
               <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                value={startDate}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single-form form-group">
              <label for="id_du_champ">Date de retour</label>
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                value={endDate}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="single-form form-group" >

            <InputLabel id="demo-simple-select-helper-label" >
                Adress
              </InputLabel>
              <Select
                onChange={handleChange}
                value={adress}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="col-lg-12"
              >
                {AdressOptions.map((op) => (
                  <MenuItem value={op.value}>{op.label}</MenuItem>
                ))}
              </Select>
            </div>
          </div>
         
       
          <div className="col-lg-6">
            <div className="single-form form-group">
            
              <CustomInput
                type="text"
                placeholder="Min price"
                name="min"
                handleChange={(event) => setMin(event.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="single-form form-group">
             
            <CustomInput
                type="text"
                placeholder="Max price"
                name="max"
                handleChange={(event) => setMax(event.target.value)}
              />
            </div>
          </div>




          <div className="col-lg-6">
                <div className="single-form form-group">
                    <InputLabel >
                      Rate
                    </InputLabel>
                </div>
          </div>
            
            
             
              <div className="col-lg-6">
                <div className="single-form form-group">
                        <div className="starsRate">
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            edit={true}
                          />
                         </div> 
                  </div>
             </div>




          <div className="col-lg-12">
            <div className="single-form form-group "style={{ textAlign: "center"}}>
              <button className="main-btn" type="submit">
                SEARCH NOW
              </button>
            </div>
          </div>
       </div>
      </form>

      {estReduit ? (
        <BsChevronUp onClick={toggleReduction} />
      ) : (
        <BsChevronDown onClick={toggleReduction} />
      )}
    </div>
  );
}

export default SearchAnnouncement;
