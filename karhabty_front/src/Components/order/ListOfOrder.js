import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "../../Redux/Actions/actionOrder";
import OrderItem from "./OrderItem";
import LoaderPage from "../loader/LoaderPage";
import { getAll } from "../../Redux/Actions/actionAnnoucement";
import { getAllCars } from "../../Redux/Actions/actionCars";
import { getAllUser } from "../../Redux/Actions/actionUser";
import { isEmpty } from "../../Validator/isEmpty";

function ListOfOrder() {
  // get the list of orders by user
  const dispatch = useDispatch();
  const idUser = localStorage.getItem("idUser");
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllOrdersByUser(idUser, token));
    dispatch(getAll);
    dispatch(getAllCars(token));
    dispatch(getAllUser(token));
  }, [idUser, dispatch]);

  const listOrders = useSelector((state) => state.ReducerOrder.orders);
  const listAnnouncement = useSelector(
    (state) => state.ReducerAnnoucement.announcements
  );
  const listCars = useSelector((state) => state.ReducerCars.cars);

  const listAgency = useSelector((state) => state.ReducerUser.users);

  function getInfo(item) {
    const agency = listAgency.find((el) => el._id === item.agency);
    const announcement = listAnnouncement.find(
      (el) => el._id === item.announcement
    );

    let car = {};

    if (announcement) {
      car = listCars.find((el) => el._id === announcement.car);
    }

    return {  car, agency };
  }

  return (
    <div className=" container py-5 ">
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Ref</th>
            <th scope="col">Car</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {isEmpty(listOrders) ? (
            <LoaderPage />
          ) : (
            listOrders.map((item, key) => {
              const {  car, agency }=getInfo(item)
              return (
                <OrderItem
                  key={key}
                  order={item}
                  car={car}
                  agency={agency}
                />
              );
            })
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default ListOfOrder;
