import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './HomePage'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { AddCars } from './AddCars'
import { PrivateRoute } from './PrivateRoute'


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/add' element={
        <PrivateRoute>
          <AddCars />
        </PrivateRoute>
      } />
      <Route path='/edit/:id' element={<PrivateRoute>
        <AddCars />
      </PrivateRoute>} />
    </Routes>
  )
}
