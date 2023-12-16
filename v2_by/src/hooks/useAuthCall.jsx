
import React from 'react'
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import {
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,
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
                navigate('/data')
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




    return { login, logout }
}


export default useAuthCall;