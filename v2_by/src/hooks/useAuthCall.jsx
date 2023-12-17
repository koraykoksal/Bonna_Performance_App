
import React from 'react'
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import {
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,
    fetchLoginManagerPersonels,

} from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const login = async ({ username, password }) => {

        dispatch(fetchStart())

        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_ERP_LOGIN_BASE_URL}`,
            headers: {
                'USERNM': username,
                'PASS': password,
                'APIKEY': `${import.meta.env.VITE_ERP_API_KEY}`

            }
        }

        try {

            const res = await axios(options)

            if (res?.data[0].STATUS == "1") {

                dispatch(fetchLoginSuccess(res?.data))
                navigate('/byperformance')
                toastSuccessNotify('Login Successful.')

            }
            else {
                toastErrorNotify("'Something Went Wrong !'")
            }

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("'Something Went Wrong !'")
        }
    }


    const logout = async () => {

        dispatch(fetchStart())

        dispatch(fetchLogoutSuccess())
        toastSuccessNotify('Logout Successful.')
        navigate('/')
    }


    const get_managerPersonels = async ({username,password}) => {

        dispatch(fetchStart())

        try {


            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_ERP_PERSONELS_URL}`,
                headers: {
                    'USERNM': username,
                    'PASS': password,
                    'APIKEY': `${import.meta.env.VITE_ERP_API_KEY}`

                }
            }


            const  {data}  = await axios(options)
            
            dispatch(fetchLoginManagerPersonels(data))


        } catch (error) {
            dispatch(fetchFail())
            console.log("managerPersonels function error: ", error)
        }
    }




    return { login, logout,get_managerPersonels }
}


export default useAuthCall;