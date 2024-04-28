import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    //create product
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity",quantity)
            productData.append("photo",photo)
            productData.append("category",category)
            
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            console.log(data);
            if (data?.success) {
                toast.success(`${name} created successfully`);
                navigate('/dashboard/admin/products');
            }
            else{
            toast.error(data?.message);

            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong While creating product");
        }
    }


    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>CreateProduct</h1>
                        <form onSubmit={handleCreate}>
                            <div className="m-1 w-75">
                                <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                    {categories.map((c) => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}
                                </Select>
                                <div className="mb-3 text-center">
                                    <label className='btn btn-outline-secondary'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                {/* preview image */}
                                <div className="mb-3">
                                    {photo && (<div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt={photo.name} height={"200px"} className='img img-responsive' />
                                    </div>)}
                                </div>
                                <div className="mb-3">
                                    <input type="text"
                                        className='form-control'
                                        value={name}
                                        placeholder='Write Product Name'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea maxLength="50"
                                        className='form-control'
                                        value={description}
                                        column={20}
                                        placeholder='Write Product Description'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="number"
                                        className='form-control'
                                        value={price}
                                        placeholder='Write Product Price'
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="number"
                                        className='form-control'
                                        value={quantity}
                                        placeholder='Write Product Quantity'
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                               
                                <div className="mb-3">
                                    <Select bordered={false} placeholder="Select Shipping Want?" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }}>
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button type='submit' className="btn btn-primary">CREATE PRODUCT</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct