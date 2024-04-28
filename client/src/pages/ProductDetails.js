import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  // intial product details

  //get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products/${params.slug}`);
      setProduct(data?.product);
      getRelatedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  }

  // get related product details
  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug])
  return (
    <Layout title={"Product Detail"}>
      {/* {JSON.stringify(product,null, 4)} */}
      <div className="row container mt-2">
        <div className="col-md-6">
          <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={400} />
        </div>
        <div className="col-md-6 ">
          <h1 text-center >Product Details</h1>
          <hr />
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>price: {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">Add to Cart</button>
        </div>
      </div>
      <hr />
      <div className="container text-center">
        <h1>Similar Products</h1>
        {relatedProduct.length<1 && <p>No Similar product found</p>}
        <div className="d-flex flex-wrap">
          {relatedProduct?.map((product) => (
            <div className="card m-2" style={{ width: '18rem' }} key={product._id}>
              <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description.substring(0, 30)}</p>
                <b><h5 className="card-price">₹ {product.price}</h5></b>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails;