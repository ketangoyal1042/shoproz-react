import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../../src/styles/AuthStyles.css';
import { useAuth } from '../../context/GlobalAuthState'

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { Auth, setAuth } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    // ...Auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('SomeThink Went wrong');
        }
    }

    return (
        <Layout title="Login - Ecommerce App">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Login Page</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                    <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login