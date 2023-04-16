import { GET_ALL_CARS, SEARCH_CAR, GET_CAR_By_ID, ADD_CAR } from "../constante";

const initialState = { isloading: false, car: {}, cars: [] };

const ReducerCars = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CARS:
      return { ...state, isLoading: false, cars: action.payload };
    case SEARCH_CAR:
      return { ...state, isLoading: false, cars: action.payload };
    case GET_CAR_By_ID:
      return { ...state, isLoading: false, car: action.payload };
    case ADD_CAR:
      return { ...state, isLoading: false, cars: action.payload };
    default:
      return state;
  }
};

export default ReducerCars;
