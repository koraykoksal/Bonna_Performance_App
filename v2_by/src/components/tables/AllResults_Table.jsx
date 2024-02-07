import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";


const AllResults_Table = ({myCalculatedData,combinedData}) => {

    const dataGrid_Columns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 50,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "sicilNo",
            headerName: "Sicil No",
            minWidth: 80,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "iseGirisTarih",
            headerName: "İşe Giriş Tarihi",
            minWidth: 110,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "lokasyon",
            headerName: "Çalışma Yeri",
            minWidth: 110,
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
            field: "ustBirim",
            headerName: "Üst Birim",
            minWidth: 190,
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
            headerName: "Bölüm",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "gorev",
            headerName: "Görev",
            minWidth: 190,
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
            field: "grup",
            headerName: "Personel Durumu",//ismi sistem puanı olacak
            minWidth: 130,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "skala",
            headerName: "Skala",
            minWidth: 80,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "final_degerlendirmeSonucu",
            headerName: "Değerlendirme Puanı",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "final_degerlendirmeAciklamasi",
            headerName: "Değerlendirme Açıklaması",
            minWidth: 200,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "standartZam",
            headerName: "Standart Zam", // ismi yönetici puanı olacak
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "performansZam",
            headerName: "Performans Zam", // ismi okr notu olacak
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "kidemOrani",
            headerName: "Kıdem Oranı", // ismi okr notu olacak
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "toplamZam",
            headerName: "Toplam Zam",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "currentSallary",
            headerName: "Mevcut Ücret",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "eklenenUcret",
            headerName: "Eklenen Ücret",
            minWidth: 180,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "yeniUcret",
            headerName: "Yeni Ücret",
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
                    rows={combinedData}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5,10, 25, 50, 75, 100]}
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

export default AllResults_Table