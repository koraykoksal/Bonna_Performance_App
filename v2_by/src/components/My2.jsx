import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import My2_Table from './My2_Table';


const My2 = () => {

  const [info, setInfo] = useState({
    lokasyon: "",
    personel: "",
    q1Calisan: 0,
    q2Calisan: 0,
    q3Calisan: 0,
    q4Calisan: 0,
    q5Calisan: 0,
    q6Calisan: 0,
    q7Calisan: 0,
    q8Calisan: 0,
    q9Calisan: 0,
    q10Calisan: 0,
    q1Yonetici: 0,
    q2Yonetici: 0,
    q3Yonetici: 0,
    q4Yonetici: 0,
    q5Yonetici: 0,
    q6Yonetici: 0,
    q7Yonetici: 0,
    q8Yonetici: 0,
    q9Yonetici: 0,
    q10Yonetici: 0,
    q1Ortak: 0,
    q2Ortak: 0,
    q3Ortak: 0,
    q4Ortak: 0,
    q5Ortak: 0,
    q6Ortak: 0,
    q7Ortak: 0,
    q8Ortak: 0,
    q9Ortak: 0,
    q10Ortak: 0,
    oypCalisan: 0,
    oypYonetici: 0,
    oypOrtak: 0,
    dypCalisan: 0,
    dypYonetici: 0,
    dypOrtak: 0,
    tppCalisan: 0,
    tppYonetici: 0,
    tppOrtak: 0,
    calisanAciklama: "",
    yoneticiAciklama: "",
    yd: 0,
    pd: 0,
    od: 0
  })

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }


  return (

    <div>

      <My2_Table info={info} handleChange={handleChange} />


    </div>
  )
}

export default My2