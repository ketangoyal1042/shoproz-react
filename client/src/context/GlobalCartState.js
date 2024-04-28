import React, { useEffect } from 'react';
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const existingCart = localStorage.getItem("cart");
        if(existingCart) setCart(JSON.parse(existingCart));
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);
export { CartProvider, useCart };