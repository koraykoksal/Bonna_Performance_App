import React from 'react'
import { useState,useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";


const Settings_Table = ({raiseData}) => {

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
      field: "managerRaise",
      headerName: "Yönetici Zam Oranı",
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


  const [data, setData] = useState([])

  useEffect(() => {
    
    const res = Object.keys(raiseData).map(key=>({id:key,...raiseData[key]}))
    setData(res)

  }, [raiseData])
  



  return (
    <div>
      <Box p={5}>
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

export default Settings_Table