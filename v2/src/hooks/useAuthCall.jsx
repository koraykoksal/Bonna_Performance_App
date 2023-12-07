
import React from 'react'
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { fetchStart, fetchFail, loginSuccess, logoutSuccess } from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const login = async (userdata) => {


        dispatch(fetchStart())

        try {

            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_ERP_LOGIN_BASE_URL}`,
                headers: {
                    'USERNM': userdata.username,
                    'PASS': userdata.password,
                    'APIKEY': `${import.meta.env.VITE_ERP_API_KEY}`

                }
            }


            const { data } = await axios(options)

            dispatch(loginSuccess(data))
            toastSuccessNotify('Login Successful.')
            navigate('/data')

            console.log(data)

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("'Something Went Wrong !'")
        }
    }

    const logout = async () => {


        dispatch(fetchStart())

        dispatch(logoutSuccess())
        toastSuccessNotify('Logout Successful.')
        navigate('/')
    }



    return { login, logout }
}


export default useAuthCall;