import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { card_car, circle, flex_two_element } from "../../Style/Style";
import { useNavigate } from "react-router";

function CardOfAnnoucement({ announcement, agency }) {
  const role = localStorage.getItem("role");
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const heartStyle = {
    fontSize: "2rem",
    color: liked ? "red" : "black",
    cursor: "pointer",
    transition: "color 0.2s ease",
  };

  const navigate = useNavigate();
  const handelClick = (id) => {
    navigate(`annoucement/${id}`);
  };
  // cast the date of order
  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }
  let date = "";
  if (announcement.availableStartDate) {
    date = announcement.availableStartDate.slice(0, 10);
    date = reverseString(date);
  } else {
    date = "";
  }
  return (
    <Card
      style={{ ...card_car, cursor: "pointer" }}
      className="contact-box row justify-content-center"
    >
      <div
        className="single-blog mt-30"
        onClick={() => handelClick(announcement._id)}
      >
        <div className="blog-image">
          <CardMedia
            component="img"
            height="194"
            width="194"
            image={announcement.photo}
            alt="Paella dish"
          />
        </div>
        <CardContent>
          <h4 className="title"> {announcement.titre}</h4>
          <div style={flex_two_element}>
            <span>{date}</span>
            <span>{announcement.price} DNT</span>
          </div>
        </CardContent>
      </div>

      <div className="meta d-flex justify-content-between align-items-center">
        {role !== "Agency" && (
          <div className="meta-admin d-flex align-items-center">
            <div className="image">
              <a href="#">
                <img
                  src={agency.photo}
                  alt="Admin"
                  style={{ ...circle, marginRight: "20px" }}
                />
              </a>
            </div>
            <div className="admin-title">
              <h6 className="title">{agency.agencyName}</h6>
            </div>
          </div>
        )}
        {role === "User" && (
          <div className="meta-icon">
            <ul>
              <li onClick={handleLikeClick}>
                <i className="lni-heart" style={heartStyle}></i>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

export default CardOfAnnoucement;
