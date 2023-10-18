import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export let WhishlistContext = createContext(0)

export default function WhishlistContextProvider(props) {

    const [count, setCount] = useState(null)
    let userToken = localStorage.getItem('userToken')
    let headers = {
        token: userToken
    }

    async function AddToWhishlist(productId) {
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId
            }, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function getWhishlist() {
        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function getWhishlistInfo() {
        const data = await getWhishlist();
    }

    useEffect(() => {
        getWhishlistInfo()
    }, [])


    async function removeWhishlistItem(id) {
        try {
            const res = axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }



    return <WhishlistContext.Provider value={{ setCount, count, AddToWhishlist, getWhishlist, removeWhishlistItem }}>
        {props.children}
    </WhishlistContext.Provider>

}