import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByAgency } from "../../Redux/Actions/actionOrder";
import LoaderPage from "../loader/LoaderPage";
import { isEmpty } from "../../Validator/isEmpty";
import { strongText } from "../../Style/Style";
import { MDBBadge } from "mdb-react-ui-kit";
function ListOrderAgency() {
  const idUser = localStorage.getItem("idUser");
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersByAgency(idUser));
  }, [idUser,dispatch]);
  const listOrders = useSelector((state) => state.ReducerOrder.orders);


  function reverseString(str) {
    return str.split("-").reverse().join("-");
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
            <th scope="col">End Date</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {isEmpty(listOrders) ? (
            <LoaderPage />
          ) : (
            listOrders.map((item, key) => {
              return (
                <tr>
                  <td>
                    <p className="fw-normal mb-1" style={strongText}>
                      {item.ref}
                    </p>
                    <p className="text-muted mb-0">
                      {reverseString(item.date.slice(0, 10))}
                    </p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.photo}
                        alt="car"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </td>
                  <td>{item.price} Dnt</td>
                  <td>
                    <MDBBadge style={{ marginTop: "10px" }}>
                      {item.status}
                    </MDBBadge>
                  </td>
                  <td>{ reverseString(item.availableDates.endDate.slice(0, 10))}</td>
                </tr>
              );
            })
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default ListOrderAgency;
