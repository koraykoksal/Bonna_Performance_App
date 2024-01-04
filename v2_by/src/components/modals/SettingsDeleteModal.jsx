import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { Box, Container } from "@mui/material"
import { IoIosCloseCircle } from "react-icons/io";
import usePerformanceCall from '../../hooks/usePerformanceCall';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};


const SettingsDeleteModal = ({ HandleClose_delete, Open_delete, info, setInfo }) => {

    const {removeRaiseData,get_raiseData}=usePerformanceCall()

    const handleSubmit = (e) => {
        e.preventDefault()
        removeRaiseData('raise-data',info.id)
        get_raiseData('raise-data')
        HandleClose_delete()
        
    }


    return (
        <div>
            <Modal
                open={Open_delete}
                onClose={HandleClose_delete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <IoIosCloseCircle size={25} color='black' cursor={'pointer'} onClick={HandleClose_delete} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                        <Typography align='center' variant='h5'>Kayıt Silinecek Emin Misiniz ?</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 3 }}>

                            <Button variant='contained' color='success' onClick={handleSubmit}>Evet</Button>

                            <Button variant='outlined' color='error' onClick={HandleClose_delete}>Hayır</Button>
                        </Box>
                    </Box>

                </Box>


            </Modal>

        </div>
    )
}

export default SettingsDeleteModal