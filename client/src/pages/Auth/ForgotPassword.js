import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../../src/styles/AuthStyles.css';
import axios from 'axios';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, { email, newpassword, answer })
            console.log(``)
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Somethink Went wrong');
        }
    }
    return (
        <Layout title="Forgot Password - Ecommerce App">
            <div className="form-container">
                <form onSubmit={handlesubmit}>
                    <h1 className='title'>Reset Pssword</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAnswer1" className="form-label">What is your Favorite Sports</label>
                        <input type="text" className="form-control" id="exampleInputAnswer1" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={newpassword} className="form-control" id="exampleInputPassword1" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">RESET</button>
                    <div className="mt-3">
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword