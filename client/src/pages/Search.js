import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/GlobalSearchState'
const Search = () => {
    const [ values, setValues ] = useSearch();
    return (
        <Layout title={"Search Results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No Results Found" : `Found : ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mt-2">
                        {values?.results.map((product) => (
                            <div className="card m-2" style={{ width: '18rem' }} key={product._id}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description.substring(0, 30)}</p>
                                    <b><h5 className="card-price">₹ {product.price}</h5></b>
                                    <button className="btn btn-primary ms-1">More Details</button>
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

export default Search