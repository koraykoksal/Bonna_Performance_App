import React from 'react'
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchFail,
    fetchStart,
    fetchPerformanceData,
    fetchManagerData,
    fetchAllPerformanceData

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


    const get_managerPersonels = async ({ username, password }) => {

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


            const { data } = await axios(options)
            distpatch(fetchManagerData(data))


        } catch (error) {
            distpatch(fetchFail())
            console.log("managerPersonels function error: ", error)
        }
    }



    //! tüm personel performans datasının getir
    const get_All_PerformanceData = async (url) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db, `${url}/`)
            const snapshot = await get(res)

            if(!snapshot.exists()){

                toastWarnNotify('Personel Performans Sonucu bulunmuyor !')
            }
            else{
                distpatch(fetchAllPerformanceData(snapshot.val()))
            }

        } catch (error) {
            distpatch(fetchFail())
            console.log("get_myAll_PerformanceData function error: ", error)
        }
    }


    

    //! personel performans datasını getir
    const get_personel_performanceData = async (url, tcNo) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db, `${url}/` + tcNo)
            const snapshot = await get(res)

            if (!snapshot.exists()) {
                toastWarnNotify('Personel Performans kaydı bulunmuyor !')
            }
            else {
                const data = snapshot.val()

                distpatch(fetchPerformanceData(data))
            }

        } catch (error) {
            distpatch(fetchFail())
            console.log("personel performance data: ", error)
        }
    }



    //! manager değerlendirmesi sonrası database kaydı yap
    const post_manager_evaulationData = async (url, info) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db, `${url}/${info.tcNo}`)
            const snapshot = await get(res)


            if (!snapshot.exists()) {

                // kullanıcı yoksa kayıt işlemini yap
                const uID = uid();
                const newDb = getDatabase();
                await set(ref(newDb, `${url}/${info.tcNo}/${uID}`), info);
                toastSuccessNotify('Kayıt yapılmıştır.');
            }
            else {

                // kullanıcı varsa aşağıdaki doğrulama işlemini yap

                const currentYear = new Date().getFullYear();
                const degerlendirmeDonemiAciklama = evulationInfo();

                const data = snapshot.val();

                const result = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                const lastRecord = result.sort()[result.length - 1]

                const findElement = result.filter(item => (
                    item.yoneticiDegerlendirmeYili === currentYear &&
                    item.yoneticiDegerlendirmeDonemiAciklama === degerlendirmeDonemiAciklama
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
            distpatch(fetchFail())
            console.log("post_manager_evaulationData", error)
        }
    }



    return {
        get_managerPersonels,
        get_All_PerformanceData,
        get_personel_performanceData,
        post_manager_evaulationData,

    }
}



export default usePerformanceCall