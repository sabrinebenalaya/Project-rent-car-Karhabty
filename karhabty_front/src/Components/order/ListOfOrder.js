import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "../../Redux/Actions/actionOrder";
import OrderItem from "./OrderItem";
import LoaderPage from "../loader/LoaderPage";
import { getAll } from "../../Redux/Actions/actionAnnoucement";
import { getAllCars } from "../../Redux/Actions/actionCars";
import { getAllUser } from "../../Redux/Actions/actionUser";
import { getAllReview } from "../../Redux/Actions/actionRate";
import { isEmpty } from "../../Validator/isEmpty";

function ListOfOrder({ idUser }) {
  // get the list of orders by user
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersByUser(idUser));
    dispatch(getAll());
    dispatch(getAllCars());
    dispatch(getAllUser());
    dispatch(getAllReview());
  }, [idUser, dispatch]);

  const listOrders = useSelector((state) => state.ReducerOrder.orders);
  const listAnnouncement = useSelector(
    (state) => state.ReducerAnnoucement.announcements
  );
  const listCars = useSelector((state) => state.ReducerCars.cars);
  const listUser = useSelector((state) => state.ReducerUser.users);
  const listReviews = useSelector((state) => state.ReducerReview.reviews);

  function getInfo(item) {
    const announcement = listAnnouncement.find(
      (el) => el._id === item.announcement
    );

    let car = {};
    let agency = {};
    let reviews = [];
    if (announcement) {
      car = listCars.find((el) => el._id === announcement.car);

      agency = listUser.find((el) => el._id === announcement.agence);
      if (car) {
        reviews = listReviews.filter((el) => el.car === car._id);
      }
    }

    return { announcement, car, agency, reviews };
  }
  isEmpty(listOrders) ||
  isEmpty(listCars) ||
  isEmpty(listUser) ||
  isEmpty(listAnnouncement)
    ? console.log(
        "one of this is empty",
        isEmpty(listOrders),
        isEmpty(listCars),
        isEmpty(listUser),
        isEmpty(listAnnouncement)
      )
    : console.log(
       listOrders,
          listCars,
          listUser,
         listAnnouncement
      );
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
          {isEmpty(listOrders) ? (
            <LoaderPage /> 
          ) : (
            listOrders.map((item, key) => {
              const { announcement, car, agency, reviews } = getInfo(item);
              return (
                <OrderItem
                  key={key}
                  order={item}
                 
                  announcement={announcement}
                  car={car}
                  agency={agency}
                  reviews={reviews}
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
