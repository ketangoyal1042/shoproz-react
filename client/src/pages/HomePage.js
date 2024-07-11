import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
// import { useAuth } from '../context/GlobalAuthState'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/GlobalCartState";
import "../styles/HomePage.css";

const HomePage = () => {
  // const { Auth } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // created both above states are used for pagination

  //get all categories
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  //get all products
  const getAllProducts = async () => {
    try {
      // const { data } = await axios.get(`/api/v1/product/get-products`);
      // removing this above api call, because now we are using productList as per page api call, which helps to create pagination
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
    } catch (error) {
      console.log("error is: ", error);
      toast.error("Please Refresh | Issue to fetch all products");
    }
  };

  // get Total count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //filter by category
  const handleFilter = (eleChecked, id) => {
    let all = [...checked];
    if (eleChecked) {
      all.push(id);
    } else {
      all = all.filter((e) => e != id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategory();
    if (!checked.length && !radio.length) getAllProducts();
    getTotalCount();
  }, []);

  // get filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
    else getAllProducts();
  }, [checked, radio]); // tjis execute when checked and radio state changes

  return (
    <Layout title={"All Products - Best offer"}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      {/* <h1>HomePage</h1>
    <pre>{JSON.stringify(Auth, null, 4)}</pre> */}
      <div className="container-fluid row home-page">
        <div className="col-md-3 mt-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column p-4 align-items-center">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price Filter */}
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column p-4 align-items-center">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  {/* Creating Radio button with specified array value of Price object */}
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column p-4 align-items-center">
            <button
              className="btn btn-danger mt-3"
              onClick={() => {
                window.location.reload();
              }}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}
                  </p>
                  <b>
                    <h5 className="card-price">₹ {product.price}</h5>
                  </b>
                  <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Product Added to Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
