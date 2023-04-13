import { LOGIN_SUCCESS, LOGOUT,  REGISTER } from "../constante";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {},
  users: [],
};

const ReducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        users: action.payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default ReducerAuth;
