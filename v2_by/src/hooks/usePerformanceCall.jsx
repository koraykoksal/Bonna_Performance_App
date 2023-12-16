import React from 'react'
import { toastSuccessNotify, toastErrorNotify } from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchFail,
    fetchStart,
    fetchPerformanceData

} from '../features/performanceSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const usePerformanceCall = () => {

    const distpatch = useDispatch()
    const navi = useNavigate()



    const get_managerPersonels = async ({username,password}) => {

        distpatch(fetchStart())

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


            const  data  = await axios(options)
            console.log(data)


        } catch (error) {
            distpatch(fetchFail())
            console.log("managerPersonels function error: ", error)
        }
    }


    return {
        get_managerPersonels

    }
}



export default usePerformanceCall