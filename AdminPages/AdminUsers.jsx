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
    async function ActiveUser(id, status) {
        try {
            console.log(id);
            await api.put(`/admin/EditUser/${id}`, { Status: status })
            GetUsers()
        }
        catch (err) {
            console.log(err);
        }
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
                                <td className="border py-3">
                                    <img
                                        className="w-[10rem] h-[7rem]  object-cover  mx-auto"
                                        src={`http://localhost:3200/${item.image}`}
                                        alt={item.name}
                                    />
                                </td>
                                <td className="py-2 px-3 border">{item.name}</td>
                                <td className="py-2 px-3 border">{item.email}</td>
                                <td className="border-b-1 gap-2">
                                    <button
                                        onClick={() => {
                                            ActiveUser(item._id, !item.isActive); console.log(user);
                                        }}
                                        className={`text-white text-2xl px-6 py-3 rounded hover:opacity-90 transition ${item.isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                                            }`}
                                    >
                                        {item.isActive ? "Active" : "Inactive"}
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