import React,{useState,useEffect} from "react"
import { Input } from 'antd';
import Select from 'react-select';
import AdminNav from "../../../components/nav/Adminnav";
import { createSub,subList,deleteSub } from "../../../functions/sub";
import { categoriesList } from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button } from 'antd';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { DeleteOutlined,EditOutlined   } from "@ant-design/icons";

const loadSubs=(setSubs,setSearchSubs)=>{
      subList()
          .then(res=>{
              setSubs(res.data)
              setSearchSubs(res.data);
          })
          .catch(err=>{
              console.log(`subs list err ${err}`);
          })
          
  }
const SubForm=({setLoading,setSubs,setSearchSubs,categories})=>{
    const categoryData=categories.map(category=>{
        return {
            label:category.name,
            value:category._id,
        }
    });
    const [name,setName]=useState("");
    const [cat,setCat]=useState({});
    const user=useSelector(state=>state.user);
    const onFinish = (values) => {
        // console.log('Success:', values);
        setLoading(true);
        console.log(cat);
        createSub(user.token,name,cat)
        .then(res=>{
            setLoading(false);
            setName("");
            setCat({});
            toast.success(`${res.data.name} sub-category created`);
            loadSubs(setSubs,setSearchSubs);
            
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
const  CreateSub= ()=> {
    const [loading,setLoading]=useState(false);
    const [subs,setSubs]=useState([]);
    const [categories,setCatgories]=useState([]);
    const user=useSelector(state=>state.user);
    const [searchSubs,setSearchSubs]=useState([]);
    const dltSub=(slug)=>{
        deleteSub(user.token,slug)
        .then(res=>{
          loadSubs(setSubs,setSearchSubs);
            toast.success(`${res.data.name} deleted successfully`);
        })
        .catch(err=>{
            console.log("category deletion error",err);
        })
    }

    const onSearch = value =>{
      value=value.toLowerCase();
      setSearchSubs(subs.filter(val=>val.name.toLowerCase().includes(value)));
    }

    useEffect(()=>{
      loadSubs(setSubs,setSearchSubs);
      categoriesList()
      .then(res=>{
          setCatgories(res.data);
      })
      .catch(err=>{
          console.log(`category-list query err ${err}`)
      })
        return ()=>{
            setSubs([])
            setLoading();
            setCatgories([]);
            setSearchSubs([]);
        };
    },[])
    return (
    <div className="container-fluid">
      <div className="row">
      <AdminNav />
        <div className="col text-center">
            {loading?<h4 className="text-danger">Loading...</h4>:<h4 style={{color:"#1890ff"}}>Create Sub-Category</h4>}
            <SubForm setLoading={setLoading} setSubs={setSubs} setSearchSubs={setSearchSubs} categories={categories}/>
            <br />
            <h4 style={{color:"#1890ff"}}>Sub-Categories</h4>
            <label className="me-3">Search:</label>
            <Input.Search style={{ width: 300 }} enterButton onSearch={onSearch} placeholder="Search sub-categories" onChange={(e)=>onSearch(e.target.value)} />
            <br />
            <br />
            {searchSubs.map((val,idx)=>
            <Card 
            key={idx} 
            actions={[
                <DeleteOutlined onClick={()=>dltSub(val.slug)} style={{cursor:"pointer"}} className="me-3 text-danger"/>,
                <Link to={`/admin/sub/${val.slug}`}><EditOutlined  style={{cursor:"pointer"}} className="text-danger"/></Link>
            ]}
            >
                <Card.Meta title={val.name}
      description={`categoty: ${val.parent.name}`}
    />
                </Card>)}
        </div>
        
      </div>
    </div>
  )};

export default CreateSub;
