import { GET_REVIEW_By_ID, GET_REVIEW_By_CAR } from "../constante";
import {Url_get_review_ByCar,
    Url_get_review_ById
} from "../../Services/Api";
import { getFromApi } from "../../Services/serviceAPI";

export const getReviewId = (id) => async (dispatch) => {
    try {
      const review = await getFromApi(`${Url_get_review_ById}${id}`);
  
      dispatch({ type: GET_REVIEW_By_ID, payload: review.data });
    } catch (e) {
      console.log(e);
    }
  };


  export const getReviewCar = (id) => async (dispatch) => {
    try {
      const reviews = await getFromApi(`${Url_get_review_ByCar}${id}`);
 
      dispatch({ type: GET_REVIEW_By_CAR, payload: reviews.data });
    } catch (e) {
      console.log(e);
    }
  };