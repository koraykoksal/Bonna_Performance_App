import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { IoIosCloseCircle } from "react-icons/io";
import { settingsModalBg } from '../../styles/globalStyle';
import usePerformanceCall from '../../hooks/usePerformanceCall';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: '450px',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,

};

const Settings_Modal = ({ open, handleClose, info, setInfo, handleChange }) => {

    const { post_raiseData, get_raiseData, put_raiseData } = usePerformanceCall()

    const handleSubmit = (e) => {

        e.preventDefault()

        if (info?.id) {

            put_raiseData('raise-data', info)
            get_raiseData('raise-data')
            setInfo({
                createdDate: "",
                standartRaise: "",
                performanceRaise: "",
                raiseYear: "",
                raiseDetail: ""
            })
            handleClose()
        }
        else {
            post_raiseData('raise-data', info)
            get_raiseData('raise-data')
            setInfo({
                createdDate: "",
                standartRaise: "",
                performanceRaise: "",
                raiseYear: "",
                raiseDetail: ""
            })
            handleClose()
        }

    }


    console.log(info)


    return (
        <div>

            <Modal
                open={open}
                onClose={()=>{
                    handleClose()
                    setInfo({
                        createdDate: "",
                        standartRaise: "",
                        performanceRaise: "",
                        raiseYear: "",
                        raiseDetail: ""
                    })
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <IoIosCloseCircle size={25} color='red' cursor={'pointer'} onClick={handleClose} />

                    <Box display={'flex'} flexDirection={'column'} gap={5} component={'form'} onSubmit={handleSubmit}>

                        <Box p={3}>
                            <Typography variant='subtitle2' color={'red'} fontWeight={700} align='center'>Zam Oranları Giriş</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, p: 3 }} >

                            <TextField
                                label='Standart Zam'
                                id='standartRaise'
                                name='standartRaise'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                                value={info.standartRaise}
                                inputProps={{ maxLength: 3 }}
                            />

                            <TextField
                                label='Performans Zam'
                                id='performanceRaise'
                                name='performanceRaise'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                                value={info.performanceRaise}
                                inputProps={{ maxLength: 3 }}
                            />
                        </Box>

                        <Box p={3}>
                            <Button variant='contained' sx={{ letterSpacing: 5 }} type='submit' fullWidth>{info?.id ? "Güncelle" : "Kaydet"}</Button>
                        </Box>

                    </Box>


                </Box>


            </Modal>

        </div>
    )
}

export default Settings_Modal