import * as React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Select, MenuItem, InputLabel, FormControl, CardMedia, Button, Typography, Card, CardContent, Tabs, Tab } from '@mui/material'
import My1 from '../components/My1';
import My2 from '../components/My2';
import { useState } from 'react';


const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function NewRecord({ open, handleClose, info, setInfo  }) {


//   const handleClose = () => setOpen(false);

  //? tab elementinin varsayılan seçimi Overview
  const [tabValue, settabValue] = useState('my1')
  const [showComponent, setshowComponent] = useState(true)

  const handleChange = (e, newValue) => {
    e.preventDefault()
    settabValue(newValue)

    if (newValue === "my2") {
      setshowComponent(false)
    }
    else {
      setshowComponent(true)
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={()=>{handleClose()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Typography variant="subtitle1" fontWeight={700} sx={{ p: 1, color: '#367E18' }}>
              Değerlendirme Tipini Seçiniz
            </Typography>

            <CloseIcon sx={{ color: '#C70039', fontSize: 28, mr: 1, '&:hover': { cursor: 'pointer', color: '#900C3F' } }} onClick={()=>{handleClose()}} />
          </Box>

          <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>


            <Tabs
              // variant="scrollable"
              scrollButtons
              onChange={handleChange}
              value={tabValue}
            >
              <Tab
                value='my1'
                label='my1'
                defaultChecked
                sx={{
                  fontWeight: '700', backgroundColor: tabValue === 'my1' ? '#f7f7f7' : 'default',
                  color: tabValue === 'my1' ? '#000000' : '#ff0000', borderTopLeftRadius: 5, borderTopRightRadius: 5
                }}
              />

              <Tab
                value='my2'
                label='my2'
                sx={{
                  fontWeight: '700', backgroundColor: tabValue === 'my2' ? '#f7f7f7' : 'default',
                  color: tabValue === 'my2' ? '#000000' : '#ff0000', borderTopLeftRadius: 5, borderTopRightRadius: 5
                }}
              />

            </Tabs>



          </Box>

          {
            showComponent ? <My1 info={info} setInfo={setInfo} /> : <My2 info={info} setInfo={setInfo}/>
          }

        </Box>
      </Modal>
    </div>
  );
}