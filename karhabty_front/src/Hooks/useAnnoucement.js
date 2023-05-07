
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAll, getAllByAgency, searchAnnoucement } from './../Redux/Actions/actionAnnoucement';
import { getAllAgency } from "../Redux/Actions/actionAgency";
import { useNavigate } from "react-router";


export const useAnnoucement = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("idUser");
  const role = localStorage.getItem("role");
const navigate = useNavigate()
 
 //get list of cars
 useEffect(() => {
  dispatch(getAllAgency("Agency"));
  if (role === "Agency") {
    dispatch(getAllByAgency(id));
  } else {
    dispatch(getAll());
  } 
}, [id, role, dispatch]);

 
  //search
  const [announcement, setAnnouncement] = useState({});
 
  const handleSubmit = () => {
     dispatch(searchAnnoucement(announcement,navigate));
  };
  const listofAnnouncement = useSelector((state)=> state.ReducerAnnoucement.announcements)


  return {setAnnouncement, announcement, handleSubmit, listofAnnouncement };
};
