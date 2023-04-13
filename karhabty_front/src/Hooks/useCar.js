import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { getAllCars, search } from "../Redux/Actions/actionCars";


export const useCar = () => {
  const dispatch = useDispatch();
  dispatch(getAllCars());
  const listOfCars = useSelector((state) => state.ReducerCars.cars);

  

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

  return { setSearchInput, searchInput, handleSubmit, listOfCars };
};
