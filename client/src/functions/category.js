import axios from "axios";

export const categoriesList=async()=>{
    return await axios.get(`${process.env.REACT_APP_API}/categories/`)
}

export const createCategories=async(token,name)=>{
    return await axios.post(`${process.env.REACT_APP_API}/category`,
    {
        name,
    },{
        headers:{
        authtoken:token,
        }
    })
}

export const updateCategories=async(token,name,slug)=>{
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,
    {
        name,
    },{
        headers:{
        authtoken:token,
        }
    })
}

export const deleteCategories=async(token,slug)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers:{
        authtoken:token,
        }
    })
}

export const readCategories=async(token,slug)=>{
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers:{
        authtoken:token,
        }
    })
}