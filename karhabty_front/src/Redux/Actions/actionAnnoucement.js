import { getFromApi, postInApi } from "../../Services/serviceAPI";
import {
  Url_all_active_announcement,
  Url_get_announcement_ById,Url_get_announcement_ByAgency,Url_add_announcement
} from "../../Services/Api";

import { GET_ALL_ANNOUCEMENT, GET_ANNOUCEMENT_By_ID , GET_ALL_By_AGENCY, ADD_ANNOUCEMENT} from "../constante";

export const getAll = () => async (dispatch) => {
  try {
    const announcements = await getFromApi(Url_all_active_announcement);
    dispatch({ type: GET_ALL_ANNOUCEMENT, payload: announcements.data });
    
  } catch (e) {
    console.log(e);
  }
};

export const getOne = (id) => async (dispatch) => {
  try {
    const announcement = await getFromApi(`${Url_get_announcement_ById}${id}`);

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

export const addAnnoucement = (newannoucement) => async (dispatch) => {
  try {
    const announcement = await postInApi(`${Url_add_announcement}`,newannoucement);

    dispatch({ type: ADD_ANNOUCEMENT, payload: announcement.data });
   
  } catch (e) {
    console.log(e);
  }
};