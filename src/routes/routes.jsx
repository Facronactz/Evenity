import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import App from "../App"
import VendorPage from "../pages/VendorPage"

const router = createBrowserRouter([
    {
      path : "/",
      element : <App/>,
      children : [
        {
          path : "/vendor/approval",
          element : <VendorPage type={"approval"}/>
        }, {
          path : "/vendor/approved",
          element : <VendorPage type={"approved"}/>
        }
      ]
    },
    {
      path : "/login",
      element : <LoginPage/>
    }
  ])

  export default router