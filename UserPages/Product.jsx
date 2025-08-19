import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../Global/Axios"

function Product() {

    const { id } = useParams()
    console.log(id)
    const [product, setproduct] = useState([])
    useEffect(() => {
        GetProduct()
    }, [])


    async function GetProduct() {
        const pro = await api.get(`/user/product/${id}`)
        setproduct(pro.data.product);
        console.log(pro.data.product);
        

    }

    return (
        <div className="flex items-center top-30 absolute left-50 p-10 rounded-xl gap-20">
            <div>
            <img src={"http://localhost:3200/" +product.image } alt="" className="w-[35rem] rounded  shadow-xl shadow-gray-300 p-7" />

            </div>
            <div>
            <p className="text-xl font-mono">{product.name}</p>
            <p className="text-xl font-mono mt-3">Price: ${product.price}</p>
            <p className="text-xl font-mono">{product.description}</p>


            </div>
        </div>
    )
}

export default Product