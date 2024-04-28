import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
        <div className="container">
            <div className="row">
                {categories.map(c => (
                <div className="col-md-6 mt-4 mb-4 g-3" key={c._id}>
                   <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories