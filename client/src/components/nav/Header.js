import React, {useState} from "react"
import { Menu } from 'antd';
import {Link} from "react-router-dom"
import {  signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AppstoreOutlined, SettingOutlined,ShoppingCartOutlined,ShoppingOutlined,UserOutlined,UserAddOutlined,LogoutOutlined} from '@ant-design/icons';
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;
const Header=()=> {
    const [current,setCurrent]=useState('home');
    let user=useSelector((state)=>state.user);
    let isLoggedIn=useSelector(state=>(state.user)?true:false);
    let history = useHistory();
    const handleClick=(e)=>{
        setCurrent(e.key);
    }
    const dispatch=useDispatch();
    const logout=()=>{
      signOut(auth).then(() => {
        console.log("logged-out");
        dispatch({
          type:"LOGOUT",
          payload:null
        })
        history.push("/login");
      }).catch((error) => {
        console.log("failed logout");
        toast.error(error.message);
      });      
    }
    const getUsername=(user)=>{
      if(user)return user.name.toLowerCase();
      else return "";
    }
    let userName=getUsername(user);
    return (
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" style={{display:"block"}}>
          <Menu.Item key="home" icon={<AppstoreOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          {!isLoggedIn && (
            <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
            </Menu.Item>
          )}

          {!isLoggedIn && (
            <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right" > 
            <Link to="/register">Register</Link>
            </Menu.Item>
          )}

          <Menu.Item key="shop" icon={<ShoppingOutlined />}>
            Shop
          </Menu.Item> 

          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            Cart
          </Menu.Item>
          {isLoggedIn && (
            <SubMenu key="username" icon={<UserOutlined />} className="float-right" title={userName}>
          {
            user && user.role==="subscriber" && 
             (<Menu.Item key="dashboard">
              <Link to="/user/history">Dashboard</Link>
              </Menu.Item>)
          }
          {
            user && user.role==="admin" && 
             (<Menu.Item key="dashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>)
          }
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Log Out</Menu.Item>
            </SubMenu>
          )}
        </Menu>
      );
  
}
export default Header;