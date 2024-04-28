import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([]);
    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
            setProducts(data.products);
        } catch (error) {
            console.log("Failed to get all products | ", error);
            toast.error("something went wrong");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title={"Product Dashboard"}>
            <div className='container-fluid m-3 p-3 '>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((product) => (
                                <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`} className='product-link'>
                                    <div className="card m-2" style={{ width: '18rem' }} key={product._id}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products