import { setupAxios } from "@/config/axiosConfig";
import { login } from "@/redux/slice/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  setupAxios();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {isLoggedIn, user} = useSelector((state) => state.auth)

  console.log(user)

  useEffect(() => {
    if(isLoggedIn) navigate("/")
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (e) {}
  };

  return (
    <div className="w-full h-screen">
      <div className="container max-w-screen-xl mx-auto flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl pb-20 pt-24 px-20 bg-[#EDEDED] rounded-[30px]">
          <h1 className="text-center text-6xl mb-20 font-bold">Login</h1>
          <div className="mb-4 flex flex-col gap-2">
            <h1 className="text-gray-600 text-xl">Username</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-[32px] py-6 px-4 border border-gray-200 rounded-lg"
              placeholder="Enter your username"
              type="text"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <h1 className="text-gray-600 text-xl">Password</h1>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-[32px] py-6 px-4 border border-gray-200 rounded-lg"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <button
            className="w-full bg-[#00AA55] text-white py-3 rounded-[30px] mt-12 font-bold text-2xl"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
