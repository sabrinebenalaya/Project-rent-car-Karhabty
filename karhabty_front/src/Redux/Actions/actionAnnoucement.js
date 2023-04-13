import { getFromApi } from "../../Services/serviceAPI";
import {
  Url_all_active_announcement,
  Url_get_announcement_ById,
} from "../../Services/Api";

import { GET_ALL_ANNOUCEMENT, GET_ANNOUCEMENT_By_ID } from "../constante";

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
