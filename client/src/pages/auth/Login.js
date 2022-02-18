import React, { useState,useEffect } from "react"
import { Form, Input, Button,Checkbox  } from 'antd';
import { UserOutlined,MailOutlined ,GoogleOutlined} from '@ant-design/icons';
import {  toast } from 'react-toastify';
import {  signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import {auth} from '../../firebase'
import { useDispatch,useSelector } from "react-redux";
import {Link} from "react-router-dom"
import {createOrUpdateUser} from "../../functions/auth"
const Login= ({history})=> {
  const {user}=useSelector((state)=>({...state}));
  
  useEffect(()=>{
    if(user && user.token)history.push("/");
  },[user,history])
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);
  const googleAuth=()=>{
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async(result) => {
      setLoading(false);
      const {user}=result;
      const tokenId=await user.getIdTokenResult();
      createOrUpdateUser(tokenId.token)
      .then((res)=>{
        console.log("create or update user",res)
        dispatch({
          type:"LOGGED_IN_USER",
          payload:{
            email:user.email,
            token:tokenId.token,
            name : res.data.name,
            role : res.data.role,
            _id : res.data._id,
          }
        })
      })
      .catch(()=>console.log("token failed !!!"))
      history.push("/");
      // ...
    }).catch((error) => {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    });
  }
    const LoginForm=()=>{
        const [email,setEmail]=useState("");
        const [pass,setPass]=useState('');
        const onFinish = (values) => {
          setLoading(true);
          signInWithEmailAndPassword(auth, email, pass)
          .then(async (userCredential) => {
            setLoading(false);
            toast.success("Login Successfull");
            const user = userCredential.user;
            const tokenId=await user.getIdTokenResult();
            createOrUpdateUser(tokenId.token)
            .then((res)=>{
              console.log("create or update user",res)
              dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                  email:user.email,
                  token:tokenId.token,
                  name : res.data.name,
                  role : res.data.role,
                  _id : res.data._id,
                }
              })
            })
            .catch(()=>console.log("token failed !!!"))
            history.push("/");
          })
          .catch((error) => {
            console.log(error.message);
            toast(error.message);
            setLoading(false);
          });
          };
          const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };
        return (
            <Form
            flex={2}
              name="basic"
              labelCol={{
                span: 8,
                flex: "300px"
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                "email": "",
                "password": "",
              }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: false,
                    message: 'Please enter your email!',
                  },
                ]}
              >
                <Input name="email"prefix={<UserOutlined />} onChange={(e)=>{setEmail(e.target.value);}} defaultValue=""  value={email} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password name="password" onChange={(e)=>{setPass(e.target.value);}} defaultValue="" value={pass}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
                <Link to="/forgot/password" className="float-right text-danger">Forgot Password?</Link>
            </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button block shape="round" type="primary" icon={<MailOutlined />} disabled={!email || !pass.length } size="large" htmlType="submit">
                  Login with Email/Password
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button block shape="round" type="danger" icon={<GoogleOutlined />} size="large" htmlType="button" onClick={googleAuth}>
                  Login with Google
                </Button>
              </Form.Item>
            </Form>
          );
        
    }
    return (
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                {!loading ? <h4 className="offset-md-6">Login</h4> : <h4 className="offset-md-6 text-danger">Loading...</h4>}
                <LoginForm />
            </div>
        </div>
    </div>
    );
}

export default Login;
