import { useEffect, useState } from "react"
import UserLayout from "../Layout/UserLayout"
import api from "../Global/Axios"

function Order() {

  const [order, setorder] = useState([])

  useEffect(() => {

    GetOrders()

  }, [])

  async function GetOrders() {
    const ListedOrder = await api.get('/user/Order')
    setorder(ListedOrder.data.order)
    console.log(ListedOrder.data.order);

  }


  return (
    <UserLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold  mb-11 mt-24 text-center text-gray-800">
          📦 My Orders
        </h1>

        {order.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {order.map((item, index) => (
              <div
                key={index}
                className="p-5 border border-gray-300 rounded-2xl shadow-md bg-white hover:scale-105 cursor-pointer transition-all ease-in-out "
              >
                <div className="space-y-4 mb-4">
                  {item.items.map((it, i) => (
                    <div key={i} className="border-b pb-2 flex flex-col gap-2">
                      <p className="font-bold text-2xl">{it.productName}</p>
                      <p className="text-gray-600 text-lg font-mono">₹ {it.productPrice}</p>
                      <p className="text-gray-700 text-base">Qnty: {it.quantity}</p>
                      <p className="text-blue-500 font-bold font-mono ">Subtotal: ₹ {it.subtotal}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">Status:</span>
                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">
                      {item.deliveryStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold text-md">Date:</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t pt-7">
                    <span className="text-2xl font-bold">Total:</span>
                    <span className="text-xl font-bold text-green-600">₹{item.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No orders found.</p>
        )}
      </div>
    </UserLayout>
  )
}

export default Order