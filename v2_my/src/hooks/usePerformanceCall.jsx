import React from 'react'
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchFail,
    fetchStart,
    fetchPerformanceData

} from '../features/performanceSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, Timestamp, collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../db/firebase_db"
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid"
import { useState } from 'react';



const usePerformanceCall = () => {

    const distpatch = useDispatch()
    const navi = useNavigate()
    const [kayitVar, setkayitVar] = useState(null)
    const currentYear = new Date().getFullYear()
    const thisYear = new Date().getFullYear()
    const nextYear = new Date().getFullYear() + 1
    let performanceResult = ""


    //! performans dönemini açıklamasını göster
    const evulationInfo = async () => {

        const currentDate = new Date();
        const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
        const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

        if (currentDate > startLimit && currentDate < endLimit) {
            performanceResult = 'Yıl Sonu Performans Değerlendirme'
        }
        else {
            performanceResult = '6 Aylık Performans Değerlendirme'
        }

        return performanceResult

    }


    const personelControl = (url, info) => {

        const db = getDatabase()
        const res = ref(db, `${url}/` + info.tcNo);

        onValue(res, (snapshot => {
            const data = snapshot.val()

            if (data == undefined || data == null) {
                setkayitVar(false)
            }
            else {

                const result = Object.values(data).filter((item) => currentYear == item.degerlendirmeYili && evulationInfo() == item.degerlendirmeDonemiAciklama)

            

                if (result) {
                    setkayitVar(true)
                }
                else {
                    setkayitVar(false)
                }

            }
        }))
    }


    const post_new_performanceData =  (url, info) => {

        distpatch(fetchStart())

        try {

            //kayıt öncesi personel kaydını kontrol et
            personelControl(url, info)

            if (kayitVar) {

                toastWarnNotify(`${info.tcNo} dönem kaydı var. Tekrar kayıt oluşturamazsınız !`)
            }
            else {
                const uID = uid()
                const db = getDatabase()
                set(ref(db, `${url}/${info.tcNo}/` + uID), info)
                toastSuccessNotify('Kayıt yapılmıştır.')
            }




        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }


    }




    const get_performanceData =  (url, tcNo) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db, `${url}/` + tcNo);

            onValue(res, (snapshot => {
                const data = snapshot.val()

                if (data == undefined || data == null) {
                    console.log("Personel performans sonucu datası null veya undifend geliyor !")
                }
                else {
                    distpatch(fetchPerformanceData(data))
                }
            }))


        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }
    }





    return {
        post_new_performanceData,
        get_performanceData
    }
}



export default usePerformanceCall