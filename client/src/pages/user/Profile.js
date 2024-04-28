import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/GlobalAuthState';

const Profile = () => {

    const { Auth, setAuth } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = Auth?.user;
        setName(name);
        setPhone(phone);
        setAddress(address);
        setEmail(email);

        console.log(Auth.user);
    }, [Auth?.user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, { name, email, address, phone, password });
            console.log(data);
            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...Auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.getItem('auth', JSON.stringify(ls));
                toast.success(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('SomeThink Went wrong');
        }
    }

    return (
        <Layout title={"Dashboard - Your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 form-container">
                        <form onSubmit={handleUpdate}>
                            <h1 className='title'>User Profile</h1>
                            <div className="mb-3">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputname" placeholder='Enter Your Name' />
                            </div>
                            <div className="mb-3">  
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" disabled />
                            </div>
                            <div className="mb-3">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputphone" placeholder="Enter Your Phone" />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputaddress" placeholder="Enter Your Address" />
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile