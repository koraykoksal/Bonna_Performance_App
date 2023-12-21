import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { BrowserRouter } from 'react-router-dom'
import { PrivateRouter } from './PrivateRouter'
import Dashboard from '../pages/Dashboard'
import AdminReport from '../pages/AdminReport'
import Report from '../pages/Report'
import MyReports from '../pages/myreports'
import ByReports from '../pages/ByReports'
import Settings from '../pages/Settings'



export const AppRouter = () => {
  return (

    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />} />

          <Route path='byperformance' element={<PrivateRouter />}>
            <Route path='' element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path='report' element={<Report/>}/>
              <Route path='myreports' element={<MyReports/>}/>
              <Route path='byreports' element={<ByReports/>}/>
              <Route path='adminreport' element={<AdminReport/>}/>
              <Route path='settings' element={<Settings/>}/>
            </Route>

          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}
