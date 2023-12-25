import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import { BsFiletypePdf } from "react-icons/bs";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,

};



const PdfViewer = ({ open, handleClose, info }) => {


    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >

                <Box sx={style}>


                    <Document>
                        <Page size="A4" >
                            <View>
                                <Text>Section #1</Text>
                            </View>
                            <View>
                                <Text>Section #2</Text>
                            </View>
                        </Page>
                    </Document>

                </Box>

            </Modal>

        </div>
    )
}

export default PdfViewer