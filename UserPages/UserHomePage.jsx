
import { useEffect, useState } from "react"
import UserLayout from "../Layout/UserLayout"
import Brand from '../src/assets/brand.jpg'
import api from "../Global/Axios"
import { Navigate, useNavigate } from "react-router-dom"


function UserHomePage() {
  const [product, setproducts] = useState([])
  const navigate = useNavigate('')

  useEffect(() => {
    GetProduct()
  }, [])

  async function GetProduct() {
    const pro = await api.get('/user/products')
    setproducts(pro.data)
  }

  return (
    <UserLayout>
      <div className="w-full flex justify-between ">
        <div className="w-full bg-[#f2f0f1] text-center flex justify-center items-center flex-col">
          <h1 className="text-6xl font-extrabold mb-3">FIND CLOTHES <br />THAT MATCHES <br />YOUR STYLE</h1>
          <p className="text-[13px] text-gray-500 font-extralight">Browse through our range of meticulously crafted garments,designed to bring out your individuality and cater to your sense of style</p>
          <button className="text-l mt-5 bg-black text-white p-4 rounded-2xl">Shop Now </button>
          <div className="flex gap-19 mt-7 text-xl font-mono text-gray-600">
            <div className="flex flex-col">
              <span>100+</span>
              <span>International Brands</span>
            </div>

            <div className="flex flex-col">
              <span>1000+</span>
              <span>High Quality Products</span>
            </div>

            <div className="flex flex-col">
              <span>200+</span>
              <span>Daily Users</span>
            </div>

          </div>
        </div>
        <div>
          <img src={Brand} alt="" className="w-[39rem] object-cover" />
        </div>
      </div>

      <h1 className="text-5xl font-bold text-center mt-10 text-gray-700 font-serif" >Our Products</h1>

      <div className="flex justify-around mt-10 p-6 gap-4 cursor-pointer" >
        {product.map((item, index) => (
          <div key={index} className="text-center text-xl gap-5" onClick={() => { navigate(`/Product/${item._id}`) }} >
            <img src={"http://localhost:3200/" + item.image} alt="" className="w-full h-[20rem] rounded-l" />
            <p className="font-bold text-2xl mt-3">{item.name}</p>
            <p className="font-medium text-gray-600 mt-1">${item.price} </p>
            <p className="font-serif text-2xl mt-3">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="bg-black text-white px-6 py-4 rounded-2xl text-l cursor-pointer font-mono">View All</button>
      </div>


    </UserLayout>
  )
}

export default UserHomePage