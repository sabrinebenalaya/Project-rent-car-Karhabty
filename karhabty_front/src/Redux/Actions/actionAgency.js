import { GET_AGENCY_By_ID, PUT_AGENCY_By_ID } from "../constante";
import { Url_get_agency_ById,  Url_update_User_ById } from "../../Services/Api";
import { putInApi, getFromApi } from "../../Services/serviceAPI";

export const getAgency = (id) => async (dispatch) => {
  try {
    const  Agency 
     = await getFromApi(`${Url_get_agency_ById}/${id}`);

    dispatch({ type: GET_AGENCY_By_ID, payload: Agency.data });
  } catch (e) {
    console.log(e);
  }
};

export const updateAgency = (attribut,text,id) => async (dispatch) => {
  try {
    const {
      data: { agency },
    } = await putInApi(`${ Url_update_User_ById }/${id}/${attribut}/${text}`);
    dispatch({ type: PUT_AGENCY_By_ID, payload: agency });

  } catch (e) {
    console.log(e);
  }
};
