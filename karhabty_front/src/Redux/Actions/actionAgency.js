import { GET_AGENCY_By_ID, PUT_AGENCY_By_ID , GET_ALL_AGENCY} from "../constante";
import { Url_get_agency_ById,  Url_update_User_ById } from "../../Services/Api";
import { putInApi, getFromApi } from "../../Services/serviceAPI";
import { isAuth } from "../../Middleware/isAuth";

export const getAgency = (id, token) => async (dispatch) => {
  try {
    const  Agency 
     = await getFromApi(`${Url_get_agency_ById}/${id}`, isAuth(token));

    dispatch({ type: GET_AGENCY_By_ID, payload: Agency.data });
  } catch (e) {
    console.log(e);
  }
};
export const getAgencyByID = (id) => async (dispatch) => {
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

export const getAllAgency = ( role) => async (dispatch) => {
  try {
    const agencys = await getFromApi(`http://localhost:5000/karhabtyUser/users/${role}`);
    dispatch({ type: GET_ALL_AGENCY, payload: agencys.data });
    
  } catch (e) {
    console.log(e);
  }
};