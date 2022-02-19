import React from "react"
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminNav=()=>{
  const location=useLocation();
  const selected=location.pathname.split("/").slice(-1)[0]
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[selected]}
      defaultOpenKeys={[selected]}
      mode="inline"
    >
      <Menu.Item key="dashboard">
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      
      <Menu.Item key="product">
        <Link to="/admin/product">Product</Link>
      </Menu.Item>

      <Menu.Item key="products">
        <Link to="/admin/products">Products</Link>
      </Menu.Item>

      <Menu.Item key="category">
        <Link to="/admin/category">Category</Link>
      </Menu.Item>

      <Menu.Item key="coupon">
        <Link to="/admin/coupon">Coupons</Link>
      </Menu.Item>

      <Menu.Item key="sub">
        <Link to="/admin/sub">Sub Category</Link>
      </Menu.Item>

      <Menu.Item key="password">
        <Link to="/user/password">Password</Link>
      </Menu.Item>

    </Menu>
  );
}
export default AdminNav;