import React,{useEffect,useState} from "react";
import {Route} from "react-router-dom";
import {useSelector} from "react-redux"
import LoadingToRedirect from "./LoadingToRedirect"
import { getCurrentAdmin } from "../functions/auth";

export default function UserRoute({ children, ...rest }) {
    const user=useSelector(state=>state.user)
    const [ok,setOk]=useState(false);
    useEffect(()=>{
        if(user && user.token)
        {
            getCurrentAdmin(user.token)
            .then((res)=>{
                console.log("Admin response",res)
                setOk(true);
            })
            .catch((err)=>{
                console.log("Admin Resonse error",err);
                setOk(false);
            })
        }
        else setOk(false);
        return () => {
            setOk(); 
          };
    },[user])
    return (ok?
    <Route {...rest} />
    :<LoadingToRedirect />
    );
  }