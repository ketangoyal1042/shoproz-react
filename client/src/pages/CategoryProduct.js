import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    //get product from category
    const getProductsbyCat = async ()=>{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
        setProducts(data?.products);
        setCategory(data?.category);
    }

    useEffect(()=>{
        if (params?.slug) getProductsbyCat();
    },[params?.slug]);
  return (
    <Layout>
        <div className="container mt-3">
            <h4 className='text-center'>Category - {category?.name}</h4>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className="row">
            <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <div className="card m-2" style={{ width: '18rem' }} key={product._id}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description.substring(0, 30)}</p>
                  <b><h5 className="card-price">₹ {product.price}</h5></b>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct