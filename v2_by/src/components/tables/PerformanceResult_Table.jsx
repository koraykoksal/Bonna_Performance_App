import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { object } from 'prop-types';

const PerformanceResult_Table = ({ all_performanceData ,handleOpen,data}) => {


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
          createdDate,
          okudumAnladım,
          personelSonuc
        }
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<AiFillEdit size={25} style={{ color: 'darkorange', marginRight: 5 }} cursor='pointer' />}
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
                createdDate,
                okudumAnladım,
                personelSonuc
              })
            }}

          />,

          <GridActionsCellItem
            key={'show'}
            label='Show'
            icon={<FaEye size={23} style={{ cursor: 'pointer' ,color:'darkblue'}} />}
            onClick={()=>{
              handleOpen()

            }}
          />


        ]
      },
    },
    {
      field: "type",
      headerName: "Tip",
      minWidth: 190,
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
      minWidth: 190,
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
      field: "ustBirim",
      headerName: "Üst Birim",
      minWidth: 180,
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
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ1",
      headerName: "S1-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ2",
      headerName: "S2-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ3",
      headerName: "S3-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ4",
      headerName: "S4-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ5",
      headerName: "S5-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ6",
      headerName: "S6-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ7",
      headerName: "S7-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ8",
      headerName: "S8-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ9",
      headerName: "S9-Puan",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "yoneticiQ10",
      headerName: "S10-Puan",
      minWidth: 150,
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
      field: "yoneticiSonuc",
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


  // useEffect(() => {

  //   let dizi = []
  //   Object.values(all_performanceData).forEach(item => {

  //     if (typeof item == 'object' && item != null) {
  //       const result = Object.keys(item).map(key => { return { id: key, ...item[key] } })

  //       dizi.push(result)
  //       setperformanceData(result)
  //     }

  //   })

  // }, [all_performanceData])




  return (

    <div>
      <Box px={5} py={15}>
        <DataGrid
          columns={dataGrid_Columns}
          rows={data}
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