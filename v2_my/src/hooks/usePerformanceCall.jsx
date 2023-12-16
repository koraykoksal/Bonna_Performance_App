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
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid"
import { useState } from 'react';
import { async } from '@firebase/util'



const usePerformanceCall = () => {

    const distpatch = useDispatch()
    const navi = useNavigate()
    const [kayitVar, setkayitVar] = useState(false)


    //! performans dönemini açıklamasını göster
    const evulationInfo = async () => {

        const thisYear = new Date().getFullYear()
        const nextYear = new Date().getFullYear() + 1
        let performanceResult = ""

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

    

    const post_new_performanceData = async (url, info) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase();
            const res = ref(db, `${url}/${info.tcNo}`);
            const snapshot = await get(res);

            // kullanıcı veri tabanında var mı kontrol et
            if (!snapshot.exists()) {

                // kullanıcı yoksa kayıt işlemini yap
                const uID = uid();
                const newDb = getDatabase();
                await set(ref(newDb, `${url}/${info.tcNo}/${uID}`), info);
                toastSuccessNotify('Kayıt yapılmıştır.');

            } else {

                // kullanıcı varsa aşağıdaki doğrulama işlemini yap

                const currentYear = new Date().getFullYear();
                const degerlendirmeDonemiAciklama = evulationInfo();

                const data = snapshot.val();

                const result = Object.keys(data).map(key => ({ id: key, ...data[key] }));

                const findElement = result.filter(item => (
                    item.degerlendirmeYili === currentYear &&
                    item.degerlendirmeDonemiAciklama === degerlendirmeDonemiAciklama
                ));

                // doğrula sonrası işlemleri yap
                if (findElement) {
                    toastWarnNotify(`${info.tcNo} dönem kaydı var. Tekrar kayıt oluşturamazsınız !`);
                } else {
                    const uID = uid();
                    const newDb = getDatabase();
                    await set(ref(newDb, `${url}/${info.tcNo}/${uID}`), info);
                    toastSuccessNotify('Kayıt yapılmıştır.');
                }
            }

        } catch (error) {
            distpatch(fetchFail());
            // console.log(error)
            toastErrorNotify("Something Went Wrong !");
        }


    }




    const get_performanceData = async (url, tcNo) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db, `${url}/` + tcNo);
            const snapshot = await get(res)


            if(!snapshot.exists()){
                console.log("Personel performans sonucu datası null veya undifend geliyor !")
            }
            else{
                const data = snapshot.val()
                distpatch(fetchPerformanceData(data))
            }

            // onValue(res, (snapshot => {
            //     const data = snapshot.val()

            //     if (data == undefined || data == null) {
            //         console.log("Personel performans sonucu datası null veya undifend geliyor !")
            //     }
            //     else {
            //         distpatch(fetchPerformanceData(data))
            //     }
            // }))


        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }
    }


    //! güncelleme
    const put_PerformanceData = async (url, info) => {


        try {

            const db = getDatabase()
            await update(ref(db, `${url}/${info.tcNo}/` + info.id), info)
            toastSuccessNotify('Updated Data')

        } catch (error) {
            console.log("Update error :", error)
            toastErrorNotify('Not OK Update ')
        }
    }



    return {
        post_new_performanceData,
        get_performanceData,
        put_PerformanceData
    }
}



export default usePerformanceCall