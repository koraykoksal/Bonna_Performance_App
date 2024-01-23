import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Box, Container, Grid, Typography } from "@mui/material"
import Settings_Modal from '../components/modals/Settings_Modal'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useSelector } from "react-redux"
import Settings_Table from '../components/tables/Settings_Table'
import Raise_GraphicData from '../components/tables/Raise_GraphicData'
import DeleteModal from '../components/delete/DeleteModal'


const Settings = () => {

    const createdDate = new Date()
    const { get_raiseData } = usePerformanceCall()
    const { raiseData } = useSelector((state) => state.performance)
    const [data, setData] = useState([])


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


    const [info, setInfo] = useState({
        createdDate: formatDate(createdDate),
        raiseYear: new Date().getFullYear(),
        raiseDetail: evulationInfo(),
        s1_byZam:"",
        s1_myZam:"",
        s1_perZam:"",
        s2_byZam:"",
        s2_myZam:"",
        s2_perZam:"",
        s3_byZam:"",
        s3_myZam:"",
        s3_perZam:"",
        s4_byZam:"",
        s4_myZam:"",
        s4_perZam:"",
        s5_byZam:"",
        s5_myZam:"",
        s5_perZam:"",
    })


    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        get_raiseData('raise-data')
    }, [])



    useEffect(() => {
        const res = Object.keys(raiseData).map(key => ({ id: key, ...raiseData[key] }))
        setData(res)
    }, [raiseData])



    return (
        <div>

            <Typography letterSpacing={10} mt={12} fontWeight={700} color={'red'} align='center' variant='h6'>Ayarlar</Typography>

            <Button variant='contained' sx={{ ml: 15,textTransform:'none' }} onClick={() => handleOpen()}>Yeni</Button>

            <Settings_Modal open={open} handleClose={handleClose} info={info} setInfo={setInfo} handleChange={handleChange} />

            <DeleteModal Open_delete={Open_delete} HandleClose_delete={HandleClose_delete} info={info} setInfo={setInfo}/>

            <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={3} alignItems={'center'}>

                <Settings_Table data={data} info={info} setInfo={setInfo} handleOpen={handleOpen} HandleOpen_delete={HandleOpen_delete}/>

                {/* <Raise_GraphicData raiseData={raiseData} data={data} /> */}
            </Box>


        </div>
    )
}

export default Settings