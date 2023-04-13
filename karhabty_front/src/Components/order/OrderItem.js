import React, {useEffect} from 'react'
import {
  MDBBadge,
  MDBBtn,
  
} from "mdb-react-ui-kit";
import { getOne } from '../../Redux/Actions/actionAnnoucement';
import { useDispatch, useSelector } from 'react-redux';
function OrderItem({order}) {
   //get annoucement information 
    const dispatch = useDispatch();
  const annoucement = useSelector(
    (state) => state.ReducerAnnoucement.annoucement
  );
  useEffect(() => {
    dispatch(getOne(order.announcement));
  }, [order.announcement, dispatch]);
  console.log("annoucement", annoucement)
  return (
    <>
    <td>
      <p className="fw-normal mb-1">{order.ref}</p>
      <p className="text-muted mb-0">IT department</p>
    </td>
    <td>
      <div className="d-flex align-items-center">
        <img
          src={annoucement.photo}
          alt="car"
          style={{ width: "100px", height: "100px" }}
         
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">John Doe</p>
          <p className="text-muted mb-0">john.doe@gmail.com</p>
        </div>
      </div>
    </td>
    <td>
      <MDBBadge color="success" pill>
        Active
      </MDBBadge>
    </td>
    <td>Senior</td>
    <td>
      <MDBBtn color="link" rounded size="sm">
        Edit
      </MDBBtn>
    </td>
  </>
  )
}

export default OrderItem