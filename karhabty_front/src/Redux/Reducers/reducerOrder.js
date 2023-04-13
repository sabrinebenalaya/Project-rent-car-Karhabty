import { GET_ALL_ORDERS_BY_USER} from "../constante";

const initialState = { isloading: false, order: {}, orders: [] };

const ReducerOrder = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_BY_USER:
      return { ...state, isLoading: false, orders: action.payload };
    
    default:
      return state;
  }
};

export default ReducerOrder;
