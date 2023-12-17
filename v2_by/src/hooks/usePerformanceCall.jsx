import React from 'react'
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchFail,
    fetchStart,
    fetchPerformanceData,
    fetchManagerData

} from '../features/performanceSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, Timestamp, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../db/firebase_db"
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid"
import { Children } from 'react'


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


            const  {data}  = await axios(options)
            distpatch(fetchManagerData(data))


        } catch (error) {
            distpatch(fetchFail())
            console.log("managerPersonels function error: ", error)
        }
    }



    const get_myAll_PerformanceData=async(url)=>{

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db,`${url}/`)
            const snapshot = await get(res)

            console.log(snapshot)
            
        } catch (error) {
            distpatch(fetchFail())
            console.log("get_myAll_PerformanceData function error: ",error)
        }
    }



    const get_personel_performanceData=async(url,tcNo)=>{

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db,`${url}/`+tcNo)
            const snapshot = await get(res)

            if(!snapshot.exists()){
                toastWarnNotify('Personel Performans kaydı bulunmuyor !')
            }
            else{
                const data = snapshot.val()

                distpatch(fetchPerformanceData(data))
            }
            
        } catch (error) {
            distpatch(fetchFail())
            console.log("personel performance data: ",error)
        }   
    }


    return {
        get_managerPersonels,
        get_myAll_PerformanceData,
        get_personel_performanceData

    }
}



export default usePerformanceCall