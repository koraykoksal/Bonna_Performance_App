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
import { useSelector } from "react-redux"


const My2 = ({personelData}) => {

  const { userInfo } = useSelector((state) => state.auth)
  const createdDate = new Date()

  return (

    <div>

      <Typography p={20}>my 222</Typography>
      {/* <My2_Table info={info} handleChange={handleChange} /> */}


    </div>
  )
}

export default My2