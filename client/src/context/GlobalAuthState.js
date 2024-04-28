import React from 'react'
import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

const GlobalAuthState = ({children}) => {
    const [Auth, setAuth] = useState({
        user: null,
        token: ""
    });

    //setting default exios
    axios.defaults.headers.common['Authorization'] = Auth?.token;
  
    useEffect(() => {
      const data = localStorage.getItem('auth');
      if (data) {
        const ParsedData = JSON.parse(data);
        setAuth({
          // ...Auth,
          user: ParsedData.user,
          token: ParsedData.token,
      })
      }
    }, [])
    
  return (
    <AuthContext.Provider value={{Auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

const useAuth = ()=> useContext(AuthContext);

export {GlobalAuthState, useAuth};