import { createContext, useState } from "react";
import axios from 'axios'


export let UserTokenContext = createContext()

export default function UserTokenContextProvider(props) {

    let UserToken = localStorage.getItem('userToken')
    let headers = {
        token: UserToken
    }

    async function UpdatePassword(values) {
        try {
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function addAddress(values) {
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, values, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }



    async function removeaddAddress(id) {
        try {
            const res = axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function getAddress() {
        try {
            const res = axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
                headers
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    const [userToken, setUserToken] = useState(null)
    return <UserTokenContext.Provider value={{ userToken, setUserToken, UpdatePassword, addAddress, removeaddAddress, getAddress }}>
        {props.children}
    </UserTokenContext.Provider>

}