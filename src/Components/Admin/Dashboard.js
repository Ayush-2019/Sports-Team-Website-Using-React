import React from "react";
import AdminLayout from "../../Hoc/Adminlayout";

const Dashboard = (props) => {

  return (
    <AdminLayout title = "DASHBOARD">
      <div className="user_dashboard">
        WELCOME TO THE DASHBOARD
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
