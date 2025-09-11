import { useState, useEffect } from "react"
import api from "../Global/Axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function UserLogin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [err, seterr] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        const loggedIn = JSON.parse(localStorage.getItem("user"))
        if (loggedIn == true) {
            navigate("/")
        }
    }, [])

    async function UserLogin() {
        try {
            const info = {
                email: email,
                password: password
            }

            const user = await api.post('/user/Login', info)
            if (user.data.success) {
                localStorage.setItem('user', JSON.stringify(true))
                navigate('/')
            }
            else {
                seterr(user.data.message)
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <div className='h-screen w-screen flex justify-center items-center px-4 bg-gradient-to-r from-blue-400 via-gray-200'>
                <div className='flex flex-col gap-3 bg-white rounded-2xl w-[32rem] h-[36rem] max-w-md p-6 sm:p-8 space-y-6 hadow-md justify-center border-1 border-gray-400'>
                    {err && <p className="text-xl font-mono text-red-600 text-center pt-5">{err}</p>}
                    <h2 className="font-bold text-3xl text-center text-gray-700 ">User Login</h2>
                    <div className='flex flex-col px-[10%]'>
                        <label className=' mb-1 font-semi-bold text-xl'>Email ID</label>
                        <input type="text" value={email} className='border border-gray-300 focus:outline-none focus:ring-1  focus:ring-indigo-500 py-2' onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    <div className='flex flex-col  px-[10%]'>
                        <label className=' mb-1 text-xl font-semi-bold'>Password</label>
                        <input type="password" value={password} className='border border-gray-300 focus:outline-none focus:ring-1  focus:ring-indigo-500  p-2 rounded' onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div className='flex flex-col px-[10%] mt-4'>
                        <button className=' bg-green-500 text-white font-semi-bold text-xl px-2 py-3 rounded-xl hover:scale-105 transition-all duration-150 cursor-pointer' onClick={() => UserLogin()}>Log In</button>
                    </div>
                    <div className="flex items-center justify-center py-3 gap-3 font-mono">

                        <p className="text-lg"> Don't have an Account ?</p>

                        <Link to='/user/sign-up'>
                            <p className="text-lg  text-blue-800 cursor-pointer underline" >Sign-Up</p>
                        </Link>

                    </div>
                </div>



            </div>


        </div>
    )
}

export default UserLogin