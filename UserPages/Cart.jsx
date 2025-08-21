import { useEffect, useState } from "react";
import api from "../Global/Axios";
import UserLayout from "../Layout/UserLayout"
import { useNavigate } from "react-router-dom";


function Cart() {
    const user = localStorage.getItem('user')
    const [product, setproduct] = useState([])
    const [cartitems, setcartitems] = useState([])
    const navigate = useNavigate('')

    useEffect(() => {
        ShowCart()

    }, [])


    async function ShowCart() {
        const cart = await api.get('/user/cart')
        setproduct(cart.data.Cart[0]);
        setcartitems(cart.data.Cart[0].cartitems);
    }
    async function EditQuantity(_id, quantity) {
        if (quantity < 1) return;
        const Edit = await api.put(`/user/editCart/${_id}`, { quantity })
        ShowCart()
    }
    async function CheckOrder() {
        const order = await api.post('/user/CreateOrder')
        ShowCart()
    }
    async function DeleteOrder(_id) {
        const remove = await api.delete(`/user/deleteCart/${_id}`)
        ShowCart()

    }
    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center mt-7">
                <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg border border-gray-300">
                    <h1 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h1>

                    {cartitems && cartitems.length > 0 ? (
                        cartitems.map((item, key) => (
                            <div
                                key={key}
                                className="flex items-center justify-between border-b py-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={"http://localhost:3200/" + item.image}
                                        alt={item.name}
                                        className="w-44 h-28 rounded-md"
                                    />
                                    <div>
                                        <h2 className="font-semibold text-2xl">{item.name}</h2>
                                        <div className="flex mt-2">
                                            <label className="mt-2 font-medium">Qty:</label>
                                            <div className="flex">
                                                <button
                                                    className="ml-4 text-2xl cursor-pointer"
                                                    onClick={() =>
                                                        EditQuantity(item.productId, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                                <p className="text-gray-600 text-l mt-2 ml-4">
                                                    {item.quantity}
                                                </p>
                                                <button
                                                    className="ml-4 text-3xl cursor-pointer"
                                                    onClick={() =>
                                                        EditQuantity(item.productId, item.quantity - 1)
                                                    }
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="ml-20 cursor-pointer text-2xl text-red-400" onClick={() =>{ DeleteOrder(item.productId); window.location.reload()}}> x </button>
                                    <p className="font-semibold font-mono text-xl mt-5 ">
                                        {item.subtotal}
                                    </p>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col ">

                            <p className="text-gray-500 text-center text-xl py-10">
                                🛍️ Your cart is empty
                            </p>
                            <button onClick={()=>{navigate('/user/order')}} className="text-3xl bg-green-400 p-3 font-sans font-semibold rounded-xl hover:bg-green-500 transition-all duration-200 ease-in-out cursor-pointer py-5">View Order</button>
                        </div>
                    )}

                    {cartitems && cartitems.length > 0 && (
                        <>
                            <div className="flex justify-between items-center mt-6">
                                <h2 className="text-3xl font-bold ml-3">Total</h2>
                                <p className="text-2xl font-bold font-mono text-green-600 mr-8">
                                    {product.total}
                                </p>
                            </div>

                            <button
                                className="mt-6 bg-blue-500 text-white p-5 text-xl rounded-2xl hover:bg-blue-700 transition cursor-pointer"
                                onClick={() => { CheckOrder(); window.location.reload() }}
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </UserLayout>

    );
}

export default Cart