import { useEffect } from "react";
import { useSelector } from "react-redux";
import {Navigate, useNavigate} from "react-router-dom"

const ProtectedRoute = ({children}) =>{
    const {isLoggedIn, user} = useSelector((state) => state.auth)
    console.log(user)
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !user) {
             navigate("/login")
        }
    },[isLoggedIn])
 
    return children;
}

export default ProtectedRoute;