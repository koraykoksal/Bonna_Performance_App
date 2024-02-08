import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";


const PerformanceResult_Table_BY_OKR = ({ byOkrPerformance, handleOpen, setInfo }) => {

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
            minWidth: 80,
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({
                id,
                row: {
                    UserEmployeeNo,
                    CompanyName,
                    CompetencePeriodList,
                    CompetencePeriods,
                    CompetencePeriodsAvg,
                    CompetenceWeight,
                    Department,
                    DimensionName,
                    ExternalNote,
                    ExternalNoteName,
                    ExternalNoteWeight,
                    FinalScore,
                    FinalScoreScale,
                    IncludeModules,
                    ManagerComment,
                    ManagerScore,
                    ManagerScoreIsSend,
                    ManagerScoreScale,
                    ObjectivePeriodList,
                    ObjectivePeriods,
                    ObjectivePeriodsAvg,
                    ObjectiveWeight,
                    ParentEmail,
                    ParentFullName,
                    PerformancePeriodName,
                    SystemNote,
                    SystemNoteScale,
                    UserEmail,
                    UserFullName,
                    UserPosition
                }
            }) => {
                return [

                    <GridActionsCellItem
                        key={'show'}
                        label='Show'
                        icon={<FaEye size={23} style={{ cursor: 'pointer', color: 'darkblue' }} />}
                        onClick={() => {
                            handleOpen()
                            setInfo({
                                id,
                                CompanyName,
                                CompetencePeriodList,
                                CompetencePeriods,
                                CompetencePeriodsAvg,
                                CompetenceWeight,
                                Department,
                                DimensionName,
                                ExternalNote,
                                ExternalNoteName,
                                ExternalNoteWeight,
                                FinalScore,
                                FinalScoreScale,
                                IncludeModules,
                                ManagerComment,
                                ManagerScore,
                                ManagerScoreIsSend,
                                ManagerScoreScale,
                                ObjectivePeriodList,
                                ObjectivePeriods,
                                ObjectivePeriodsAvg,
                                ObjectiveWeight,
                                ParentEmail,
                                ParentFullName,
                                PerformancePeriodName,
                                SystemNote,
                                SystemNoteScale,
                                UserEmail,
                                UserEmployeeNo,
                                UserFullName,
                                UserPosition
                            })

                        }}
                    />


                ]
            },
        },
        {
            field: "UserEmployeeNo",
            headerName: "User No",
            minWidth: 80,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "UserFullName",
            headerName: "Personel",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "UserPosition",
            headerName: "Pozisyon",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "Department",
            headerName: "Departman",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "ParentFullName",
            headerName: "Yönetici",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "PerformancePeriodName",
            headerName: "Performans Dönemi",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "FinalScore",
            headerName: "Yönetici Puanı",
            minWidth: 130,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "FinalScoreScale",
            headerName: "Yönetici Değerlendirme",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "SystemNote",
            headerName: "Sistem Puanı",//ismi sistem puanı olacak
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        
        {
            field: "ObjectivePeriodsAvg",
            headerName: "OKR Notu",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "CompetencePeriodsAvg",
            headerName: "Yetkinlik Değerlendirme Notu",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "ManagerComment",
            headerName: "Yönetici Açıklama",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },


    ];


    return (
        <div>

            <Box p={5}>
                <DataGrid
                    columns={dataGrid_Columns}
                    rows={byOkrPerformance}
                    //byOkrPerformance datası içerisinde bir id değeri olmadığı için getRowId={(row)=>row.UserEmployeeNo} işlemi yaparak UserEmployeeNo bilgisi id olarak kullanıldı
                    getRowId={(row) => row.UserEmployeeNo}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 75, 100]}
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

export default PerformanceResult_Table_BY_OKR