import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";


export default function LoadingToRedirect({ children, ...rest }) {
    const [count,setCount]=useState(5);
    const history=useHistory();
    const interval=setInterval(()=>{
        setCount((count)=>count-1);
    },1000)

    useEffect(()=>{
        if(count===0)history.push('/');
        
        return ()=>clearInterval(interval);
    },[count])

    return (
        <div className="container p-5 text-center">
            Redirecting you in {count} seconds
        </div>
    )
  }