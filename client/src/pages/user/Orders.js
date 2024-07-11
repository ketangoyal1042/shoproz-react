import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/GlobalAuthState";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { Auth, setAuth } = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/orders`
      );
      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Auth?.token) getOrders();
  }, [Auth?.token]);
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Your Orders</h1>
            <div className="border shadow">
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
                        <td>{order?.status}</td>
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
            {console.log(orders)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
