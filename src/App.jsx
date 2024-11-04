import React from 'react'
import Navbar from './components/Navbar'
import {Outlet} from 'react-router-dom'
import {setupAxios} from './config/axiosConfig'

const App = () => {

    const token = localStorage.getItem("token");
    if (token) {
        setupAxios(token);
    }


    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default App