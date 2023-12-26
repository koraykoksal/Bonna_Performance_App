import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import useAuthCall from '../hooks/useAuthCall'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'

export const Login = () => {


  const [info, setInfo] = useState({
      username:"",
      password:""
  })

  const { login,get_managerPersonels } = useAuthCall()

  const handleChange=(e)=>{
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit=(e)=>{

    e.preventDefault()

    //login işlemi için çalıştırılan hook
    login(info)

    //login sonrası yöneticiye bağlı personellerin litesini çekmek için çalıştırılan hook
    get_managerPersonels(info)

    setInfo({
      username:"",
      password:""
    })
  }



  return (


    <Container sx={{ mt:15 }}>

      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          alignItems:'center',
          p: 2,
          gap:5,
        }}
      >


        <Grid item xs={10} sm={8} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

   
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} component='form' onSubmit={handleSubmit}>
            <TextField
            required
              label="Username"
              name="username"
              id="username"
              type="text"
              variant="outlined"
              value={info.username}
              onChange={handleChange}
            />
            <TextField
            required
              label="Password"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              value={info.password}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" >
              Submit
            </Button>

          </Box>



        </Grid>

        <Grid item xs={10} sm={8} md={5}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>

      </Grid>
    </Container>

  )

}
