
import { useEffect, useState } from 'react'
import AdminLayout from '../Layout/AdminLayout'
import api from '../Global/Axios'

function OrderList() {
    const [order, setorder] = useState([])
    const [change, setchange] = useState(false)
    const [ship, setship] = useState("")
    const [id, setid] = useState("")


    useEffect(() => {
        GetOrder()
    }, [])


    async function GetOrder() {
        const orders = await api.get("/admin/Order");
        setorder(orders.data)
        console.log(orders);
    }

    async function ChangeStatus() {
        const status = await api.put(`/admin/editStatus/${id}`, { deliveryStatus: ship })
        GetOrder()
        setchange(false)
    }

    return (
        <AdminLayout>

            <div className='p-9 py-10'>
                <table className="min-w-full bg-[#FAF7F3] ">
                    <thead className="bg-gray-600">
                        <tr className="text-[1.2rem] text-white border-2 border-black">
                            <th className="py-3 px-4 border-black">No</th>
                            <th className="py-3 px-4 border-black">UserName</th>
                            <th className="py-3 px-4 border-black">ProdutName</th>
                            <th className="py-3 px-4 border-black">Quantity</th>
                            <th className="py-3 px-4 border-black">Subtotal</th>
                            <th className="py-3 px-4 border-black">Total</th>
                            <th className="py-3 px-4 border-black">Shipping Status</th>
                            <th className="py-3 px-4 border-black">Change Status</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-[1.1rem]">
                        {order.map((item, index) => (
                            <tr
                                key={index}
                                className="text-center hover:bg-gray-100 transition duration-200 hover:scale-101"
                            >
                                <td className="py-3 px-4 border">{index + 1}</td>
                                <td className="py-3 px-4 border">{item.UserName}</td>
                                <td className="py-3 px-4 border">{item.items.map((ite, ind) => (
                                    <p key={ind} className='my-2'>{ite.productName}</p>
                                ))}</td>
                                <td className="py-3 px-4 border">{item.items.map((ite, ind) => (
                                    <p key={ind} className='my-2'>{ite.quantity}</p>
                                ))}</td>
                                <td className="py-3 px-4 border w-[100px]">{item.items.map((ite, ind) => (
                                    <p key={ind} className='my-2'>{ite.subtotal}</p>
                                ))}</td>
                                <td className="py-3 px-4 border text-l w-[150px] truncate">
                                    {item.total}
                                </td>
                                <td className="py-3 px-4 border text-l w-[200px] truncate">
                                    {item.deliveryStatus}
                                </td>
                                <td className="p-11 border-b-1 flex flex-col gap-2">
                                    <button disabled={item.deliveryStatus == "Delivered"} className="bg-blue-500 text-white px-2 py-3 rounded hover:bg-blue-600 cursor-pointer" onClick={() => { setchange(true); setid(item._id); }}>
                                        Change
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {change && (
                    <div className='flex flex-col justify-center items-center bg-blue-200 w-[23rem] h-[17rem] absolute top-23 right-20 rounded-2xl shadow-2xl'>
                        <h2 className='font-bold text-2xl mb-3 mt-1'>Change Order Status</h2>
                        <div className='flex flex-col font-medium text-xl '>
                            <div >
                                <label className='pr-5'>Pending</label>
                                <input type="radio" name='status' value="Pending" onChange={(e) => { setship(e.target.value) }} />
                            </div>
                            <div>
                                <label className='pr-5'>Shipped</label>
                                <input type="radio" name='status' value="Shipped" onChange={(e) => { setship(e.target.value) }} />
                            </div>
                            <div>
                                <label className='pr-3 '>Delivered</label>
                                <input type="radio" name='status' value="Delivered" onChange={(e) => { setship(e.target.value) }} />
                            </div>
                        </div>

                        <div className='font-bold flex gap-6 mt-5'>
                            <button className='text-xl bg-green-400 px-3 py-3 rounded-xl hover:bg-green-500 scale-105 transition-all duration-200 ease-in-out' onClick={() => ChangeStatus()}>Submit</button>
                            <button className='text-xl bg-red-400 px-3 py-3 rounded-xl hover:bg-red-500 scale-105 transition-all duration-200 ease-in-out' onClick={() => setchange(false)}>Close</button>
                        </div>


                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default OrderList