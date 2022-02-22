import React,{useState,useEffect} from "react"
import { Input } from 'antd';
import AdminNav from "../../../components/nav/Adminnav";
import { createCategories,categoriesList,deleteCategories } from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button } from 'antd';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { DeleteOutlined,EditOutlined   } from "@ant-design/icons";

const loadCategories=(setCategories,setSearchCategories)=>{
      categoriesList()
          .then(res=>{
              setCategories(res.data)
              setSearchCategories(res.data);
          })
          .catch(err=>{
              console.log(`categories list ${err}`);
          })
          
  }
const CategoryForm=({setLoading,setCategories,setSearchCategories})=>{
    const [name,setName]=useState("");
    const user=useSelector(state=>state.user);
    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        createCategories(user.token,name)
        .then(res=>{
            setLoading(false);
            setName("");
            toast.success(`${res.data.name} category created`);
            loadCategories(setCategories,setSearchCategories);
            
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
          Save
        </Button>
      </Form.Item>
    </Form>
    )
}
const  CreateCategory= ()=> {
    const [loading,setLoading]=useState(false);
    const [categories,setCategories]=useState([]);
    const user=useSelector(state=>state.user);
    const [searchCategories,setSearchCategories]=useState([]);
    const deleteCategory=(slug)=>{
        deleteCategories(user.token,slug)
        .then(res=>{
          loadCategories(setCategories,setSearchCategories);
            toast.success(`${res.data.name} deleted successfully`);
        })
        .catch(err=>{
            console.log("category deletion error",err);
        })
    }

    const onSearch = value =>{
      value=value.toLowerCase();
      setSearchCategories(categories.filter(val=>val.name.toLowerCase().includes(value)));
    }

    useEffect(()=>{
      loadCategories(setCategories,setSearchCategories);
        return ()=>{
            setCategories([])
            setLoading();
        };
    },[])
    return (
    <div className="container-fluid">
      <div className="row">
      <AdminNav />
        <div className="col text-center">
            {loading?<h3 className="text-danger">Loading...</h3>:<h3>Create Category</h3>}
            <CategoryForm setLoading={setLoading} setCategories={setCategories} setSearchCategories={setSearchCategories}/>
            <label className="me-3">Search:</label>
            <Input.Search style={{ width: 300 }} enterButton onSearch={onSearch} placeholder="Search categories" onChange={(e)=>onSearch(e.target.value)} />
            {searchCategories.map((val,idx)=>
            <Card 
            key={idx} 
            title={val.name} 
            extra={<p >
                <DeleteOutlined onClick={()=>deleteCategory(val.slug)} style={{cursor:"pointer"}} className="me-3 text-danger"/>
                <Link to={`/admin/category/${val.slug}`}><EditOutlined  style={{cursor:"pointer"}} className="text-danger"/></Link>
                </p>}
            bodyStyle={{width:"0px",padding:"0px"}} />)}
        </div>
        
      </div>
    </div>
  )};

export default CreateCategory;
