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


const My1 = ({ info, setInfo }) => {



  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }



  return (

    <div>

      <My1_Table info={info} handleChange={handleChange} />

    </div>
  )
}

export default My1