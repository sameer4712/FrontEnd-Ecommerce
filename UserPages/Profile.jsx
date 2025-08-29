import { useEffect, useState } from "react"
import api from "../Global/Axios"
import { useNavigate } from "react-router-dom"
import UserLayout from "../Layout/UserLayout"
import Footer from "../src/Components/Footer"

function Profile() {
    const [data, setdata] = useState('')
    const [show, setshow] = useState(false)
    const navigate = useNavigate()

    const [oldname, setoldname] = useState('')
    const [oldemail, setoldemail] = useState('')
    const [oldimage, setoldimage] = useState('')
    const [id, setid] = useState('')

    useEffect(() => {
        Getuser()

    }, [])

    async function Getuser() {
        const user = await api.get('/user/GetUser')
        setdata(user.data)
        console.log(user.data);
    }

    async function UpdateUser() {
        const Data = new FormData()
        if (oldimage) Data.append('image', oldimage)
        Data.append('name', oldname)
        Data.append('email', oldemail)

        await api.put(`/user/Edit/${id}`, Data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        alert('Profile Updated ✅')
        Getuser()
    }

    return (
        <UserLayout>
            <div className="flex flex-col items-center justify-center ">
                <div className="flex flex-col justify-center items-center min-h-screen gap-4 mt-7">
                    <img className="w-[17rem] rounded-2xl" src={`http://localhost:3200/${data.image}`} alt="" />
                    <h2 className="font-bold text-xl font-mono ">Name: {data.name}</h2>
                    <h2 className="font-bold text-xl font-mono">Email: {data.email}</h2>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer" onClick={() => {
                        setshow(true)
                        setid(data._id)
                        setoldname(data.name)
                        setoldemail(data.email)
                        setimage(null)
                    }

                    }>Edit Profile</button>
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer" onClick={() => navigate('/user/order')}>Order History</button>
                </div>


                {show && (
                    <div className="absolute top-49 right-40">
                        <div className="bg-white p-8 rounded-2xl shadow-md w-96 ">
                            <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                                required name="name"
                                value={oldname} onChange={(e) => { setoldname(e.target.value) }}
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                                required name="email"
                                value={oldemail} onChange={(e) => { setoldemail(e.target.value) }}
                            />


                            <input
                                type="file"
                                accept="image/*" name="image"
                                className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
                                onChange={(e) => { setoldimage(e.target.files[0]) }}
                            />

                            <button onClick={() => { UpdateUser(id); setshow(false) }}
                                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 mt-3 transition-all duration-150 cursor-pointer"
                            >
                                Update
                            </button>
                        </div>

                        <h1 className="text-2xl absolute top-2 right-4 bg-amber-50 p-1 rounded-2xl cursor-pointer text-red-500" onClick={() => setshow(false)}>X</h1>
                    </div>

                )}
            </div>
            <Footer />
        </UserLayout>



    )
}

export default Profile