import React,{useState,useEffect} from "react"
import { Input } from 'antd';
import Select from 'react-select';
import AdminNav from "../../../components/nav/Adminnav";
import {subList,updateSub } from "../../../functions/sub";
import { categoriesList } from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button } from 'antd';
import { useParams } from "react-router-dom";

const loadSubs=(params,setsub)=>{
      subList()
          .then(res=>{
              console.log(res.data);
            setsub(res.data.filter(cat=>cat.slug===params.slug)[0]);
          })
          .catch(err=>{
              console.log(`subs list err ${err}`);
          })
          
  }
const SubForm=({setLoading,categories,history,params})=>{
    const categoryData=categories.map(category=>{
        return {
            label:category.name,
            value:category._id,
        }
    });
    const slug=params.slug;
    const [name,setName]=useState("");
    const [cat,setCat]=useState("");
    const user=useSelector(state=>state.user);
    const onFinish = (values) => {
        setLoading(true);
        updateSub(user.token,name,slug,cat)
        .then(res=>{
            setLoading(false);
            setName("");
            setCat("");
            toast.success(`${res.data.name} sub-category updated`);
            history.push('/admin/sub');
        })
        .catch(err=>{
            setLoading(false);
            setName("");
            setCat("");
            toast.error(`sub-category updation failed due to ${err.response.data}`);
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter sub-category name!' }]}
      >
        <Input onChange={(e)=>setName(e.target.value)} value={name}/>
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category name!' }]}>
      <Select
          className="basic-single"
          classNamePrefix="select"
          isLoading={true}
          isClearable={true}
          isSearchable={true}
          required
          options={categoryData}
          onChange={(e)=>setCat(e.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    )
}
const  UpdateSub= ({history})=> {
    const [loading,setLoading]=useState(false);
    const [sub,setSub]=useState([]);
    const [categories,setCatgories]=useState([]);
    const params=useParams();
    useEffect(()=>{
      loadSubs(params,setSub);
      categoriesList()
      .then(res=>{
          setCatgories(res.data);
      })
      .catch(err=>{
          console.log(`category-list query err ${err}`)
      })
        return ()=>{
            setLoading();
            setCatgories([]);
            setSub();
        };
    },[])
    return (
    <div className="container-fluid">
      <div className="row">
      <AdminNav />
        <div className="col text-center">
        <h2 style={{color:"#1890ff"}}>{sub && sub.name}</h2>
        <p>category: {sub && sub.parent && sub.parent.name}</p>
            {loading?<h5 className="text-danger">Loading...</h5>:<h5 style={{color:"#1890ff"}}>Update Sub-Category</h5>}
            <SubForm setLoading={setLoading} history={history}  categories={categories} params={params}/>
        </div>
        
      </div>
    </div>
  )};

export default UpdateSub;
