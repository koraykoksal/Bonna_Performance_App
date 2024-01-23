import React from 'react'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";


const Settings_Table = ({ data, setInfo, info, handleOpen, HandleOpen_delete }) => {


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
          raiseDetail,
          s1_byZam,
          s1_myZam,
          s1_perZam,
          s2_byZam,
          s2_myZam,
          s2_perZam,
          s3_byZam,
          s3_myZam,
          s3_perZam,
          s4_byZam,
          s4_myZam,
          s4_perZam,
          s5_byZam,
          s5_myZam,
          s5_perZam,

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
                createdDate,
                raiseYear,
                raiseDetail,
                s1_byZam,
                s1_myZam,
                s1_perZam,
                s2_byZam,
                s2_myZam,
                s2_perZam,
                s3_byZam,
                s3_myZam,
                s3_perZam,
                s4_byZam,
                s4_myZam,
                s4_perZam,
                s5_byZam,
                s5_myZam,
                s5_perZam,
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
                type: "raise" //delete modal da type bilgisine göre kontrol et ve silme işlemini öyle yap
              })
            }}

          />,

        ]
      },
    },

    {
      field: "s1_byZam",
      headerName: "1. Skala BY Zam Oranı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s1_myZam",
      headerName: "1. Skala MY Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s1_perZam",
      headerName: "1. Skala Prfm Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s2_byZam",
      headerName: "2. Skala BY Zam Oranı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s2_myZam",
      headerName: "2. Skala MY Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s2_perZam",
      headerName: "2. Skala Prfm Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s3_byZam",
      headerName: "3. Skala BY Zam Oranı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s3_myZam",
      headerName: "3. Skala MY Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s3_perZam",
      headerName: "3. Skala Prfm Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s4_byZam",
      headerName: "4. Skala BY Zam Oranı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s4_myZam",
      headerName: "4. Skala MY Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s4_perZam",
      headerName: "4. Skala Prfm Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s5_byZam",
      headerName: "5. Skala BY Zam Oranı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s5_myZam",
      headerName: "5. Skala MY Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "s5_perZam",
      headerName: "5. Skala Prfm Zam Oranı",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "raiseYear",
      headerName: "Zam Yılı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "raiseDetail",
      headerName: "Dönem",
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
          rows={data}
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

export default Settings_Table