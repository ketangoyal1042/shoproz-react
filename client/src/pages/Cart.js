import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/GlobalAuthState'
import { useCart } from '../context/GlobalCartState'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

const Cart = () => {
    const { Auth } = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const totalCount = () => {
        try {
            let total = 0;
            cart?.map(item => total += item.price);
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.log(error);
        }
    }

    const removeCartItem = (productId) => {
        try {
            const cartItems = cart?.filter((p) => p._id !== productId);
            setCart(cartItems);
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            console.log(data);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token at initial time
    useEffect(() => {
        getToken();
    }, [Auth?.token])

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
            setLoading(false);
            setCart([]);
            localStorage.removeItem('cart');
            navigate('/dashboard/user/orders');
            toast.success("payment completed Successfully")
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center p-2 mb-2">
                            {`Hello ${Auth?.token && Auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 0 ? `You have ${cart?.length} items in your cart ${Auth?.token ? "" : "Please Login to Checkout"}` : `Your Card is Empty`}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {console.log(cart)}
                        {
                            cart?.map((product) => (
                                <div className="row card flex-row mb-2 p-3" id={product._id}>
                                    <div className="col-md-4 ">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                                            className="card-img-top"
                                            alt={product.name}
                                            width={150}
                                            height={200}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{product.name}</p>
                                        <p>{product.description.substring(0.30)}</p>
                                        <h4>₹ {product.price}</h4>
                                        <button className='btn btn-danger mt-4' onClick={() => removeCartItem(product._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Cart Summery</h4>
                        <p> Checkout | Payment </p>
                        <hr />
                        <h4>Total: {totalCount()}</h4>
                        {Auth?.user?.address ? (
                            <div className="mb-3">
                                <h4>Current Address</h4>
                                <h5>{Auth?.user?.address}</h5>
                                <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile', { state: "/cart" })}>Add Address</button>

                            </div>
                        ) : (
                            <div className="mb-3">
                                {Auth?.user?.token ? (
                                    <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>Add Address</button>
                                ) : (
                                    <button className="btn btn-outline-warning" onClick={() => navigate('/login', { state: "/cart" })}>Please Login to checkout</button>
                                )}
                            </div>
                        )}
                        <div className="mt-2">
                            {!clientToken || !cart?.length ? ("") :
                                (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={instance => (setInstance(instance))}
                                        />
                                        <button className="btn btn-primary mb-5"
                                            onClick={handlePayment}
                                            disabled={!Auth?.user?.address || loading || !instance}
                                        >{loading ? "processing..." : "Make Payment"}</button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart