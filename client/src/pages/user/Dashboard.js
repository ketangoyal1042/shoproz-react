import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/GlobalAuthState'
import UserMenu from '../../components/layout/UserMenu';

const Dashboard = () => {
  const {Auth} = useAuth();

  return (
    <Layout title="Ecommerce: Dashboard Page">
      <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                        <h3>User Name : {Auth?.user?.name}</h3>
                        <h3>User Email : {Auth?.user?.email}</h3>
                        <h3>User Contact : {Auth?.user?.phone}</h3>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard