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

function App() {
  const auth = useSelector((state) => state.ReducerAuth);

  const user = {
    isConnected: auth.isAuthenticated,
    role: !isEmpty(auth.user) ? auth.user.roleUser : null,
    id: !isEmpty(auth.user) ? auth.user._id : null,
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {user.isConnected ? (
          <CustomNavBarUser
            id={user.id}
            username={auth.user.username}
            role={user.role}
          />
        ) : (
          <Header />
        )}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<ListOfAnnouncements id={user.id} role={user.role} />}
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
              path="profil/orders"
              element={
                <UserRoute user={user}>
                  <ListOfOrder idUser={user.id} />
                </UserRoute>
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
                <AgencyRoute user={user}>
                  <AddAnnoucement />
                </AgencyRoute>
              }
            />
            <Route
              path="annoucement/:id"
              element={
                <ConnectedRoute user={user}>
                  <DetailAnnoucement role={user.role} />
                </ConnectedRoute>
              }
            />
            <Route
              path="editAnnoucement/:id"
              element={
                <AgencyRoute user={user}>
                  <EditAnnoucement id={user.id} />
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
