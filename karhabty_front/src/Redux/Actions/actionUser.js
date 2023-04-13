import { Url_get_user_ById, Url_update_User_ById } from "../../Services/Api";
import { getFromApi, putInApi } from "../../Services/serviceAPI";
import { ADD_USER, UPDATE_USER, DELETE_USER , GET_USER_By_ID} from "../constante";
import { toast } from "react-toastify";

export const addUser = async (user) => {
  return { type: ADD_USER, payload: user };
};

export const updateUser =(newuser, id)=> async (dispatch) => {

  try {
    const user = await putInApi(`${Url_update_User_ById}${id}`,newuser );

    dispatch({ type: UPDATE_USER , payload: user.data });
   
    toast("User updated Successfully!");

  } catch (error) {
    console.log(error);
  }
  
};

export const deleteUser = async () => {
  return { type: DELETE_USER };
};

export const getUser = (id) => async (dispatch) => {
  try {
    const user = await getFromApi(`${Url_get_user_ById}${id}`);

    dispatch({ type: GET_USER_By_ID, payload: user.data });
   
  } catch (e) {
    console.log(e);
  }
};
