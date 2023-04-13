import React, { useState } from "react";
import { utcToZonedTime, getTimezoneOffset } from "date-fns-tz";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function CustomDatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const { stDate, enDate } = props;

  const handleDateChange = (date, e) => {
      
    if (date < stDate ) {
      console.log("la", date, "n'est pas autorisée")

    }
    
    if (date>enDate){
        console.log("la date", date, "n'est pas autorisée")}
     
     
        setSelectedDate(date);
    

    if (props.onDateChange) {
      const timeZone = "Europe/Tunis";
      const timeZoneOffset = getTimezoneOffset(date, timeZone);
      const localSelectedDate = date && utcToZonedTime(date, timeZoneOffset);
      props.onDateChange(localSelectedDate);
    }
  };
  const timeZone = "Europe/Tunis";

  const timeZoneOffset = getTimezoneOffset(selectedDate, timeZone);

  const localSelectedDate =
    selectedDate && utcToZonedTime(selectedDate, timeZoneOffset);

  

  
  return (
    <DatePicker
    selected={localSelectedDate}
    onChange={handleDateChange}
    dateFormat="dd/MM/yyyy"
    value={localSelectedDate}
  />
      
  
  );
}

export default CustomDatePicker;
