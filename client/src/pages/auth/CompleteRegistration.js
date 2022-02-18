import React, { useState,useEffect } from "react"
import { Form, Input, Button,Checkbox  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {  toast } from 'react-toastify';
import {  isSignInWithEmailLink, signInWithEmailLink, updatePassword } from "firebase/auth";
import {auth} from '../../firebase'
import axios from "axios";
import { useDispatch } from "react-redux";
const createOrUpdateUser=async(token)=>{
  return await axios.post(`${process.env.REACT_APP_API}/delete-and-update-user`,{},{
    headers:{
      authtoken:token
    }
  })
}
const CompleteRegistration= ({history})=> {
    const CompleteRegisterForm=()=>{
      const dispatch=useDispatch();
      // const {user}=useSelector((state)=>({...state}));
        let mail=window.localStorage.getItem('emailForSignIn');
        let isValidLink=isSignInWithEmailLink(auth, window.location.href);
        if (  !isValidLink) {
            toast.error("Invalid link");
            setTimeout(()=>window.location.href = "/register",3000);
        }
        const [email,setEmail]=useState(mail);
        const [pass,setPass]=useState('');
        useEffect(()=>{
            if(!email && isValidLink)
            {
                setEmail(window.prompt('Please provide your email for confirmation'));
            }
        },[email])
        const onFinish = (values) => {
            signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                window.localStorage.removeItem('emailForSignIn');
                const user = auth.currentUser;
                if(result.user.emailVerified)
                {
                    updatePassword(user, pass)
                    .then(async() => {
                        toast.success("Registration Completed");
                        console.log("password login successfull");
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
                     })
                    .catch((error) => {
                        console.log("error",error.message);
                        history.push('/register');
                    });
                    }
                    else{
                        history.push('/register');
                    }
            })
            .catch((error) => {
                console.log("error",error.message);
                toast.error(error.message);
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
                <Input prefix={<UserOutlined />} defaultValue={email} value={email} readOnly/>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password autoFocus onChange={(e)=>{setPass(e.target.value);}} value={pass}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
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
                <h4 className="offset-md-6">Complete Registration</h4>
                <CompleteRegisterForm />
            </div>
        </div>
    </div>
    );
}

export default CompleteRegistration;
