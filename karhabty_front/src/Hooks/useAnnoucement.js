
import { useDispatch, useSelector } from "react-redux";
import ReducerAnnoucement from "../Redux/Reducers/reducerAnoucement"
import { useState, useEffect } from "react";
import {search} from "../Redux/Actions/actionCars"
import { getAll } from './../Redux/Actions/actionAnnoucement';


export const useAnnoucement = () => {
  const dispatch = useDispatch();
  

 
 //get list of cars
  useEffect(() => {
    
    dispatch (getAll());
    
  }, []);
  const list = useSelector((state)=> state.ReducerAnnoucement.announcements)

  //search
  const [searchInput, setSearchInput] = useState({
    min: 0,
    max: 0,
    brand: "",
    adress: "",
  });
 
  const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(search(searchInput));
  };

 
  return {setSearchInput, searchInput, handleSubmit, list };
};
