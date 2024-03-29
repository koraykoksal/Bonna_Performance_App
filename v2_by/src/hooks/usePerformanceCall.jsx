import React from 'react'
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchFail,
    fetchStart,
    fetchPerformanceData,
    fetchManagerData,
    fetchAllPerformanceData,
    fetchRaiseData,
    fetchByOKRPerformanceData,
    fetchUnSelectedPersonelData,
    fetchBonnaPersonels,
    fetchExperienceData

} from '../features/performanceSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { db } from "../db/firebase_db"
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid"
import { Children } from 'react'
import { useState } from 'react'

const usePerformanceCall = () => {

    const distpatch = useDispatch()
    const navi = useNavigate()
    const { twiserAccesToken, managerPersonels } = useSelector((state) => state.auth)
    const currentYear = new Date().getFullYear()



    //! performans dönemini açıklamasını göster
    const evulationInfo = () => {

        const thisYear = new Date().getFullYear()
        const nextYear = new Date().getFullYear() + 1
        let performanceResult = ""

        const currentDate = new Date();
        const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
        const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

        if (currentDate > startLimit || currentDate < endLimit) {
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


            if (!snapshot.exists()) {

                toastWarnNotify('Personel Performans Sonucu bulunmuyor !')
            }
            else {
                let dizi = []

                Object.values(snapshot.val()).forEach(item => {

                    if (typeof item == 'object' && item != null) {

                        const result = Object.keys(item).map(key => { return { id: key, ...item[key] } })

                        result.map(item => {
                            dizi.push(item)
                            return { ...item, item }
                        })

                    }

                })

                distpatch(fetchAllPerformanceData(dizi))
                // distpatch(fetchAllPerformanceData(snapshot.val()))


            }

        } catch (error) {
            distpatch(fetchFail())
            console.log("get_All_PerformanceData error: ", error)
        }
    }


    //! personel performans datasını getir
    //! home sayfasında select den personel seçildiğinde db den en son kayıt bilgisi çekilir
    const get_personel_performanceData = async (url, info) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            const res = ref(db, `${url}/` + info.choice_personel_tcno)
            const snapshot = await get(res)

            if (!snapshot.exists()) {
                toastWarnNotify('Personel Performans kaydı bulunmuyor !')
            }
            else {

                const currentYear = new Date().getFullYear();
                const degerlendirmeDonemiAciklama = evulationInfo();

                const data = snapshot.val()
                const dataArray = Object.values(data)

                // birden fazla kayıt olduğu için personelin son kayıt bilgisini çek
                const result = dataArray.filter(element => element.degerlendirmeYili == currentYear && element.degerlendirmeDonemiAciklama == degerlendirmeDonemiAciklama)

                // result datası true ise veriyi gönden değilse boş değer döndür
                if (result.length > 0) {
                    distpatch(fetchPerformanceData(result))
                }
                else {
                    toastWarnNotify(`${currentYear} yılına ait Personel Performans kaydı bulunmuyor !`)
                    distpatch(fetchPerformanceData([]))
                }

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

                // kayıt işlemi sonrası tüm performans datası bilgisini çekerek unselected personel verisi güncellenmiş olur
                get_All_PerformanceData('manager-evaluation')

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
                if (findElement.length > 0) {
                    toastWarnNotify(`${info.tcNo} dönem kaydı var. Tekrar kayıt oluşturamazsınız !`);
                } else {
                    const uID = uid();
                    const newDb = getDatabase();
                    await set(ref(newDb, `${url}/${info.tcNo}/${uID}`), info);
                    toastSuccessNotify('Kayıt yapılmıştır.');

                    // kayıt işlemi sonrası tüm performans datası bilgisini çekerek unselected personel verisi güncellenmiş olur
                    get_All_PerformanceData('manager-evaluation')

                }

            }



        } catch (error) {
            distpatch(fetchFail())
            console.log("post_manager_evaulationData", error)
        }
    }



    const put_performanceData = async (url, info) => {

        distpatch(fetchStart())

        try {

            const db = getDatabase()
            await update(ref(db, `${url}/${info.tcNo}/` + info.id), info)
            toastSuccessNotify('Updated Data')

        } catch (error) {
            console.log("put_performanceData error: ", error)
            toastErrorNotify('Not OK Update ')
        }
    }


    //! zam oranı bilgisini güncelle
    const put_raiseData = async (url, info) => {

        try {

            const db = getDatabase()
            await update(ref(db, `${url}/${info.id}`), info)
            toastSuccessNotify('Updated Data')

            //! zam oranı bilgisini çek
            await get_raiseData('raise-data')

        } catch (error) {
            console.log("put_raiseData error: ", error)
            toastErrorNotify('Not OK Update ')
        }
    }


    //! zam oranı bilgisini kayıt et
    const post_raiseData = async (url, info) => {

        try {

            const db = getDatabase()
            const res = ref(db, `${url}`)
            const snapshot = await get(res)


            if (!snapshot.exists()) {

                const db = getDatabase()
                const uID = uid()
                await set(ref(db, `${url}/${uID}`), info)
                toastSuccessNotify('Kayıt yapılmıştır.');

                //! zam oranı bilgisini çek
                await get_raiseData('raise-data')
            }
            else {

                const currentYear = new Date().getFullYear();
                const data = snapshot.val();

                const result = Object.keys(data).map(key => ({ id: key, ...data[key] }));

                const findElement = result.filter(item => item.raiseYear == currentYear);

                // doğrula sonrası işlemleri yap
                if (findElement.length > 0) {
                    toastWarnNotify(`${currentYear} için zam oranı bulunmaktadır !`);
                } else {
                    const uID = uid();
                    const newDb = getDatabase();
                    await set(ref(newDb, `${url}/${uID}`), info);
                    toastSuccessNotify('Kayıt yapılmıştır.');
                }

            }



        } catch (error) {
            console.log("post_raiseData: ", error)
            toastErrorNotify('Not OK Raise Data ')
        }
    }


    //! zam datasını çek
    const get_raiseData = async (url) => {

        try {

            const db = getDatabase()
            const res = ref(db, `${url}`)
            const snapshot = await get(res)


            if (!snapshot.exists()) {
                toastWarnNotify('Zam bilgisi bulunmuyor')
            }
            else {
                const data = snapshot.val()
                distpatch(fetchRaiseData(data))

                // const data = Object.values(snapshot.val());
                // const lastData = data.find(item => item.raiseYear === currentYear);

                // if (!lastData) {
                //     toastWarnNotify(`raiseYear değeri ${currentYear} olan bir veri bulunamadı.`)
                //     console.log(`raiseYear değeri ${currentYear} olan bir veri bulunamadı.`);
                //     return;
                // }
                // else{
                //     distpatch(fetchRaiseData(data))
                // }

            }

        } catch (error) {
            console.log("post_raiseData: ", error)
            toastErrorNotify('Not OK Raise Data ')
        }
    }


    //! kıdem oranı bilgisini güncelle
    const put_experienceData = async (url, info) => {
        
        try {

            const db = getDatabase()
            await update(ref(db, `${url}/${info.id}`), info)
            toastSuccessNotify('Updated Data')

            //! zam oranı bilgisini çek
            await get_experienceData('experience-data')

        } catch (error) {
            console.log("put-experience error: ", error)
            toastErrorNotify('Not OK Update ')
        }
    }


    //! kıdem oranı bilgisini kayıt et
    const post_experienceData = async (url, info) => {

        try {

            const db = getDatabase()
            const res = ref(db, `${url}`)
            const snapshot = await get(res)


            if (!snapshot.exists()) {

                const db = getDatabase()
                const uID = uid()
                await set(ref(db, `${url}/${uID}`), info)
                toastSuccessNotify('Kayıt yapılmıştır.');

                //! zam oranı bilgisini çek
                await get_experienceData('experience-data')
            }
            else {

                const currentYear = new Date().getFullYear();
                const data = snapshot.val();

                const result = Object.keys(data).map(key => ({ id: key, ...data[key] }));

                const findElement = result.filter(item => item.raiseYear == currentYear);

                // doğrula sonrası işlemleri yap
                if (findElement.length > 0) {
                    toastWarnNotify(`${currentYear} için zam oranı bulunmaktadır !`);
                } else {
                    const uID = uid();
                    const newDb = getDatabase();
                    await set(ref(newDb, `${url}/${uID}`), info);
                    toastSuccessNotify('Kayıt yapılmıştır.');
                }

            }



        } catch (error) {
            console.log("post_experienceData: ", error)
            toastErrorNotify('Not OK Experience Data ')
        }
    }


    //! kıdem oranları datasını çek
    const get_experienceData = async (url) => {

        try {

            const db = getDatabase()
            const res = ref(db, `${url}`)
            const snapshot = await get(res)


            if (!snapshot.exists()) {
                toastWarnNotify('Kıdem oranları verisi bulunmuyor')
            }
            else {
                const data = snapshot.val()
                distpatch(fetchExperienceData(data))

                // const data = Object.values(snapshot.val());
                // const lastData = data.find(item => item.raiseYear === currentYear);

                // if (!lastData) {
                //     toastWarnNotify(`raiseYear değeri ${currentYear} olan bir veri bulunamadı.`)
                //     console.log(`raiseYear değeri ${currentYear} olan bir veri bulunamadı.`);
                //     return;
                // }
                // else{
                //     distpatch(fetchRaiseData(data))
                // }

            }

        } catch (error) {
            console.log("get_experienceData: ", error)
            toastErrorNotify('Not OK Experience Data ')
        }
    }



    //! twiser performance data
    const get_beyazYaka_performanceData = () => {

        fetch(`${import.meta.env.VITE_TWISER_BYDATA_BASEADDRESS}`, {
            method: 'post',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${twiserAccesToken}`
            },
            body: JSON.stringify({
                "CompanyIds": [
                    1056
                ],
                "PeriodSettingIds": [
                    // "64c1361bb93717671ededea5"
                    "653253004e64e5f2dde325cd"
                ],
                "DimensionIds": [],
                "UserIdList": [],
                "DepartmentIds": [],
                "OrderDirection": "0",
                "OrderBy": "UserFullName",
                "Page": 0,
                "PageSize": 10000
                // "take": 500
            })
        })
            .then(res => res.json())
            .then(data => {

                const dizi = []

                Object.values(data).forEach(element => {

                    if (Array.isArray(element)) {

                        const result = element.map(item => {
                            dizi.push(item)
                            return { ...item, item }
                        })
                        distpatch(fetchByOKRPerformanceData(dizi))
                    }
                })

                // console.log("dizi: ",dizi)

            })
            .catch(err => console.log(err))
    }


    //! firebase zam oranı data silme
    const removeRaiseData = async (address, id) => {

        try {
            const db = getDatabase();
            await remove(ref(db, `${address}/${id}`))
            toastSuccessNotify('Data Deleted ✅')

        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }


    //! firebase zam oranı data silme
    const removeExperienceData = async (address, id) => {

        try {
            const db = getDatabase();
            await remove(ref(db, `${address}/${id}`))
            toastSuccessNotify('Data Deleted ✅')

        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }



    //! firebase maviyaka performans data silme
    const removeMyPerformanceData = async (address, info) => {

        try {
            const db = getDatabase();
            await remove(ref(db, `${address}/${info.tcNo}/${info.id}`))
            toastSuccessNotify('Data Deleted ✅')

        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }



    //! firebase manager performans data silme
    const removeManagerEvaluationData = async (address, info) => {

        try {
            const db = getDatabase();
            await remove(ref(db, `${address}/${info.tcNo}/${info.id}`))
            toastSuccessNotify('Data Deleted ✅')

        } catch (error) {
            toastErrorNotify('No Delete Data ❌')
        }
    }


    //! bonna personel listesini çek
    const getBonnaPersonels = async (year) => {

        try {

            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_bonnaUsers_BaseAddress}`,
                headers: {
                    'APIKEY': `${import.meta.env.VITE_ERP_API_KEY}`,
                    // 'PYEAR': `${year}`
                    'PYEAR': '2023'
                }
            }

            const res = await axios(options)


            if (res?.data.length > 0) {
                distpatch(fetchBonnaPersonels(res?.data))
            }

        } catch (error) {
            console.log("get_bonnaPersonel: ", error)
        }

    }




    return {
        get_managerPersonels,
        get_All_PerformanceData,
        get_personel_performanceData,
        post_manager_evaulationData,
        put_performanceData,
        post_raiseData,
        get_raiseData,
        put_raiseData,
        get_beyazYaka_performanceData,
        removeRaiseData,
        removeMyPerformanceData,
        removeManagerEvaluationData,
        getBonnaPersonels,
        get_experienceData,
        post_experienceData,
        put_experienceData,
        removeExperienceData

    }
}



export default usePerformanceCall