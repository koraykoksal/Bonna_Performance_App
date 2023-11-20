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


const My2 = ({ info, setInfo }) => {

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }


  return (
    
    <div>

      <Box sx={{ display: 'flex', flexDirection: 'column', py: 10 }}>




  



      </Box>


    </div>
  )
}

export default My2