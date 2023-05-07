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
import UserRoute from "./Routes/UserRoute";
import { ToastContainer } from "react-toastify";

import CustomNavBarUser from "./Components/user/CustomNavBarUser";
import ListOfOrder from "./Components/order/ListOfOrder";
import ProfilUser from "./Components/user/ProfilUser";
import NewOrder from "./Components/order/NewOrder";

import ConnectedRoute from "./Routes/ConnectedRoute";
import AddAnnoucement from "./Components/listOfAnnoucement/AddAnnoucement";
import AgencyRoute from "./Routes/AgencyRoute";
import ListOrderAgency from "./Components/order/ListOrderAgency";
import { useSelector } from "react-redux";
import AnnouncementItem from "./Components/listOfAnnoucement/AnnouncementItem";
import SearchAnnouncement from "./Components/listOfAnnoucement/SearchAnnouncement";
import NotFound from "./Components/loader/NotFound";

function App() {
  const auth = useSelector((state) => state.ReducerAuth);
  const token = localStorage.getItem("jwt")
const id = localStorage.getItem("idUser")
const role = localStorage.getItem("role")
const username = localStorage.getItem("username")

  return ( 
    <>
      <ToastContainer />
      <BrowserRouter>
        {token ? (
          <CustomNavBarUser   
            />
        ) : (
          <Header />
        )}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<><SearchAnnouncement/><ListOfAnnouncements  /></>}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="notfound" element={<NotFound/>} />
            <Route
              path="profil/"
              element={
                <ConnectedRoute >
                  <ProfilUser  />
                </ConnectedRoute>
              }
            />
            
            <Route
              path="orders"
              element={
                <ConnectedRoute >
                  <ListOfOrder  />
                </ConnectedRoute>
              }
            />
            <Route
              path="ordersAgency"
              element={
                <ConnectedRoute >
                  <ListOrderAgency  />
                </ConnectedRoute>
              }
            />
            <Route
              path="profil/order/:id"
              element={
                <UserRoute >
                  <NewOrder />
                </UserRoute>
              }
            />
            <Route
              path="AddAnnoucement"
              element={
                <AgencyRoute >
                  <AddAnnoucement />
                </AgencyRoute>
              }
            />
            <Route
              path="annoucement/:id"
              element={
                <ConnectedRoute >
                  <DetailAnnoucement />
                </ConnectedRoute>
              }
            />
           <Route path="/item" element={<AnnouncementItem />} />
          </Route>
          <Route path ="/search" element={<SearchAnnouncement/>}/>
          <Route path="/contact" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
