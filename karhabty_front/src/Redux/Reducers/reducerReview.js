import { GET_REVIEW_By_ID, GET_REVIEW_By_CAR } from "../constante";

const initialState = { isloading: false, review: {}, reviews:[]};

const ReducerReview = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_REVIEW_By_ID:
      return { ...state, isLoading: false, review: action.payload } ;
    
    case GET_REVIEW_By_CAR:
    return {...state, isLoading: false, reviews: action.payload }
    default:
      return state;
  }
  
};

export default ReducerReview;