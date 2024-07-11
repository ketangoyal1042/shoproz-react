import { useState, useEffect } from "react";
import { useAuth } from "../../context/GlobalAuthState";
import { Outlet } from "react-router-dom"; // it is use for nested routing **
import axios from 'axios';
import Spinner from "../Spinner";

// this page we are creating for secure private route, so it will goes to node and check user authentication and then after varify or get ok response so their private page
export default function AdminRoute () {
    const [Ok, setOk] = useState(false);
    const {Auth, setAuth} = useAuth();
    useEffect(() => {
        const authCheck = async ()=>{
            const res = await axios.get(`/api/v1/auth/admin-auth`);
            // {
            //     // headers:{
            //     //     "Authorization": Auth?.token
            //     // }
            //     // we can also define the headers globally in context so did that
            // });
            if (res.data.ok) {
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if (Auth?.token){
            authCheck();
        }
    },[Auth?.token]);
    // eslint-disable-next-line
    return Ok ? <Outlet/> : <Spinner path="/"/>;
}

