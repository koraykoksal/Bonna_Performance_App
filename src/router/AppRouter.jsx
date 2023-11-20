import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import NavBars from '../components/NavBars'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'

import { NotFound } from '../pages/NotFound'
import { BrowserRouter } from 'react-router-dom'



export const AppRouter = () => {
  return (

    <>
    <BrowserRouter>
    <NavBars/>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>

    </>
  )
}
