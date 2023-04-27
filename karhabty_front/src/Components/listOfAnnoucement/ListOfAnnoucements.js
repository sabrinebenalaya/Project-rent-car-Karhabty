import React, { useEffect } from "react";
import CardOfAnnoucement from "./CardOfAnnoucement";
import { bloc_flex } from "../../Style/Style";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "./../loader/LoaderPage";
import { getAll, getAllByAgency } from "../../Redux/Actions/actionAnnoucement";
function ListOfAnnoucements({id, role}) {

 
    // get the list of annoucements
  const dispatch = useDispatch();
  useEffect(() => {
    if (role === "Agency") {
      dispatch(getAllByAgency(id))
    } else {
    
      dispatch(getAll());
    }
  }, [id,role,dispatch]);
  const list = useSelector((state) => state.ReducerAnnoucement.announcements);
console.log("list of annoucement", list)
  return (
    <>
      {list.length === 0 ? (
        <LoaderPage />
      ) : (
        <div style={bloc_flex}>
          {list?.map((item, key) => (
            <CardOfAnnoucement key={key} announcement={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default ListOfAnnoucements;
