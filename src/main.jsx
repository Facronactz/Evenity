import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from "./routes/routes.jsx"
import {Provider} from 'react-redux'
import store from './redux/store'
import {setupAxios} from "@/config/axiosConfig.js";
import { Toaster } from 'react-hot-toast'

setupAxios()
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
        <Toaster/>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
