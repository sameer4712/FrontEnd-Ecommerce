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
    // <UserLayout>
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">📦 My Orders</h1>

      {order.length > 0 ? (
        <ul className="space-y-3 absolute top-100">
          {order.map((item, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div >
                {item.items.map((it) => (
                  <div>
                    <p className="font-semibold">{it.productName}</p>
                    <p className="text-gray-600">₹{it.productPrice}</p>
                    <p className="text-gray-600">₹{it.quantity}</p>
                    <p className="text-gray-600">₹{it.subtotal}</p>
                  </div>

                ))}
              </div>
              <span className="text-gray-600"> Total:{item.total}</span>
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {item.deliveryStatus}
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {item.createdAt}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p >No orders found.</p>
      )}
    </div>
    // </UserLayout>
  )
}

export default Order