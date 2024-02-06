import React from 'react'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Button, Box, Container, Grid, Typography } from "@mui/material"


const Experience_Table = ({ experienceDatas, experienceInfo, setExperienceInfo, HandleOpen_experience, HandleOpen_delete }) => {


    const dataGrid_Columns = [
        // {
        //     field: "id",
        //     headerName: "ID",
        //     minWidth: 150,
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        // },

        {
            field: "actions",
            headerName: "Düzenle",
            minWidth: 120,
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({
                id,
                row: {
                    createdDate,
                    raiseYear,
                    ky_sifiriki,
                    ky_ikibes,
                    ky_beson,
                    ky_onplus

                }
            }) => {
                return [


                    <GridActionsCellItem
                        key={"edit"}
                        icon={<AiFillEdit size={25} style={{ color: 'darkorange', marginRight: 5 }} cursor='pointer' />}
                        label="Edit"
                        onClick={() => {
                            HandleOpen_experience()
                            setExperienceInfo({
                                id,
                                createdDate,
                                raiseYear,
                                ky_sifiriki,
                                ky_ikibes,
                                ky_beson,
                                ky_onplus
                            })
                        }}

                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDeleteForever size={25} style={{ color: 'darkred', marginRight: 5 }} cursor='pointer' />}
                        label="Del"
                        onClick={() => {
                            HandleOpen_delete()
                            setExperienceInfo({
                                id,
                                type: "experience" //delete modal da type bilgisine göre kontrol et ve silme işlemini öyle yap
                            })
                        }}

                    />,

                ]
            },
        },

        {
            field: "ky_sifiriki",
            headerName: "Kıdem Yılı 0-2",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "ky_ikibes",
            headerName: "Kıdem Yılı 2-5",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "ky_beson",
            headerName: "Kıdem Yılı 5-10",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "ky_onplus",
            headerName: "Kıdem Yılı 10+",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },



    ];

    return (
        <div>
            <Box p={5}>
                <Typography variant='subtitle1' fontWeight={700} align='center'>Kıdem Oranları</Typography>
                <DataGrid
                    columns={dataGrid_Columns}
                    rows={experienceDatas}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50, 75, 100]}
                    slots={{ toolbar: GridToolbar }}
                    disableRowSelectionOnClick
                    sx={{
                        boxShadow: 4,
                    }}
                />
            </Box>

        </div>
    )
}

export default Experience_Table