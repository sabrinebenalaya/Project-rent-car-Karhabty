import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_By_ID,
  UPDATE_USERPHOTO,
  GET_ALL_USER,
} from "../constante";

const initialState = { loading: false, users: [], user: {} };

const ReducerUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_By_ID:
      return { ...state, loading: false, user: action.payload };

    case ADD_USER:
      return { ...state, loading: false, users: action.payload };

    case UPDATE_USER:
      return { ...state, loading: false, users: action.payload };

    case DELETE_USER:
      return { ...state, loading: false, users: action.payload };
    case UPDATE_USERPHOTO:
      return { ...state, loading: false, users: action.payload };
    case GET_ALL_USER:
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default ReducerUser;
