import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import {Switch,Route} from "react-router-dom"
import Header from "./components/nav/Header"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import {  onAuthStateChanged } from "firebase/auth";
import {getCurrentUser} from "./functions/auth"
import History  from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserRoute from "./routes/UserRoutes";
import AdminRoute from "./routes/AdminRoutes";

const  App= ()=> {
  const dispatch=useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth,async (user) => {
      if (user) {
        const tokenId=await user.getIdTokenResult();
        getCurrentUser(tokenId.token)
        .then((res)=>{
          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              email:res.data.email,
              token:tokenId.token,
              name:res.data.name,
              role:res.data.role,
              _id : res.data._id,
            }
          })
        })
        .catch((err)=>{
          console.log("cannot get the user",err);
        })
      } else {
        dispatch({
          type:"LOGOUT",
          payload:null
        })
      }

    });
    
  },[])
  return (
    <>
      <Header />
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={CompleteRegistration}/>
        <Route exact path="/forgot/password" component={ResetPassword}/>
        <UserRoute exact path="/user/history" component={History}/>
        <UserRoute exact path="/user/password" component={Password}/>
        <UserRoute exact path="/user/wishlist" component={Wishlist}/>
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
      </Switch>
    </>
  )
}

export default App;
