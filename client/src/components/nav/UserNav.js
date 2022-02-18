import React from "react"
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { HeartOutlined , UserOutlined, SettingOutlined } from '@ant-design/icons';

const UserNav=()=>{
  const location=useLocation();
  const selected=location.pathname.split("/").slice(-1)[0]
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[selected]}
      defaultOpenKeys={[selected]}
      mode="inline"
      // theme="dark"
    >
      <Menu.Item key="history">
        <Link to="/user/history">History</Link>
      </Menu.Item>
      <Menu.Item key="password">
        <Link to="/user/password">Password</Link>
      </Menu.Item>
      <Menu.Item key="wishlist">
        <Link to="/user/wishlist">Wishlist</Link>
      </Menu.Item>
    </Menu>
  );
}
export default UserNav;