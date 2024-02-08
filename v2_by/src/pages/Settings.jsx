import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Box, Container, Grid, Typography } from "@mui/material"
import Sallary_Modal from '../components/modals/Sallary_Modal'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useSelector } from "react-redux"
import Sallary_Table from '../components/tables/Sallary_Table'
import DeleteModal from '../components/delete/DeleteModal'
import Experience_Table from '../components/tables/Experience_Table'
import Experience_Modal from '../components/modals/Experience_Modal'
import { settingPageBgStyle } from '../styles/globalStyle'


const Settings = () => {

    const createdDate = new Date()
    const { post_raiseData, get_raiseData, put_raiseData,get_experienceData,put_experienceData,post_experienceData } = usePerformanceCall()
    const { raiseData,experienceData } = useSelector((state) => state.performance)
    const [sallaryData, setSallaryData] = useState([])
    const [experienceDatas, setExperienceDatas] = useState([])


    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setInfo({
            createdDate: formatDate(createdDate),
            standartRaise: "",
            performanceRaise: "",
            raiseYear: new Date().getFullYear(),
            raiseDetail: evulationInfo()
        })

    }


    const [Open_delete, setOpen_delete] = useState(false)
    const HandleOpen_delete = () => setOpen_delete(true);
    const HandleClose_delete = () => {
        setOpen_delete(false)

    }

    const [Open_experience, setOpen_experience] = useState(false)
    const HandleOpen_experience = () => setOpen_experience(true);
    const HandleClose_experience = () => {
        setOpen_experience(false)

    }


    //! createddate bilgisini çıkar
    function formatDate(date) {
        let day = date.getDate(); // Günü alır
        let month = date.getMonth() + 1; // Ayı alır (0'dan başladığı için 1 eklenir)
        let year = date.getFullYear(); // Yılı alır
        let hours = date.getHours(); // Saati alır
        let minutes = date.getMinutes(); // Dakikayı alır

        // Gün, ay, saat veya dakika tek basamaklıysa, başına '0' ekler
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }


    //! performans dönemi bilgisini çalıştır
    const evulationInfo = () => {

        let performanceResult = ""
        const thisYear = new Date().getFullYear()
        const nextYear = new Date().getFullYear() + 1

        const currentDate = new Date();
        const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
        const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

        if (currentDate > startLimit || currentDate < endLimit) {
            performanceResult = 'Yıl Sonu Değerlendirme'
        }
        else {
            performanceResult = '6 Aylık Değerlendirme'
        }

        return performanceResult

    }


    // maaş oranları bilgisi
    const [info, setInfo] = useState({
        type:"Sallary",
        createdDate: formatDate(createdDate),
        raiseYear: new Date().getFullYear(),
        raiseDetail: evulationInfo(),
        s1_byZam: "",
        s1_myZam: "",
        s1_perZam: "",
        s2_byZam: "",
        s2_myZam: "",
        s2_perZam: "",
        s3_byZam: "",
        s3_myZam: "",
        s3_perZam: "",
        s4_byZam: "",
        s4_myZam: "",
        s4_perZam: "",
        s5_byZam: "",
        s5_myZam: "",
        s5_perZam: "",
    })

    // kıdem oranları bilgisi
    const [experienceInfo, setExperienceInfo] = useState({
        "type":"Experience",
        "createdDate": formatDate(createdDate),
        "raiseYear": new Date().getFullYear(),
        "ky_sifiriki":"",
        "ky_ikibes":"",
        "ky_beson":"",
        "ky_onplus":""
    })


    // maaş girişlerin verileri karşıla
    const handleChangeSallary = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    // kıdem yılı girişlerinde verileri karıla
    const handleChangeExperience = (e) => {
        setExperienceInfo({ ...experienceInfo, [e.target.name]: e.target.value })
    }


    // maaş ve kıdem yılı kayıt işlemi için çalıştır
    const handleSubmit = (e,data) => {

        e.preventDefault()

        if(data=="Sallary"){

            if (info?.id) {
                put_raiseData('raise-data', info)
            }
            else {
                post_raiseData('raise-data', info)
            }
        }
        else{
            if (experienceInfo?.id) {
                put_experienceData('experience-data', experienceInfo)
            }
            else {
                post_experienceData('experience-data', experienceInfo)
            }
        }

        handleClose()

    }


    // güncel zam oranlarını çek
    useEffect(() => {
        get_raiseData('raise-data')
        get_experienceData('experience-data')
    }, [])



    // güncel zam oranlarını array formatına dönüştür
    useEffect(() => {

        const sallaryRes = Object.keys(raiseData).map(key => ({ id: key, ...raiseData[key] }))
        const experienceRes = Object.keys(experienceData).map(key => ({ id: key, ...experienceData[key] }))

        setSallaryData(sallaryRes)
        setExperienceDatas(experienceRes)

    }, [raiseData,experienceData])




    return (
        <div style={settingPageBgStyle}>

            <Typography letterSpacing={10} mt={12} mb={5} fontWeight={700} color={'red'} align='center' variant='h6'>Ayarlar</Typography>




            <Box display={'flex'} justifyContent={'center'} gap={3} p={3}>

                <Button variant='contained' sx={{ textTransform: 'none', width: '150px' }} onClick={() => handleOpen()}>Yeni Zam Oranı</Button>

                <Button variant='contained' sx={{ textTransform: 'none', width: '150px' }} onClick={() => HandleOpen_experience()}>Yeni Kıdem Oranı</Button>

            </Box>


            <Box display={'flex'} flexDirection={'column'} p={1}>

                <Sallary_Table sallaryData={sallaryData} info={info} setInfo={setInfo} handleOpen={handleOpen} HandleOpen_delete={HandleOpen_delete} />

                <Experience_Table  experienceDatas={experienceDatas} experienceInfo={experienceInfo} setExperienceInfo={setExperienceInfo} HandleOpen_experience={HandleOpen_experience} HandleOpen_delete={HandleOpen_delete}/>

            </Box>


            <Sallary_Modal open={open} handleClose={handleClose} info={info} setInfo={setInfo} handleChangeSallary={handleChangeSallary} handleSubmit={handleSubmit} />


            <Experience_Modal Open_experience={Open_experience} experienceInfo={experienceInfo} handleChangeExperience={handleChangeExperience} handleSubmit={handleSubmit} HandleClose_experience={HandleClose_experience}/>


            <DeleteModal Open_delete={Open_delete} HandleClose_delete={HandleClose_delete} info={info} setInfo={setInfo} experienceInfo={experienceInfo}/>



        </div>
    )
}

export default Settings