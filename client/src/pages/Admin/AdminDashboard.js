import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/GlobalAuthState'
const AdminDashboard = () => {
    const {Auth} = useAuth();
  return (
    <Layout title="Ecommerce: Admin Dashboard">
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                        <h3>Admin Name : {Auth?.user?.name}</h3>
                        <h3>Admin Email : {Auth?.user?.email}</h3>
                        <h3>Admin Contact : {Auth?.user?.phone}</h3>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard