import React, { useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "../../Redux/Actions/actionOrder";
import OrderItem from "./OrderItem";
import LoaderPage from "../loader/LoaderPage";

function ListOfOrder({ idUser }) {
  // get the list of orders by user
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersByUser(idUser));
  }, [idUser, dispatch]);
  const listOrders = useSelector((state) => state.ReducerOrder.orders);
 
  return (
    <div className=" container py-5 ">
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Ref</th>
            <th scope="col">Car</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Rate</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {listOrders.length === 0 ? (
            <LoaderPage />
          ) : (
            listOrders.map((item, key) => (
            
                <OrderItem key={key} order={item} />
             
            ))
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default ListOfOrder;
