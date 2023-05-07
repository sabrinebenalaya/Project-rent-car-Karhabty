import { getFromApi, postInApi, putInApi } from "../../Services/serviceAPI";
import {
  
  Url_get_announcement_ById,Url_get_announcement_ByAgency,Url_add_announcement, Url_update_announcement_ById
} from "../../Services/Api";

import { GET_ALL_ANNOUCEMENT, GET_ANNOUCEMENT_By_ID , GET_ALL_By_AGENCY, ADD_ANNOUCEMENT, UPDATE_ANNOUCEMENT_By_ID, SEARCH_ANNOUCEMENT} from "../constante";

import { isAuth } from "../../Middleware/isAuth";

export const getAll = () => async (dispatch) => {
  try {
    const announcements = await getFromApi("http://localhost:5000/karhabtyAnnouncement/announcement/");
   
    dispatch({ type: GET_ALL_ANNOUCEMENT, payload: announcements.data });
    
  } catch (e) {
    console.log(e);
  }
};

export const getOne = (id, token) => async (dispatch) => {
  
  try {
    const announcement = await getFromApi(`${Url_get_announcement_ById}${id}`, isAuth(token));

    dispatch({ type: GET_ANNOUCEMENT_By_ID, payload: announcement.data });
  } catch (e) {
    console.log(e);
  }
};

export const getAllByAgency = (id) => async (dispatch) => {
  try {
    const announcement = await getFromApi(`${Url_get_announcement_ByAgency}/${id}`);
    dispatch({ type: GET_ALL_By_AGENCY, payload: announcement.data });
   
  } catch (e) {
    console.log(e);
  }
};

export const addAnnoucement = (newannoucement, navigate) => async (dispatch) => {
  try {
    const announcement = await postInApi(`${Url_add_announcement}`,newannoucement);

    dispatch({ type: ADD_ANNOUCEMENT, payload: announcement.data });
   
   if (announcement.status===201){
    navigate("/")
   }
  } catch (e) {
    console.log(e);
  }
};


export const updateAnnoucement = (anouncementToUpdate, id) => async (dispatch) => {

  try {

    const announcement = await putInApi(`${Url_update_announcement_ById}${id}`, anouncementToUpdate);

    dispatch({ type: UPDATE_ANNOUCEMENT_By_ID, payload: announcement.data });
  } catch (e) {
    console.log(e);
  }
};

export const searchAnnoucement = (announcement, navigate)=> async(dispatch)=>{
  try{
    const params = {
      params: {
        availableEndDate: announcement.availableEndDate,
        availableStartDate: announcement.availableStartDate,
        governorate: announcement.governorate,
        max: announcement.max,
        min: announcement.min,
        rate: announcement.rate
      },
    };
    const announcements = await getFromApi("http://localhost:5000/karhabtyAnnouncement/searchAnnouncement/", params);

   
   console.log("result", announcements)

    dispatch({ type: SEARCH_ANNOUCEMENT, payload: announcements.data });
  if (announcements.data.length===0){
    navigate("/notfound")
  }
  }
  catch (e) {
    console.log(e);
  }
}