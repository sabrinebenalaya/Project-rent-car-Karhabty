import { REGISTER, LOGIN_SUCCESS, LOGOUT } from "../constante";
import { Url_Register, Url_login } from "../../Services/Api";


import { postInApi } from "../../Services/serviceAPI";
import { isAuth } from "../../Middleware/isAuth";
import { toast } from "react-toastify";
import { validatorLogin } from "../../Validator/validatorLogin";
import { isEmpty } from "../../Validator/isEmpty";
import { validatorRegister } from "../../Validator/validatorRegister";

//log in
export const logIn = (userInfo, navigate) => async (dispatch) => {
  const { errors, isValid } = validatorLogin(userInfo);
  try {
    if (!isValid) {
      if (!isEmpty(errors.mail)) {
        toast.error(errors.mail);
      }
      if (!isEmpty(errors.password)) {
        toast.error(errors.password);
      }
    } else {
      const res = await postInApi(Url_login, userInfo);

      const { token, user } = res.data;
      localStorage.setItem("jwt", token);

      dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
      isAuth(token);
      navigate("/");
      toast("Successfully loged!");
    }
  } catch (error) {
    if (error.response) {
      error.response.status === 401 &&
        toast.error(error.response.data.password);
      error.response.status === 400 && toast.error(error.response.data.mail);
    } else {
      console.log(error.message);
    }
  }
};



//register
export const register = (userInfo, navigate) => async (dispatch) => {
  const { errors, isValid } = validatorRegister(userInfo);
  try {
    if (!isValid) {
      if (!isEmpty(errors.mail)) {
        toast.error(errors.mail);
      }
      if (!isEmpty(errors.password)) {
        toast.error(errors.password);
      }
      if (!isEmpty(errors.reppassword)) {
        toast.error(errors.reppassword);
      }
      if (!isEmpty(errors.agencyName)) {
        toast.error(errors.agencyName);
      }
      if (!isEmpty(errors.firstName)) {
        toast.error(errors.firstName);
      }
      if (!isEmpty(errors.lastName)) {
        toast.error(errors.lastName);
      }
      if (!isEmpty(errors.username)) {
        toast.error(errors.username);
      }
    } else {
      const res = await postInApi(Url_Register, userInfo);
      const {  user } = res.data;
      dispatch({ type: REGISTER, payload: { user } });
   navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      error.response.status === 400 && toast.error(error.response.data.msg);
    } else {
      console.log(error);
    }
  }
};


// log out
export const logOut = (navigate) => async (dispatch) => {
 
  try {
    localStorage.removeItem('jwt')
    dispatch({
        type: LOGOUT,
        payload: {}
    })
    navigate("/")
  } catch (e) {
    console.log(e);
  }
};