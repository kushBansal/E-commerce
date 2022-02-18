import React, { useState,useEffect } from "react"
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {  toast } from 'react-toastify';
import {  sendSignInLinkToEmail } from "firebase/auth";
import {auth} from '../../firebase'
import { useSelector } from "react-redux";
const Register= ({history})=> {
  const {user}=useSelector((state)=>({...state}));
  
  useEffect(()=>{
    if(user && user.token)history.push("/");
  },[user])
    const RegisterForm=()=>{
        const [email,setEmail]=useState('');
        const onFinish = (values) => {
            console.log('Success:', values);
            const actionCodeSettings = {
                url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
                handleCodeInApp: true
              };
                sendSignInLinkToEmail(auth, email, actionCodeSettings)
                .then(() => {
                    window.localStorage.setItem('emailForSignIn', email);
                    toast.success("Email link is sent to entered mail ID",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`message: ${errorMessage}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        
                });
                setEmail("");
                console.log(email);
          };
        
          const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
            setEmail("");
            console.log(email);
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
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email!',
                  },
                ]}
              >
                <Input  autoFocus prefix={<UserOutlined />} onChange={(e)=>{setEmail(e.target.value);}} value={email} />
              </Form.Item>
        
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          );
        
    }
    return (
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4 className="offset-md-6">Register</h4>
                <RegisterForm />
            </div>
        </div>
    </div>
    );
}

export default Register;
