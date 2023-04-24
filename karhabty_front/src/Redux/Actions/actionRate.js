import { GET_REVIEW_By_ID, GET_REVIEW_By_CAR, GET_All_REVIEW } from "../constante";
import { Url_get_review_ByCar, Url_get_review_ById, Url_get_all_review } from "../../Services/Api";
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
    if (e.response.data.message ==="Review not found for this car"){
      dispatch({ type: GET_REVIEW_By_CAR, payload: [] })
    }
  }
};

// get all the reviews
export const getAllReview  = () =>  async (dispatch) => {
  try {
    const reviews = await getFromApi(Url_get_all_review);
   
  dispatch({ type: GET_All_REVIEW, payload: reviews.data });
  } catch (e) {
    console.log(e);
   
  }
};