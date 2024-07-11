import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/GlobalAuthState";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shippend",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const { Auth, setAuth } = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-orders`
      );
      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (value, orderId) => {
    try {
        await axios.put(`/api/v1/auth/order-status/${orderId}`, {status: value});
        // getOrders();
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    if (Auth?.token) getOrders();
  }, [Auth?.token]);
  return (
    <Layout title={"Order Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, index) => (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Select bordered={false} id="change-status" onChange={(value)=> handleChangeStatus(value, order._id)} defaultValue={order?.status}>
                            {status.map((state,index)=> (
                                <Option key={index} value={state}>
                                    {state}
                                </Option>
                            ))}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payment?.success ? "Success" : "False"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order?.products?.map((product) => (
                    <div
                      className="row card flex-row mb-2 p-3"
                      id={product._id}
                    >
                      <div className="col-md-4 ">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          width={30}
                          height={150}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{product.name}</p>
                        <p>{product.description.substring(0.3)}</p>
                        <h4>₹ {product.price}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
