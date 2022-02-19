import React from "react"
import AdminNav from "../../components/nav/Adminnav";

const  AdminDashboard= ()=> (
    <div className="container-fluid">
      <div className="row">
        <AdminNav />
        <div className="col">Admin dashboard</div>
      </div>
    </div>
  );

export default AdminDashboard;
