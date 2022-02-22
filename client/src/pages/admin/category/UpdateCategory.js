import React,{useState,useEffect} from "react"
import { Input } from 'antd';
import AdminNav from "../../../components/nav/Adminnav";
import { categoriesList,updateCategories } from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button } from 'antd';
import { useParams } from "react-router-dom";

const loadCategories=(params,setHeading)=>{
    categoriesList()
        .then(res=>{
            setHeading(res.data.filter(cat=>cat.slug===params.slug)[0].name);
        })
        .catch(err=>{
            console.log(`categories list ${err}`);
        })
}
const CategoryForm=({setLoading,params,history,setHeading})=>{
    const [name,setName]=useState("");
    const user=useSelector(state=>state.user);
    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        updateCategories(user.token,name,params.slug)
        .then(res=>{
            setLoading(false);
            setName("");
            toast.success(`${res.data.name} category updated`);
            loadCategories(params,setHeading)
            history.push(`/admin/category/`)
        })
        .catch(err=>{
            setLoading(false);
            setName("");
            toast.error(`category creation failed due to ${err.response.data}`);
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
        rules={[{ required: true, message: 'Please enter category name!' }]}
      >
        <Input onChange={(e)=>setName(e.target.value)} value={name}/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
    )
}
const  UpdateCategory= ({history})=> {
    const [loading,setLoading]=useState(false);
    const [heading,setHeading]=useState("");

    const params=useParams();
    useEffect(()=>{
        loadCategories(params,setHeading);
            return ()=>{
                setLoading();
                setHeading();
            };
    },[])
    return (
    <div className="container-fluid">
      <div className="row">
      <AdminNav />
        <div className="col text-center">
            {loading?<h3 className="text-danger">Loading...</h3>:
            <h2 style={{color:"deepskyblue"}}>{heading}</h2>
            }
            <h5>Update Category</h5>
            <CategoryForm setLoading={setLoading} params={params} history={history} setHeading={setHeading}/>
        </div>
        
      </div>
    </div>
  )};

export default UpdateCategory;
