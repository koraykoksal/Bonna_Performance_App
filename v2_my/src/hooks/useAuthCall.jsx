
import React from 'react'
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { fetchStart, fetchFail, loginSuccess, logoutSuccess, fetchAllUsers } from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { allBonnaPersonel } = useSelector((state) => state.auth)


    
    const get_bonnaPersonel = async () => {

        dispatch(fetchStart())

        try {

            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_bonnaUsers_BaseAddress}`,
                headers: {
                    'APIKEY': `${import.meta.env.VITE_ERP_API_KEY}`

                }
            }

            const res = await axios(options)

            if (res.status == 200) {
                dispatch(fetchAllUsers(res?.data))
            }
            else {
                console.log(" ** login öncesi bonna personelleri bilgisini alamıyor. get_bonnaPersonel fonksiyonu çalışmadı session problemi olabilir ! ** ")
            }

        } catch (error) {
            console.log("get_bonnaPersonel: ", error)
        }
    }


    const login = async (userdata) => {

        dispatch(fetchStart())

        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_bonnaUserLogin_BaseAddress}`,
            headers: {
                'TC':userdata.tcno,
                'APIKEY': `${import.meta.env.VITE_ERP_API_KEY}`

            }
        }

        try {

            await get_bonnaPersonel()

            const findPersonel = allBonnaPersonel.find((item) => item.TCKIMLIKNO == userdata.tcno)

            if (findPersonel) {

                const res = await axios(options)
                
                dispatch(loginSuccess(res?.data))
                toastSuccessNotify('Login Successful.')
                navigate('/myperformance')
                //! yonetici bilgisi
                // const data = JSON.parse(res?.data[0].YONETICI)

                
            }
            else{
                toastErrorNotify(`Firma kayıtlarında ${userdata.tcno} nolu kimlik kaydı bulunamadı !. Kimlik numarasını kontrol ediniz !`)
            }

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Login Error !")
        }

    }


    const logout = () => {


        dispatch(fetchStart())

        dispatch(logoutSuccess())
        toastSuccessNotify('Logout Successful.')
        navigate('/')
    }



    return { login, logout, get_bonnaPersonel }
}


export default useAuthCall;