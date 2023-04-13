import { combineReducers } from "redux";
import ReducerCars from './reducerCars';
import ReducerUser from './reducerUsers';
import ReducerAgency from './reducerAgency';
import ReducerAuth from './reducerAuth';
import ReducerAnnoucement from './reducerAnoucement';
import ReducerReview from "./reducerReview";
import ReducerOrder from "./reducerOrder";


const RootReducer = combineReducers({
  ReducerCars: ReducerCars,
  ReducerUser: ReducerUser,
  ReducerAgency : ReducerAgency,
  ReducerAuth : ReducerAuth,
  ReducerAnnoucement : ReducerAnnoucement,
  ReducerReview : ReducerReview,
  ReducerOrder : ReducerOrder,
});

export default RootReducer;