import axios from "axios";

export const subList=async()=>{
    return await axios.get(`${process.env.REACT_APP_API}/subs/`)
}

export const createSub=async(token,name,_id)=>{
    return await axios.post(`${process.env.REACT_APP_API}/sub`,
    {
        name,
        _id
    },{
        headers:{
        authtoken:token,
        }
    })
}

export const updateSub=async(token,name,slug,_id)=>{
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,
    {
        name,
        _id
    },{
        headers:{
        authtoken:token,
        }
    })
}

export const deleteSub=async(token,slug)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
        headers:{
        authtoken:token,
        }
    })
}

export const readSub=async(token,slug)=>{
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`,{
        headers:{
        authtoken:token,
        }
    })
}