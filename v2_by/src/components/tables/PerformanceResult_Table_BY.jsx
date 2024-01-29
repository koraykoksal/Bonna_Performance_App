import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const PerformanceResult_Table_BY = ({ guncellenmisPerformanceData, handleOpen, info, setInfo, HandleOpen_delete }) => {


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
                    type,
                    personel,
                    sicilNo,
                    tcNo,
                    iseGirisTarih,
                    dogumTarih,
                    birim,
                    bolum,
                    ustBirim,
                    yonetici,
                    gorev,
                    currentSallary,
                    degerlendirmeYili,
                    degerlendirmeDonemiAciklama,
                    q1Calisan,
                    q2Calisan,
                    q3Calisan,
                    q4Calisan,
                    q5Calisan,
                    q6Calisan,
                    q7Calisan,
                    q8Calisan,
                    q9Calisan,
                    q10Calisan,
                    oypCalisan,
                    dypCalisan,
                    yypCalisan,
                    tppCalisan,
                    calisanAciklama,
                    degerlendirmeSonucu,
                    calisanDegerlendirmeYuzdesi,
                    createdDate,
                    okudumAnladım,
                    personelSonuc,
                    yoneticiQ1,
                    yoneticiQ2,
                    yoneticiQ3,
                    yoneticiQ4,
                    yoneticiQ5,
                    yoneticiQ6,
                    yoneticiQ7,
                    yoneticiQ8,
                    yoneticiQ9,
                    yoneticiQ10,
                    yoneticiAciklama,
                    yoneticiDegerlendirmeSonucu,
                    yoneticiDegerlendirmeYuzdesi,
                    yoneticiCreatedDate,
                    yoneticiOkudumAnladım,
                    yoneticiSonuc,
                    yoneticiDegerlendirmeYili,
                    yoneticiDegerlendirmeDonemiAciklama,
                    yoneticiOyp,
                    yoneticiDyp,
                    yoneticiYyp,
                    yoneticiTpp,
                    zamOrani_performans,
                    zamOrani_yonetici_ve_performans,
                    final_degerlendirmeSonucu,
                    final_degerlendirmeAciklamasi,

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
                                type,
                                personel,
                                sicilNo,
                                tcNo,
                                iseGirisTarih,
                                dogumTarih,
                                birim,
                                bolum,
                                ustBirim,
                                yonetici,
                                gorev,
                                currentSallary,
                                degerlendirmeYili,
                                degerlendirmeDonemiAciklama,
                                q1Calisan,
                                q2Calisan,
                                q3Calisan,
                                q4Calisan,
                                q5Calisan,
                                q6Calisan,
                                q7Calisan,
                                q8Calisan,
                                q9Calisan,
                                q10Calisan,
                                oypCalisan,
                                dypCalisan,
                                yypCalisan,
                                tppCalisan,
                                calisanAciklama,
                                degerlendirmeSonucu,
                                calisanDegerlendirmeYuzdesi,
                                createdDate,
                                okudumAnladım,
                                personelSonuc,
                                yoneticiQ1,
                                yoneticiQ2,
                                yoneticiQ3,
                                yoneticiQ4,
                                yoneticiQ5,
                                yoneticiQ6,
                                yoneticiQ7,
                                yoneticiQ8,
                                yoneticiQ9,
                                yoneticiQ10,
                                yoneticiAciklama,
                                yoneticiDegerlendirmeSonucu,
                                yoneticiDegerlendirmeYuzdesi,
                                yoneticiCreatedDate,
                                yoneticiOkudumAnladım,
                                yoneticiSonuc,
                                yoneticiDegerlendirmeYili,
                                yoneticiDegerlendirmeDonemiAciklama,
                                yoneticiOyp,
                                yoneticiDyp,
                                yoneticiYyp,
                                yoneticiTpp,
                                zamOrani_performans,
                                zamOrani_yonetici_ve_performans,
                                final_degerlendirmeSonucu,
                                final_degerlendirmeAciklamasi,
                            })

                        }}
                    />,
                    <GridActionsCellItem
                        key={"delete"}
                        icon={<MdDeleteForever size={25} style={{ color: 'darkred', marginRight: 5 }} cursor='pointer' />}
                        label="Del"
                        onClick={() => {
                            HandleOpen_delete()
                            setInfo({
                                id,
                                type:"manager-evaluation",
                                personel,
                                sicilNo,
                                tcNo,
                                iseGirisTarih,
                                dogumTarih,
                                birim,
                                bolum,
                                ustBirim,
                                yonetici,
                                gorev,
                                currentSallary,
                                degerlendirmeYili,
                                degerlendirmeDonemiAciklama,
                                q1Calisan,
                                q2Calisan,
                                q3Calisan,
                                q4Calisan,
                                q5Calisan,
                                q6Calisan,
                                q7Calisan,
                                q8Calisan,
                                q9Calisan,
                                q10Calisan,
                                oypCalisan,
                                dypCalisan,
                                yypCalisan,
                                tppCalisan,
                                calisanAciklama,
                                degerlendirmeSonucu,
                                calisanDegerlendirmeYuzdesi,
                                createdDate,
                                okudumAnladım,
                                personelSonuc,
                                yoneticiQ1,
                                yoneticiQ2,
                                yoneticiQ3,
                                yoneticiQ4,
                                yoneticiQ5,
                                yoneticiQ6,
                                yoneticiQ7,
                                yoneticiQ8,
                                yoneticiQ9,
                                yoneticiQ10,
                                yoneticiAciklama,
                                yoneticiDegerlendirmeSonucu,
                                yoneticiDegerlendirmeYuzdesi,
                                yoneticiCreatedDate,
                                yoneticiOkudumAnladım,
                                yoneticiSonuc,
                                yoneticiDegerlendirmeYili,
                                yoneticiDegerlendirmeDonemiAciklama,
                                yoneticiOyp,
                                yoneticiDyp,
                                yoneticiYyp,
                                yoneticiTpp,
                                zamOrani_performans,
                                zamOrani_yonetici_ve_performans,
                                final_degerlendirmeSonucu,
                                final_degerlendirmeAciklamasi,
                            })
                        }}

                    />,


                ]
            },
        },

        {
            field: "type",
            headerName: "Tip",
            minWidth: 50,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "personel",
            headerName: "Personel",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "sicilNo",
            headerName: "Sicil No",
            minWidth: 90,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "tcNo",
            headerName: "Tc No",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "iseGirisTarih",
            headerName: "İşe Giriş",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "lokasyon",
            headerName: "Çalışma Yeri",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "ustBirim",
            headerName: "Üst Birim",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "birim",
            headerName: "Birim",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "bolum",
            headerName: "bölüm",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "gorev",
            headerName: "Görev",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yonetici",
            headerName: "Yönetici",
            minWidth: 190,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        
        {
            field: "degerlendirmeYili",
            headerName: "Değerlendirme Yılı",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "degerlendirmeDonemiAciklama",
            headerName: "Değerlendirme Dönemi Aciklama",
            minWidth: 250,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ1",
            headerName: "S1-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ2",
            headerName: "S2-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ3",
            headerName: "S3-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ4",
            headerName: "S4-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ5",
            headerName: "S5-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ6",
            headerName: "S6-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ7",
            headerName: "S7-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ8",
            headerName: "S8-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ9",
            headerName: "S9-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiQ10",
            headerName: "S10-Puan",
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiTpp",
            headerName: "Performans Puanı",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "final_degerlendirmeAciklamasi",
            headerName: "Sonuç",
            minWidth: 200,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiAciklama",
            headerName: "Yönetici Açıklama",
            minWidth: 250,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yoneticiCreatedDate",
            headerName: "Tarih",
            minWidth: 190,
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
                    rows={guncellenmisPerformanceData}
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

export default PerformanceResult_Table_BY