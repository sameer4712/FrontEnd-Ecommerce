import AdminLayout from "../Layout/AdminLayout"
import api from "../Global/Axios"
import { useEffect, useState } from "react"

function AdminUsers() {
    const [user, setuser] = useState([])
    useEffect(() => {
        GetUsers()
    }, [])
    async function GetUsers() {
        const users = await api.get('admin/users')
        setuser(users.data)
        console.log(users);

    }
    return (
        <AdminLayout>

            <div className=" m-9 shadow-2xl rounded-lg ">
                <table className="min-w-full bg-[#FAF7F3] border border-gray-300">
                    <thead className="bg-green-500 text-[1.3rem]">
                        <tr>
                            <th className="py-2 px-3 border">_Id</th>
                            <th className="py-2 px-3 border">Image</th>
                            <th className="py-2 px-3 border">Name</th>
                            <th className="py-2 px-3 border">Email</th>
                            <th className="py-2 px-3 border">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {user.map((item, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-gray-100 transition duration-200 hover:scale-101 text-[1.1rem] font-semibold"
                            >
                                <td className="py-2 px-3 border">{index + 1}</td>
                                <td className="p-6 border">
                                    <img
                                        className="w-[8rem] h-[6rem] object-cover rounded-md"
                                        src={`http://localhost:3200/${item.image}`}
                                        alt={item.name}
                                    />
                                </td>
                                <td className="py-2 px-3 border">{item.name}</td>
                                <td className="py-2 px-3 border">{item.email}</td>
                                <td className="py-9 border-b-1 gap-2">
                                    <button className="bg-red-500 text-white p-5  py-3 rounded hover:bg-red-600">
                                        Inactive
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default AdminUsers