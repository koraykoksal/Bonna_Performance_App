
import React from 'react'
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { fetchStart, fetchFail, loginSuccess, logoutSuccess, registerSuccess } from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const login = async (userdata) => {

        console.log("userdara : ",userdata)
        dispatch(fetchStart())

        try {

            const options = {
                method: 'POST',
                url: "http://172.41.11.5:3019/butunbiApi/postUserControls",
                headers: {
                    'USERNM': userdata.username,
                    'pass': userdata.password
                }
            }


            const { data } = await axios.post(options)

            dispatch(loginSuccess(data))
            toastSuccessNotify('Login Successful.')
            navigate('/data')

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("'Something Went Wrong !'")
        }
    }






    return { login }
}


export default useAuthCall;