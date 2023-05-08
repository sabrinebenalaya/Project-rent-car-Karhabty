import React, { useState } from "react";
import { toast } from "react-toastify";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import DatePicker from "react-datepicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdressOptions } from "../../Redux/constante";
import CustomInput from "./../../Atom/CustomInput";
import { useAnnoucement } from "../../Hooks/useAnnoucement";

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
    padding: "20px",
    margin: "auto",
    boxShadow: estReduit ? "" : "0px 2px 5px rgba(0, 0, 0, 0.25)",
  };
  ///end bloc reduit

  //state annoucement
  const { setAnnouncement, announcement, handleSubmit } = useAnnoucement();
  const handelSumbit = (e) => {
    e.preventDefault();
    if (announcement.availableStartDate>announcement.availableEndDate){
      toast.error("Date de fin inférieure à la date de début");
    }else{
      handleSubmit(announcement);
    }
    
  };

  //end state
  return (
    <div style={reduit}>
      <div className="contact-title text-center" style={{ height: "50px" }}>
        <h2 className="title">Search for your Car</h2>
      </div>

      <form data-toggle="validator" style={formStyle}>
        <div className="row">
          <div className="col-lg-6">
            <div className="single-form form-group">
              <label>Date de retrait</label>
              <DatePicker
                showIcon
                selected={announcement.availableStartDate}
                onChange={(date) =>
                  setAnnouncement({ ...announcement, availableStartDate: date })
                }
                dateFormat="dd/MM/yyyy"
                name="availableStartDate"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single-form form-group">
              <label>Date de retour</label>
              <DatePicker 
                showIcon
                selected={announcement.availableEndDate}
                onChange={(date) =>
                  setAnnouncement({ ...announcement, availableEndDate: date })
                }
                dateFormat="dd/MM/yyyy"
                name="availableEndDate"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="single-form form-group">
              <InputLabel>Adress</InputLabel>
              <Select
                onChange={(event) =>
                  setAnnouncement({
                    ...announcement,
                    [event.target.name]: event.target.value,
                  })
                }
                value={announcement.governorate || ""}
                className="col-lg-12"
                name="governorate"
              >
                {AdressOptions.map((op, index) => (
                  <MenuItem key={index} value={op.value}>
                    {op.label}
                  </MenuItem>
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
                handleChange={(event) =>
                  setAnnouncement({
                    ...announcement,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="single-form form-group">
              <CustomInput
                type="text"
                placeholder="Max price"
                name="max"
                handleChange={(event) =>
                  setAnnouncement({
                    ...announcement,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div
              className="single-form form-group "
              style={{ textAlign: "center" }}
            >
              <button className="main-btn" type="submit" onClick={handelSumbit}>
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
