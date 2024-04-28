import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setname] = useState("");
    const [visible, setvisible] = useState(false);
    const [selected, setselected] = useState(null);
    const [updatedname, setupdatedname] = useState("");

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
            if (data?.success) {
                setname("");
                toast.success(`${data?.category.name} created successfully`);
                getAllCategory();

            }
            else{
                toast.error(`${data?.message}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input from");
        }
    };

    //handle edit/update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { category_name:updatedname });
            if (data?.success) {
                toast.success(`${updatedname} created successfully`);
                setvisible(false);
                setselected(null);
                setupdatedname(false);
                getAllCategory();

            }
            else{
                toast.error(`${data?.message}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in update category");
        }
    }


    //handle delete category
    const handleDelete = async (deleteID) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${deleteID}`);
            if (data?.success) {
                toast.success(`${data.message}`);
                getAllCategory();
            }
            else{
                toast.error(`${data?.message}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in update category");
        }
    }

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


    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3">
                            <CategoryForm handleSubmit={handleSubmit} setValue={setname} value={name}/>
                        </div>
                        <div className='w-80'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(cat => (
                                        <tr key={cat._id}>
                                            <td >{cat.name}</td>
                                            <td>
                                                <button className="btn btn-primary ms-2"
                                                onClick={()=>{
                                                    setvisible(true);
                                                    setupdatedname(cat.name);
                                                    setselected(cat);
                                                    }}>Edit</button>
                                                {/* using the ant desing Library to use modal */}
                                                <button className="btn btn-danger ms-2" onClick={()=>handleDelete(cat._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* https://ant.design/components/modal */}
                    <Modal title="Basic Modal" onCancel={()=>{setvisible(false)}} footer={null} open={visible}>
                          <CategoryForm value={updatedname} setValue={setupdatedname} handleSubmit={handleUpdate}/>              
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory