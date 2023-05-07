import {  GET_AGENCY_By_ID,PUT_AGENCY_By_ID , GET_ALL_AGENCY} from "../constante";

const initialState = { isloading: false, agency: {}, agencys: [] };

const ReducerAgency = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_AGENCY_By_ID:
      return { ...state, isLoading: false, agency: action.payload } ;
      case PUT_AGENCY_By_ID:
        return { ...state, isLoading: false, agency: action.payload } ;
        case GET_ALL_AGENCY:
          return { ...state, isLoading: false, agencys: action.payload } ;

    default:
      return state;
  }
};

export default ReducerAgency;