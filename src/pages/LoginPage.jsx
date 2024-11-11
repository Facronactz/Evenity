import {setupAxios} from "@/config/axiosConfig";
import {login} from "@/redux/slice/authSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form"; // Import useForm dari react-hook-form
import illustration from "../assets/login-ilustration.png";

const LoginPage = () => {
    setupAxios();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoggedIn, user, error} = useSelector((state) => state.auth);

    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        if (isLoggedIn && user) navigate("/dashboard");
    }, [isLoggedIn, navigate, user]);

    const handleLogin = (data) => {
        try {
            dispatch(login(data));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="bg-[#00AA55] h-[100vh] overflow-hidden">

                <div className="w-full grid grid-cols-3 min-h-screen">
                    <div className="col-span-2 flex justify-center items-center">
                        <img src={illustration} className="w-[60%] object-cover"/>
                    </div>
                    <div
                        className="w-full p-12 bg-white border border-gray-200 rounded-3xl shadow flex flex-col gap-8 justify-center items-center">
                        <h1 className="text-6xl font-bold">Evenity</h1>
                        <form className="space-y-6 mb-10 w-[90%]"
                              onSubmit={handleSubmit(handleLogin)}> {/* Mengganti handleLogin dengan handleSubmit */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-black"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {required: "Email is required"})}
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-white text-black"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-black"
                                >
                                    Your password
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {required: "Password is required"})}
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 text-black"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-[#00AA55]  hover:bg-[#00F279]/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Login to your account
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default LoginPage;