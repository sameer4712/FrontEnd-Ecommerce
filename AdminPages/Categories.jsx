
import AdminLayout from '../Layout/AdminLayout'
import api from '../Global/Axios'
import { useEffect, useState } from 'react'

function Categories() {
    const [category, setcategory] = useState([])
    useEffect(() => {
        GetCategory()
    }, [])
    async function GetCategory() {
        try {
            const AllCategory = await api.get('/admin/category')
            setcategory(AllCategory.data.category)
            console.log(AllCategory);
            
        }
        catch (err) {
            console.log(err);

        }

    }
    return (
        <AdminLayout>
            <div className=" m-8 shadow-2xl  ">
                <table className="min-w-full bg-[#FAF7F3] ">
                    <thead className="bg-green-500">
                        <tr className='text-[1.3rem]'>
                            <th className="py-3 px-4 border">_Id</th>
                            <th className="py-3 px-4 border">Name</th>
                            <th className="py-3 px-4 border">Description</th>
                            <th className="py-3 px-4 border">Action</th>
                        </tr>
                    </thead>
                    <tbody className='font-semibold text-[1.2rem]'>
                        {category.map((item, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-gray-100 transition duration-200 hover:scale-101"
                            >
                                <td className="py-3 px-4 border">{index + 1}</td>
                                <td className="py-3 px-4 border">{item.name}</td>
                                <td className="py-3 px-4 border text-[1.1rem] max-w-[250px] truncate">
                                    {item.description}
                                </td>
                                <td className="py-6 px-3 border-b-1 flex flex-col gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                        Delete
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

export default Categories