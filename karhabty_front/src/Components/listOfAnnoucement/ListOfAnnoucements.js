import React, { useEffect } from "react";
import CardOfAnnoucement from "./CardOfAnnoucement";
import { bloc_flex } from "../../Style/Style";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "./../loader/LoaderPage";
import { getAll, getAllByAgency } from "../../Redux/Actions/actionAnnoucement";
import {
  getAllAgency,
} from "./../../Redux/Actions/actionAgency";
import { useAnnoucement } from "../../Hooks/useAnnoucement";

function ListOfAnnoucements() {
  const id = localStorage.getItem("idUser");
  const role = localStorage.getItem("role");
  const {listofAnnouncement} = useAnnoucement();

  
  const announcements = Array.isArray(listofAnnouncement) ? listofAnnouncement : [listofAnnouncement];

  const agencys = useSelector((state) => state.ReducerAgency.agencys);
  function getAgency(id) {
    return agencys.find((agency) => agency._id === id);
  }
  return (
    <>
      {announcements.length === 0 ? (
        <LoaderPage />
      ) : (
        <div style={bloc_flex}>
          {announcements?.map((item, key) => {
            const agency = getAgency(item.agence);
            return (
              <CardOfAnnoucement
                key={key}
                announcement={item}
                agency={agency}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default ListOfAnnoucements;
