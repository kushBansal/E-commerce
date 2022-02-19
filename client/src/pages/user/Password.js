import React,{useState} from "react"
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import AdminNav from "../../components/nav/Adminnav";
const  Password= ()=> {
  const {user}=useSelector(state=>state);
    const [loading,setLoading]=useState(false);
    const ResetPasswordForm=()=>{
        const [password,setPassword]=useState();
        
        const onFinish = (values) => {
            setLoading(true);
            const user = auth.currentUser;
            updatePassword(user, password).then(() => {
                setLoading(false);
                toast.success("Password Successfully updated")
            }).catch((error) => {
                setLoading(false);
                toast.error(`updation failed: ${error.message}`)
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
                label="Reset Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Reset password!',
                  },
                ]}
              >
                <Input.Password  autoFocus prefix={<UserOutlined />} onChange={(e)=>{setPassword(e.target.value);}} value={password} disabled={loading}/>
              </Form.Item>
        
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Reset
                </Button>
              </Form.Item>
            </Form>
          );
        
    }
    return(
    <div className="container-fluid">
      <div className="row">
      {user.role==="subscriber" && <UserNav/>}
      {user.role==="admin" && <AdminNav/>}
          <div className="col">
          <div className="col-md-6 offset-md-3">
                {!loading ? <h4 className="offset-md-6">Update Password</h4> : <h4 className="offset-md-6 text-danger">Loading...</h4>}
                <ResetPasswordForm />
            </div>
          </div>
      </div>
    </div>
  );}

export default Password;
