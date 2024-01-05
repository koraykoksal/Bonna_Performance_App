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
          standartRaise,
          performanceRaise,
          raiseYear,
          raiseDetail,

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
                standartRaise,
                performanceRaise,
                raiseYear,
                raiseDetail,
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
                createdDate,
                standartRaise,
                performanceRaise,
                raiseYear,
                raiseDetail,
                type: "raise" //delete modal da type bilgisine göre kontrol et ve silme işlemini öyle yap
              })
            }}

          />,

        ]
      },
    },

    {
      field: "standartRaise",
      headerName: "Standart Zam Oranı",
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "performanceRaise",
      headerName: "Performans Zam Oranı",
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