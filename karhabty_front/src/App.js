import "./App.css";
import Header from "./Components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import DetailAnnoucement from "./Components/listOfAnnoucement/DetailAnnoucement";
import ListOfAnnouncements from "./Components/listOfAnnoucement/ListOfAnnoucements";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/footer/Footer";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import { useSelector } from "react-redux";
import UserRoute from "./Routes/UserRoute";
import { ToastContainer } from "react-toastify";

import CustomNavBarUser from "./Components/user/CustomNavBarUser";
import ListOfOrder from "./Components/order/ListOfOrder";
import { isEmpty } from "./Validator/isEmpty";
import ProfilUser from "./Components/user/ProfilUser";
import NewOrder from "./Components/order/NewOrder";

import ConnectedRoute from "./Routes/ConnectedRoute";
import AddAnnoucement from "./Components/listOfAnnoucement/AddAnnoucement";
import AgencyRoute from "./Routes/AgencyRoute";
import EditAnnoucement from "./Components/listOfAnnoucement/EditAnnoucement";
import ListOrderAgency from "./Components/order/ListOrderAgency";

function App() {
  const auth = useSelector((state) => state.ReducerAuth);
  const token = localStorage.getItem("jwt")
const id = localStorage.getItem("idUser")
const role = localStorage.getItem("role")
const username = localStorage.getItem("username")
 console.log("id in localstorge", id)
  const user = {
    isConnected: auth.isAuthenticated,
    role: !isEmpty(auth.user) ? auth.user.roleUser : null,
    id: !isEmpty(auth.user) ? auth.user._id : null,
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {token? (
          <CustomNavBarUser
            id={id}
            username={username}
            role={role}
          />
        ) : (
          <Header />
        )}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<ListOfAnnouncements id={id} role={role} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              path="profil/"
              element={
                <ConnectedRoute user={user}>
                  <ProfilUser id={user.id} role={user.role} />
                </ConnectedRoute>
              }
            />

            <Route
              path="orders"
              element={
                <ConnectedRoute user={user}>
                  <ListOfOrder idUser={id}  /> 
                </ConnectedRoute>
              }
            />
             <Route
              path="ordersAgency"
              element={
                <ConnectedRoute user={user}>
                  <ListOrderAgency idUser={id}  /> 
                </ConnectedRoute>
              }
            />
            <Route
              path="profil/order/:id"
              element={
                <UserRoute user={user}>
                  <NewOrder />
                </UserRoute>
              }
            />
           
            <Route
              path="AddAnnoucement" 
              element={
                <AgencyRoute user={user}><AddAnnoucement id={id} /></AgencyRoute>
                  
               
              }
            />
            <Route
              path="annoucement/:id"
              element={
                <ConnectedRoute user={user}>
                  <DetailAnnoucement />
                </ConnectedRoute>
              }
            />
            <Route
              path="editAnnoucement/:id"
              element={
                <AgencyRoute user={user} role={role}>
                  <EditAnnoucement id={id} />
                </AgencyRoute>
              }
            />
          </Route>
          <Route path="/contact" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
