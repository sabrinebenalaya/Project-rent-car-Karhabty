import { getFromApi } from "../../Services/serviceAPI";
import { Url_get_order_ByUser } from "../../Services/Api";
import { toast } from "react-toastify";
import { GET_ALL_ORDERS_BY_USER } from "../constante";

export const getAllOrdersByUser = (id) => async (dispatch) => {
  try {
    const orders = await getFromApi(`${Url_get_order_ByUser}${id}`);

    dispatch({ type: GET_ALL_ORDERS_BY_USER, payload: orders.data });
  } catch (e) {
    if (e.response.status === 404) {
      toast.error(e.response.data.message);
    } else {
      console.log(e);
    }
  }
};
