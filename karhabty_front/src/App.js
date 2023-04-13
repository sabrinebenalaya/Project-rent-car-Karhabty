import "./App.css";
import Header from "./Components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import DetailAnnoucement from "./Components/listOfAnnoucement/DetailAnnoucement";
import ListOfAnnouncements from "./Components/listOfAnnoucement/ListOfAnnoucements";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/footer/Footer";
import Login from "./Components/login/Login";
import Agency from "./Components/agency/Agency";
import Register from "./Components/register/Register";
import { useSelector } from "react-redux";
import UserRoute from "./Routes/UserRoute";
import { ToastContainer } from "react-toastify";

import AgencyRoute from "./Routes/AgencyRoute";
import CustomNavBarUser from "./Components/user/CustomNavBarUser";
import ListOfOrder from "./Components/order/ListOfOrder";
import { isEmpty } from "./Validator/isEmpty";
import ProfilUser from "./Components/user/ProfilUser";
import NewOrder from "./Components/order/NewOrder";

function App() {
  const auth = useSelector((state) => state.ReducerAuth);

  const user = {
    isConnected: auth.isAuthenticated,
    role: !isEmpty(auth.user) ? auth.user.roleUser : null,
    id: !isEmpty(auth.user) ? auth.user._id : null
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {user.isConnected ? (
          <CustomNavBarUser id={user.id} username={auth.user.username} />
        ) : (
          <Header />
        )}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListOfAnnouncements />} />

            <Route path="annoucement/:id" element={<DetailAnnoucement />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="profil/"
              element={
                <UserRoute user={user}>
                  <ProfilUser id={user.id}  />
                </UserRoute>
              }
            />
            <Route
            path="profil/orders"
            element={
              <UserRoute user={user}>
                <ListOfOrder idUser={user.id}  />
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
              path="agency"
              element={
                <AgencyRoute user={user}>
                  <Agency />
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
