import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {useEffect} from "react";

const ProtectedRoute = ({children}) => {
    const {isLoggedIn, user} = useSelector((state) => state.auth)
    console.log(user)
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/not-found");
        }
    }, [isLoggedIn, navigate])

    if (!isLoggedIn) {
        return null;
    }
    return children
}

export default ProtectedRoute;