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
    lokasyon:"",
    personel:"",
    q1Calisan:"",
    q2Calisan:"",
    q3Calisan:"",
    q4Calisan:"",
    q5Calisan:"",
    q6Calisan:"",
    q7Calisan:"",
    q8Calisan:"",
    q9Calisan:"",
    q10Calisan:"",
    q1Yonetici:"",
    q2Yonetici:"",
    q3Yonetici:"",
    q4Yonetici:"",
    q5Yonetici:"",
    q6Yonetici:"",
    q7Yonetici:"",
    q8Yonetici:"",
    q9Yonetici:"",
    q10Yonetici:"",
    q1rtak:"",
    q2rtak:"",
    q3rtak:"",
    q4rtak:"",
    q5rtak:"",
    q6rtak:"",
    q7rtak:"",
    q8rtak:"",
    q9rtak:"",
    q1Ortak:"",
  })

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }


  console.log(info)

  return (

    <div>

      <My1_Table info={info} handleChange={handleChange} />

    </div>
  )
}

export default My1