import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { card_car, flex_two_element } from "../../Style/Style";
import { useNavigate } from "react-router";

function CardOfAnnoucement({ announcement }) {
  const navigate = useNavigate();
  const handelClick = (id) => {
    navigate(`annoucement/${id}`);
  };
  return (
    <Card style={card_car} className="contact-box">
      <CardMedia
        component="img"
        height="194"
        width="194"
        image={announcement.photo}
        alt="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {announcement.titre}
        </Typography>
      </CardContent>

      <CardActions disableSpacing style={flex_two_element}>
        <Typography variant="body2" color="text.secondary">
          {announcement.price} DNT
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e83e8c" }}
          onClick={() => handelClick(announcement._id)}
        >
          More Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardOfAnnoucement;
