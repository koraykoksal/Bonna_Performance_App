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
import { DataGrid } from '@mui/x-data-grid';
import My1_Table from './My1_Table';


const My1 = () => {

  const [info, setInfo] = useState({

    q1Calisan:0,
    q2Calisan:0,
    q3Calisan:0,
    q4Calisan:0,
    q5Calisan:0,
    q6Calisan:0,
    q7Calisan:0,
    q8Calisan:0,
    q9Calisan:0,
    q10Calisan:0,
    oypCalisan:0,
    dypCalisan:0,
    tppCalisan:0,
    calisanAciklama:"",
    degerlendirmeSonucu:0,
    calisanDegerlendirmeYuzdesi:0.35
  })


  const handleChange = (e) => {
    // setInfo({ ...info, [e.target.name]: e.target.value })

    setInfo(prevInfo => {

      const newInfo= {...prevInfo,[e.target.name]:e.target.value}

      const operayonelYetkinlikPuani = Number(newInfo.q1Calisan) + Number(newInfo.q2Calisan) + Number(newInfo.q3Calisan) + Number(newInfo.q4Calisan) + Number(newInfo.q5Calisan) + Number(newInfo.q6Calisan)

      const davranissalYetkinlikPuani = Number(newInfo.q7Calisan) + Number(newInfo.q8Calisan) + Number(newInfo.q9Calisan) + Number(newInfo.q10Calisan)

      const calisanPuani = Number(newInfo.q1Calisan) + Number(newInfo.q2Calisan) + Number(newInfo.q3Calisan) + Number(newInfo.q4Calisan) + Number(newInfo.q5Calisan) + Number(newInfo.q6Calisan) + Number(newInfo.q7Calisan) + Number(newInfo.q8Calisan) + Number(newInfo.q9Calisan) + Number(newInfo.q10Calisan)

      newInfo.oypCalisan = operayonelYetkinlikPuani;
      newInfo.dypCalisan = davranissalYetkinlikPuani;
      newInfo.tppCalisan = newInfo.oypCalisan + newInfo.dypCalisan;
      newInfo.degerlendirmeSonucu = calisanPuani * newInfo.calisanDegerlendirmeYuzdesi

      return newInfo
      
    })
  }


  console.log(info)

  return (

    <div>

      <My1_Table info={info} handleChange={handleChange} />

    </div>
  )
}

export default My1