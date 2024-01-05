
import React from 'react'
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import { fetchStart, fetchFail, loginSuccess, logoutSuccess, fetchAllUsers } from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {personelData} from "../helper/personelData"


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

            console.log(res)

            if (res?.data.length > 0) {
                dispatch(fetchAllUsers(res?.data))
            }
            else {
                toastWarnNotify('Entegrasyondan cevap alınamadı !')
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

            // await get_bonnaPersonel()

            // const findPersonel = allBonnaPersonel.find((item) => item.TCKIMLIKNO == userdata.tcno)
            const findPersonel = personelData.find((item) => item.TCKIMLIKNO == userdata.tcno)

            console.log("find personel: ",findPersonel)

            if (findPersonel) {

                const res = await axios(options)
                
                console.log("res : ",res)

                dispatch(loginSuccess(res?.data))
                navigate('/myperformance')
                toastSuccessNotify('Login Successful.')
                
            }
            else{
                toastErrorNotify(`Firma kayıtlarında ${userdata.tcno} nolu kimlik kaydı bulunamadı !. Kimlik numarasını kontrol ediniz !`)
            }

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Login Error !",error)
            console.log("Login Error !",error)
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