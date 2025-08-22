import { useEffect, useState } from "react";
import api from "../Global/Axios";
import { useNavigate } from "react-router-dom";




function SignUp() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [image, setimage] = useState('')
    const navigate = useNavigate()



    async function UserRegister() {
        try {
            const Data = new FormData();
            Data.append('name', name);
            Data.append('email', email);
            Data.append('password', password);
            Data.append('image', image);

            const user = await api.post('/user/register', Data)
            console.log(user);
            
            if (user.data.success) {
                alert('User Registeration is Successfully...')
                navigate('/user/login')
            }
            console.log("user");
        }
        catch (err) {
            console.log(err);

        }

    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96 ">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                    required name="name"
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                    required name="email"
                    value={email} onChange={(e) => { setemail(e.target.value) }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                    required name="password"
                    value={password} onChange={(e) => { setpassword(e.target.value) }}
                />

                <input
                    type="file"
                    accept="image/*" name="image"
                    className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
                    onChange={(e) => { setimage(e.target.files[0]) }}
                />

                <button onClick={UserRegister}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 mt-3 transition-all duration-150 "
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignUp;
