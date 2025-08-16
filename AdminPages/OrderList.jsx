
import { useEffect, useState } from 'react'
import AdminLayout from '../Layout/AdminLayout'
import api from '../Global/Axios'

function OrderList() {
    const [order, setorder] = useState([])
    useEffect(() => {
        GetOrder()
    }, [])
    async function GetOrder() {
        const orders = await api.get("/admin/Order");
        setorder(orders.data)
        console.log(orders);

    }
    return (
        <AdminLayout>

            <div className='p-9'>
                <table className="min-w-full bg-[#FAF7F3] ">
                    <thead className="bg-green-500">
                        <tr className="text-[1.2rem]">
                            <th className="py-3 px-4 border">No</th>
                            <th className="py-3 px-4 border">UserName</th>
                            <th className="py-3 px-4 border">ProdutName</th>
                            <th className="py-3 px-4 border">Quantity</th>
                            <th className="py-3 px-4 border">Subtotal</th>
                            <th className="py-3 px-4 border">Total</th>
                            <th className="py-3 px-4 border">Shipping Status</th>
                            <th className="py-3 px-4 border">Change Status</th>
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
                                    <p key={ind}>{ite.productName}</p>
                                ))}</td>
                                <td className="py-3 px-4 border">{item.items.map((ite, ind) => (
                                    <p key={ind}>{ite.quantity}</p>
                                ))}</td>
                                <td className="py-3 px-4 border w-[100px]">{item.items.map((ite, ind) => (
                                    <p key={ind}>{ite.subtotal}</p>
                                ))}</td>
                                <td className="py-3 px-4 border text-l w-[150px] truncate">
                                    {item.total}
                                </td>
                                <td className="py-3 px-4 border text-l w-[200px] truncate">
                                    {item.deliveryStatus}
                                </td>
                                <td className="p-10 border-b-1 flex flex-col gap-2">
                                    <button className="bg-blue-500 text-white px-2 py-3 rounded hover:bg-blue-600">
                                        Change
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

export default OrderList