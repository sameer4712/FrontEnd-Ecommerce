import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../Global/Axios"
import UserLayout from "../Layout/UserLayout"
import Footer from "../src/Components/Footer"

function Product() {
    const [quantity, setquantity] = useState(1)
    const { id } = useParams()
    const [product, setproduct] = useState([])
    const navigate = useNavigate('')
    useEffect(() => {
        GetProduct()
    }, [id])


    async function GetProduct() {
        const pro = await api.get(`/user/product/${id}`)
        setproduct(pro.data.product);
    }

    async function AddToCart(_id) {
        const cart = await api.post(`/user/cart/${_id}`,{quantity})
        
    }

    return (
        <UserLayout>
            <div className="flex items-center top-30 absolute left-50 p-10 rounded-xl gap-20">
                <div>
                    <img src={"http://localhost:3200/" + product.image} alt="" className="w-[35rem] h-[23rem] rounded-xl  shadow-xl shadow-gray-300 p-7 object-cover" />
                </div>
                <div>
                    <p className="text-2xl font-mono">{product.name}</p>
                    <p className="text-2xl font-mono mt-3">Price: ${product.price}</p>
                    <div className="flex gap-18 mb-2 mt-2">
                        <label className="mt-11 text-2xl font-mono">Quantity</label>
                        <div>
                            <button className="text-3xl cursor-pointer" onClick={() => setquantity(quantity + 1)}>+</button>
                            <p className="text-2xl p-1 mt-1 font-mono">{quantity}</p>
                            <button className="text-4xl ml-1 cursor-pointer" onClick={() => setquantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                        </div>


                    </div>
                    <p className="text-2xl font-mono mt-2 mb-5">{product.description}</p>
                    <button onClick={() => {AddToCart(product._id); navigate('/user/cart')}} className="mt-8 bg-blue-300 shadow-xl p-5 text-gray-600 cursor-pointer rounded-xl text-xl font-semibold hover:bg-blue-400 hover:scale-110 transition-all duration-200 ease-in-out"> Add to Cart</button>
                </div>

            </div>

        </UserLayout>
    )
}

export default Product