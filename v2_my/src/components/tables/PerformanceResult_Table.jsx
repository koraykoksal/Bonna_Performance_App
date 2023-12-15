import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";



const PerformanceResult_Table = ({ handleOpen, setInfo }) => {

    const { all_performanceData } = useSelector((state) => state.performance)
    const [performanceData, setperformanceData] = useState([])


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
                    datetime,
                    okudumAnladım
                }
            }) => {
    return [
        <GridActionsCellItem
            key={"edit"}
            icon={<AiFillEdit size={25} style={{ color: 'darkorange' }} cursor='pointer' />}
            label="Edit"
            onClick={() => {
                handleOpen()
                setInfo({
                    id,
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
                    datetime,
                    okudumAnladım
                })
            }}

        />,
    ]
},
        },

{
    field: "personel",
        headerName: "Personel",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "sicilNo",
        headerName: "Sicil No",
            minWidth: 150,
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
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "birim",
        headerName: "Birim",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "bolum",
        headerName: "bölüm",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "ustBirim",
        headerName: "Üst Birim",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "yonetici",
        headerName: "Yönetici",
            minWidth: 150,
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
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q1Calisan",
        headerName: "S1-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q2Calisan",
        headerName: "S2-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q3Calisan",
        headerName: "S3-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q4Calisan",
        headerName: "S4-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q5Calisan",
        headerName: "S5-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q6Calisan",
        headerName: "S6-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q7Calisan",
        headerName: "S7-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q8Calisan",
        headerName: "S8-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q9Calisan",
        headerName: "S9-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "q10Calisan",
        headerName: "S10-Puan",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "tppCalisan",
        headerName: "Performans Puanı",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "calisanAciklama",
        headerName: "Çalışan Açıklama",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },
{
    field: "datetime",
        headerName: "Tarih",
            minWidth: 150,
                headerAlign: "center",
                    align: "center",
                        flex: 1,
        },


    ];


useEffect(() => {

    const dizi = Object.keys(all_performanceData).map(key => { return { id: key, ...all_performanceData[key] } })
    setperformanceData(dizi)
    console.log("dizi: ", dizi)
}, [all_performanceData])


return (
    <div>

        <Box px={5} py={15}>
            <DataGrid
                columns={dataGrid_Columns}
                rows={performanceData}
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

export default PerformanceResult_Table