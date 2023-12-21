import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Box, Container, Grid, Typography } from "@mui/material"
import Settings_Modal from '../components/modals/Settings_Modal'
import { settingsModalBg } from '../styles/globalStyle'

const Settings = () => {

    const createdDate = new Date()


    // viewer modal handle state bilgisi
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)

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

    const [info, setInfo] = useState({

        createdDate: formatDate(createdDate),
        standartRaise: "",
        performanceRaise: "",
        managerRaise: "",
        raiseYear: new Date().getFullYear()
    })


    const handleChange=(e)=>{

        setInfo({...info,[e.target.name]:e.target.value})
    }




    return (
        <div>

            <Typography letterSpacing={10} mt={12} fontWeight={700} color={'red'} align='center'>Ayarlar</Typography>

            <Container>
                <Button variant='contained' onClick={()=>handleOpen()}>Yeni</Button>
            </Container>

           <Settings_Modal open={open} handleClose={handleClose} info={info} setInfo={setInfo} handleChange={handleChange}/>

        </div>
    )
}

export default Settings