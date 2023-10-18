import { createContext, useEffect } from "react";
import axios from 'axios'
import { useState } from "react";


export let CartContext = createContext(0)

export default function CartContextProvider(props) {
    const [numOfCartItems, setnumOfCartItems] = useState(null)
    let userToken = localStorage.getItem('userToken')
    let headers = {
        token: userToken
    }

    async function AddToCart(productId) {
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            }, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function getCart() {
        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function getCartInfo() {
        const data = await getCart();
    }

    useEffect(() => {
        getCartInfo()
    }, [])


    async function removeCartItem(id) {
        try {
            const res = axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function clearCartItem() {
        try {
            const res = axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function updateCartItem(id, count) {
        try {
            const res = axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count
            }, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function GetSubCategories(id){
        try {
            const res = axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
            return res;
        } catch (err) {
            return err;
        }
    }

    return <CartContext.Provider value={{ setnumOfCartItems, numOfCartItems, AddToCart, getCart, removeCartItem, updateCartItem, clearCartItem , GetSubCategories}}>
        {props.children}
    </CartContext.Provider>

}