import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { setupAxios } from './config/axiosConfig'

const App = () => {

  setupAxios();


  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default App