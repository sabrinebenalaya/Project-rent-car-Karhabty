import {
  Url_get_user_ById,
  Url_update_User_ById,
  Url_update_User_PROFIL_PHOTO,
  Url_GET_ALL_USER,
} from "../../Services/Api";
import { getFromApi, putInApi } from "../../Services/serviceAPI";
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_By_ID,
  UPDATE_USERPHOTO,
  GET_ALL_USER,
} from "../constante";
import { toast } from "react-toastify";
import axios from "axios";
import { isEmpty } from "../../Validator/isEmpty";
export const addUser = async (user) => {
  return { type: ADD_USER, payload: user };
};

//get profil photo
export const updateProfilPhoto = (id, file) => async (dispatch) => {
  console.log("file", file)
  try {
    const  user =  await putInApi(
      `http://localhost:5000/karhabtyUser/user/updatePhoto/${id}`,
      file
    );
     
    if (user.status === 200) {
      dispatch({ type: UPDATE_USERPHOTO, payload: user.data });
    }
  } catch (error) {
    console.log(error);
  }
};

//update user
export const updateUser = (newuser, id) => async (dispatch) => {
  try {
    const user = await putInApi(`${Url_update_User_ById}${id}`, newuser);

    dispatch({ type: UPDATE_USER, payload: user.data });

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

export const getAllUser = () => async (dispatch) => {

  try {
    const users = await getFromApi("http://localhost:5000/karhabtyUser/users");
  
    dispatch({ type: GET_ALL_USER, payload: users.data });
  } catch (e) {
    console.log(e);
  }
};
