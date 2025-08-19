import { useState } from "react"
import api from "../Global/Axios"
import { useNavigate } from "react-router-dom"



function AdminLogin() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [err, seterr] = useState("")
    const navigate = useNavigate("")
    async function HandleAdmin() {
        try {
            const datas = {
                email: email,
                password: password
            }
            const admin = await api.post('/admin/Login', datas)
            if (admin.data.success) {
                localStorage.setItem('admin', true)
                navigate('/admin/dashboard')
            }
            else{
                 seterr(admin.data.message)
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='h-screen w-screen flex justify-center items-center px-4 bg-gradient-to-r from-blue-400 via-gray-200'>
            
            <div className='flex flex-col gap-3 bg-white rounded-2xl w-[32rem] h-[30rem] max-w-md p-6 sm:p-8 space-y-6 shadow-md justify-center border-1 border-gray-400'>
                {err && <p className="text-xl font-mono text-red-600 text-center ">{err}</p>}
                <h2 className="font-bold text-3xl text-center text-gray-700">Admin Login</h2>
                <div className='flex flex-col px-[10%]'>
                    <label className=' mb-1 font-semi-bold text-xl'>Email ID</label>
                    <input type="text" value={email} className='border border-gray-300 focus:outline-none focus:ring-1  focus:ring-indigo-500 py-2' onChange={(e) => { setemail(e.target.value) }} />
                </div>
                <div className='flex flex-col  px-[10%]'>
                    <label className=' mb-1 text-xl font-semi-bold'>Password</label>
                    <input value={password} type="password" className='border border-gray-300 focus:outline-none focus:ring-1  focus:ring-indigo-500  p-2 rounded' onChange={(e) => { setpassword(e.target.value) }} />
                </div>
                <div className='flex flex-col px-[10%] mt-4'>
                    <button className=' bg-green-500 text-white font-semi-bold text-xl px-2 py-3 rounded-2xl hover:scale-105 transition-colors duration-150  cursor-pointer' onClick={() => HandleAdmin()}>Log In</button>
                </div>

            </div>

        </div>

    )
}

export default AdminLogin