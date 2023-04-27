import {
  GET_ALL_ANNOUCEMENT,
  GET_ANNOUCEMENT_By_ID,
  GET_ALL_By_AGENCY,ADD_ANNOUCEMENT, UPDATE_ANNOUCEMENT_By_ID
} from "../constante";

const initialState = { isloading: false, annoucement: {}, announcements: [] };

const ReducerAnnoucement = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUCEMENT:
      return { ...state, isLoading: false, announcements: action.payload };
    case GET_ALL_By_AGENCY:
      return { ...state, isLoading: false, announcements: action.payload };
    case GET_ANNOUCEMENT_By_ID:
      return { ...state, isLoading: false, annoucement: action.payload };
      case ADD_ANNOUCEMENT:
        return { ...state, isLoading: false, announcements: action.payload };
        case UPDATE_ANNOUCEMENT_By_ID:
          return { ...state, isLoading: false, annoucement: action.payload };
        
    default:
      return state;
  }
};

export default ReducerAnnoucement;
