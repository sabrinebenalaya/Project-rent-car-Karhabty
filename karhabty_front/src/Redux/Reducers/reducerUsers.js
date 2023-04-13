import { ADD_USER, UPDATE_USER, DELETE_USER, GET_USER_By_ID } from "../constante";

const initialState = { loading: false, users: [] , user:{}};

const ReducerUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_By_ID:
         
    return { ...state, Loading: false, user: action.payload };

    case ADD_USER:
        
      return { ...state, Loading: false, users: action.payload };

    case UPDATE_USER:
      return { ...state, Loading: false, users: action.payload };

    case DELETE_USER:
      return { ...state, Loading: false, users: action.payload };
    default:
      return state;
  }
};

export default ReducerUser;
