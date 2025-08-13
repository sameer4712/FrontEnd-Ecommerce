import { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import api from "../Global/Axios";
import Button from "../src/Components/button";

function Products() {
  const [Product, setProduct] = useState([]);
  const [show, setshow] = useState(false)
   const [image, setimage] = useState("")
   const [name, setname] = useState("")
   const [price, setprice] = useState("")
   const [stock, setstock] = useState("")
   const [description, setdescription] = useState("")
   const [category, setcategory] = useState("")

  useEffect(() => {
    GetProduct();
  }, []);

  async function GetProduct() {
    try {
      const productList = await api.get("/admin/products");
      setProduct(productList.data);
      console.log(productList);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AdminLayout>
      <Button name="Add product" onClick={() => { setshow(true) }} />
      <div className=" mx-6 shadow-2xl rounded-lg ">
        <table className="min-w-full bg-[#FAF7F3]">
          <thead className="bg-green-500">
            <tr className="text-[1.2rem]">
              <th className="py-3 px-4 border">_Id</th>
              <th className="py-3 px-4 border">Image</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Price</th>
              <th className="py-3 px-4 border">Stock</th>
              <th className="py-3 px-4 border">Category</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-[1.1rem]">
            {Product.map((item, index) => (
              <tr
                key={index}
                className="text-center hover:bg-gray-100 transition duration-200 hover:scale-101"
              >
                <td className="py-3 px-4 border">{index + 1}</td>
                <td className="py-3 px-4 border">
                  <img
                    className="w-[8rem] h-[6rem] object-cover rounded-md"
                    src={`http://localhost:3200/${item.image}`}
                    alt={item.name}
                  />
                </td>
                <td className="py-3 px-4 border">{item.name}</td>
                <td className="py-3 px-4 border">₹{item.price}</td>
                <td className="py-3 px-4 border">{item.stock}</td>
                <td className="py-3 px-4 border w-[100px]">{item.category}</td>
                <td className="py-3 px-4 border text-sm w-[250px] truncate">
                  {item.description}
                </td>
                <td className="py-6 px-8 border-b-1 flex flex-col gap-2">
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

      {show && (
        <div>
          <div>
            <div className='bg-gray-100 flex flex-col w-[29rem] h-[37rem] p-9 border-1 border-gray-500 rounded-2xl absolute top-17 right-120'>
              <h1 className='text-center mb-10 text-3xl font-bold'>Add Product</h1>
              <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded' />
              <input type="text" value={price} onChange={(e) => setprice(e.target.value)} placeholder='Price' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
              <input type="number" value={stock} onChange={(e) => setstock(e.target.value)} placeholder='Stock' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
              <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Description' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
              <input type="file" value={image} onChange={(e) => setimage(e.target.files[0 ])} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded mt-5' />
              <div className='flex justify-center gap-15 mt-14'>
                <button onClick={() => EditProduct()} className='font-medium bg-green-400 px-5 py-3 rounded-lg hover:bg-green-500 cursor-pointer transition-all duration-150 ease-in-out'>Submit</button>
                <button onClick={() => setshow(false)} className='font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition-all duration-150 ease-in-out'>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Products;
