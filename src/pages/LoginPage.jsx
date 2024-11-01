import React from 'react'

const LoginPage = () => {
  return (
    <div className='w-full h-screen'>
        <div className='container max-w-screen-xl mx-auto flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-xl pb-20 pt-24 px-20 bg-[#EDEDED] rounded-[30px]'>
                <h1 className='text-center text-6xl mb-20 font-bold'>Login</h1>
                <div className='mb-4 flex flex-col gap-2'>
                    <h1 className='text-gray-600 text-xl'>Username</h1>
                    <input className='w-full h-[32px] py-6 px-4 border border-gray-200 rounded-lg' placeholder='Enter your username' type="text" />
                </div>
                <div className='mb-4 flex flex-col gap-2'>
                    <h1 className='text-gray-600 text-xl'>Password</h1>
                    <input className='w-full h-[32px] py-6 px-4 border border-gray-200 rounded-lg' placeholder='Enter your password' type="password" />
                </div>
                <button className='w-full bg-[#00AA55] text-white py-3 rounded-[30px] mt-12 font-bold text-2xl'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage