
import AdminLayout from '../Layout/AdminLayout'
import api from '../Global/Axios'
import { useEffect, useState } from 'react'
import Button from '../src/Components/button'

function Categories() {
    const [category, setcategory] = useState([])
    const [addcategory, setaddcategory] = useState(false)
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [editcategory, seteditcategory] = useState(false)
    const [oldName, setoldName] = useState("")
    const [oldDescription, setoldDescription] = useState("")
    const [id, setid] = useState("")
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
    async function SubmitAdd() {
        const UpdateCategory = await api.post('/admin/addcategory', { name: name, description: description })
        console.log(UpdateCategory)
        GetCategory()
        setaddcategory(false)
        setname('')
        setdescription("")
    }
    async function RemoveCategory(index) {
        const Remove = await api.delete(`/admin/deletecategory/${index}`)
        GetCategory()

    }
    async function EditCategory()
    {
        const category = await api.put(`/admin/editcategory/${id}`,{name:oldName,description:oldDescription})
        GetCategory()
        seteditcategory(false)
    }

    return (
        <AdminLayout>
            <Button name="Add Category" onClick={() => setaddcategory(true)} />
            <div className=" mx-6 shadow-2xl  ">
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
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => {seteditcategory(true)
                                            setoldName(item.name)
                                            setoldDescription(item.description)
                                            setid(item._id)
                                        }}>
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => { RemoveCategory(item._id) }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {addcategory && (
                <div className='bg-gray-100 flex flex-col w-[27rem] h-[60vh] p-9 border-1 border-gray-500 rounded-2xl absolute top-20 right-130'>
                    <h1 className='text-center mb-10 text-3xl font-bold'>Add Category</h1>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded' />
                    <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Description' className='border-1 bg-white border-gray-500 p-3 mt-10 rounded' />
                    <div className='flex justify-center gap-12 mt-18'>
                        <button onClick={() => SubmitAdd()} className='font-medium bg-green-400 px-5 py-3 rounded-lg hover:bg-green-500 cursor-pointer transition-all duration-150 ease-in-out'>Submit</button>
                        <button onClick={() => setaddcategory(false)} className='font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition-all duration-150 ease-in-out'>Close</button>
                    </div>
                </div>

            )}
            {editcategory && (
                <div>
                    <div className='bg-gray-100 flex flex-col w-[27rem] h-[60vh] p-9 border-1 border-gray-500 rounded-2xl absolute top-20 right-130'>
                        <h1 className='text-center mb-10 text-3xl font-bold'>Edit Category</h1>
                        <input type="text" value={oldName} onChange={(e) => setoldName(e.target.value)} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded' />
                        <input type="text" value={oldDescription} onChange={(e) => setoldDescription(e.target.value)} placeholder='Description' className='border-1 bg-white border-gray-500 p-3 mt-10 rounded' />
                        <div className='flex justify-center gap-12 mt-18'>
                            <button onClick={() => EditCategory()} className='font-medium bg-green-400 px-5 py-3 rounded-lg hover:bg-green-500 cursor-pointer transition-all duration-150 ease-in-out'>Submit</button>
                            <button onClick={() => seteditcategory(false)} className='font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition-all duration-150 ease-in-out'>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}

export default Categories