import { createContext, useEffect } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";

export let OrderContext = createContext(0)

export default function OrderContextProvider(props) {

    let userToken = localStorage.getItem('userToken')
    if (userToken) {
        var decoded = jwt_decode(userToken);
        var id = decoded.id
    }


    let headers = {
        token: userToken
    }

    async function getUserOrders(id) {
        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            return res;
        } catch (err) {
            return err;
        }
    }


    async function checkout(cartId,shippingAddress) {
        
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://shimaa172.github.io/FreshCart\#/`,
                {
                    shippingAddress
                },
                {
                    headers
                });
            return res;
        } catch (err) {
            return err;
        }
    }
    return <OrderContext.Provider value={{ id, checkout, getUserOrders }}>
        {props.children}
    </OrderContext.Provider>

}
