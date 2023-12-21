import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, TextField,Button } from "@mui/material"
import { IoIosCloseCircle } from "react-icons/io";
import { settingsModalBg } from '../../styles/globalStyle';
import usePerformanceCall from '../../hooks/usePerformanceCall';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    height: '600px',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,

};




const Settings_Modal = ({ open, handleClose, info, handleChange }) => {

    const {post_raiseData,get_raiseData}=usePerformanceCall()

    const handleSubmit=(e)=>{

        e.preventDefault()
        post_raiseData('raise-data',info)
        get_raiseData('raise-data')
    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <IoIosCloseCircle size={25} color='red' cursor={'pointer'} onClick={handleClose}/>

                    <Box display={'flex'} flexDirection={'column'} gap={5} component={'form'} onSubmit={handleSubmit}>

                        <Box p={3}>
                            <Typography variant='subtitle2' color={'red'} fontWeight={700} align='center'>Zam Oranları Giriş</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center',flexWrap:'wrap', gap: 3,p:3}} >

                            <TextField
                                label='Standart Zam'
                                id='standartRaise'
                                name='standartRaise'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                                value={info.standartRaise}
                                inputProps={{maxLength:3}}
                            />

                            <TextField
                                label='Performans Zam'
                                id='performanceRaise'
                                name='performanceRaise'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                                value={info.performanceRaise}
                                inputProps={{maxLength:3}}
                            />


                            <TextField
                                label='Yönetici Zam'
                                id='managerRaise'
                                name='managerRaise'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                                value={info.managerRaise}
                                inputProps={{maxLength:3}}
                            />
                        </Box>

                        <Box p={3}>
                            <Button variant='contained' sx={{letterSpacing:5}} type='submit' fullWidth>Kaydet</Button>
                        </Box>

                    </Box>


                </Box>


            </Modal>

        </div>
    )
}

export default Settings_Modal