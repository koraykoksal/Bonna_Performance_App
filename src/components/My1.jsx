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

const My1 = ({info,setInfo}) => {



  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  

  return (

    <div>


      <FormControl fullWidth>
        <InputLabel id="lokasyon">Red/Kabul/Şartlı Kabul</InputLabel>
        <Select
          labelId="lokasyon"
          id="lokasyon"
          name='lokasyon'
          label="lokasyon"
          value={info.lokasyon}
          onChange={handleChange}
        >
          <MenuItem value="RED">RED</MenuItem>
          <MenuItem value="KABUL">KABUL</MenuItem>
          <MenuItem value="ŞARTLI KABUL">ŞARTLI KABUL</MenuItem>
        </Select>
      </FormControl>



    </div>
  )
}

export default My1