import axios from "axios";

export const getCurrentUser=async(token)=>{
    return await axios.post(`${process.env.REACT_APP_API}/current-user`,{},{
        headers:{
        authtoken:token,
        }
    })
}

export const createOrUpdateUser=async(token)=>{
    return await axios.post(`${process.env.REACT_APP_API}/delete-and-update-user`,{},{
      headers:{
        authtoken:token
      }
    })
  }

  export const getCurrentAdmin=async(token)=>{
    return await axios.post(`${process.env.REACT_APP_API}/current-admin`,{},{
        headers:{
        authtoken:token,
        }
    })
}
