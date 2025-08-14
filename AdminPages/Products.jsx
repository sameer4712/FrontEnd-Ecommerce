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
  const [getcategory, getsetcategory] = useState([])
  const [editshow, seteditshow] = useState(false)

  const [oldimage, setoldimage] = useState("")
  const [oldname, setoldname] = useState("")
  const [oldprice, setoldprice] = useState("")
  const [oldstock, setoldstock] = useState("")
  const [oldDescription, setoldDescription] = useState("")
  const [oldcategory, setoldcategory] = useState("")
  const [id, setid] = useState("")

  useEffect(() => {
    GetProduct();
  }, []);

  async function GetProduct() {
    try {
      const productList = await api.get("/admin/products");
      setProduct(productList.data);
      // console.log(productList);
    } catch (err) {
      console.error(err);
    }
  }

  async function GetAllCategory() {
    const cat = await api.get('/admin/category')
    console.log(cat.data.category);
    getsetcategory(cat.data.category)


  }


  async function AddProduct() {
    const formdata = new FormData()
    formdata.append('image', image)
    formdata.append('name', name)
    formdata.append('price', price)
    formdata.append('stock', stock)
    formdata.append('category', category)
    formdata.append('description', description)
    const addproduct = await api.post('/admin/AddProduct', formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })

    GetProduct()
    setshow(false)
    setname('')
    setimage('')
    setprice('')
    setstock('')
    setcategory('')
    setdescription('')

  }


  async function UpdatedProduct() {
    const formdata = new FormData()
    if (oldimage) {
      formdata.append('image', oldimage)
    }
    formdata.append('name', oldname)
    formdata.append('price', oldprice)
    formdata.append('stock', oldstock)
    formdata.append('category', oldcategory)
    formdata.append('description', oldDescription)

    console.log(id);


    const updated = await api.put(`/admin/updateProduct/${id}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })

    console.log(updated)
    GetProduct()
    seteditshow(false)
  }


  return (
    <AdminLayout>
      <Button name="Add product" onClick={() => { setshow(true); GetAllCategory() }} />
      <div className="px-8 mb-15">
        <table className="min-w-full bg-[#FAF7F3] ">
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
                  <button onClick={async () => {
                    await GetAllCategory()
                    seteditshow(true)
                    setoldimage(`${item.image}`)
                    setoldname(item.name)
                    setoldprice(item.price)
                    setoldstock(item.stock)
                    setoldDescription(item.description)
                    setid(item._id)
                  }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
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
            <div className='bg-gray-100 flex flex-col w-[29rem] h-[40rem] p-9 border-1 border-gray-500 rounded-2xl absolute top-10 right-115'>
              <h1 className='text-center mb-10 text-3xl font-bold'>Add Product</h1>
              <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded' />
              <input type="text" value={price} onChange={(e) => setprice(e.target.value)} placeholder='Price' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
              <input type="number" value={stock} onChange={(e) => setstock(e.target.value)} placeholder='Stock' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
              <div className="flex flex-col gap-2 mt-4 ml-1 text-gray-500">
                <label className="font-semibold text-l  text-gray-500 ">Category</label>
                <select value={category} onChange={(e) => setcategory(e.target.value)} className="w-[10rem] font-semibold p-2  text-gray-500" >
                  <option value="" >Select</option>
                  {getcategory.map((item, index) => (
                    <option value={item._id} key={index}>{item.name}</option>
                  ))

                  }
                </select>
              </div>
              <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Description' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
              <input type="file" onChange={(e) => setimage(e.target.files[0])} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded mt-5' />
              <div className='flex justify-center gap-15 mt-14'>
                <button onClick={() => AddProduct()} className='font-medium bg-green-400 px-5 py-3 rounded-lg hover:bg-green-500 cursor-pointer transition-all duration-150 ease-in-out'>Submit</button>
                <button onClick={() => setshow(false)} className='font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition-all duration-150 ease-in-out'>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editshow && (<div>
        <div>
          <div className='bg-gray-100 flex flex-col w-[29rem] h-[40rem] p-9 border-1 border-gray-500 rounded-2xl absolute top-10 right-115'>
            <h1 className='text-center mb-10 text-3xl font-bold'>Add Product</h1>
            <input type="text" value={oldname} onChange={(e) => setoldname(e.target.value)} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded' />
            <input type="text" value={oldprice} onChange={(e) => setoldprice(e.target.value)} placeholder='Price' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
            <input type="number" value={oldstock} onChange={(e) => setoldstock(e.target.value)} placeholder='Stock' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
            <div className="flex flex-col gap-2 mt-4 ml-1 text-gray-500">
              <label className="font-semibold text-l  text-gray-500 ">Category</label>
              <select value={oldcategory} onChange={(e) => setoldcategory(e.target.value)} className="w-[10rem] font-semibold p-2  text-gray-500" >
                <option value="" >Select</option>
                {getcategory.map((item, index) => (
                  <option value={item._id} key={index}>{item.name}</option>
                ))

                }
              </select>
            </div>
            <input type="text" value={oldDescription} onChange={(e) => setoldDescription(e.target.value)} placeholder='Description' className='border-1 bg-white border-gray-500 p-3 mt-5 rounded' />
            <input type="file" onChange={(e) => setoldimage(e.target.files[0])} placeholder='Name' className='border-1 bg-white border-gray-500 p-3 rounded mt-5' />
            <div className='flex justify-center gap-15 mt-14'>
              <button onClick={() => UpdatedProduct()} className='font-medium bg-green-400 px-5 py-3 rounded-lg hover:bg-green-500 cursor-pointer transition-all duration-150 ease-in-out'>Submit</button>
              <button onClick={() => seteditshow(false)} className='font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition-all duration-150 ease-in-out'>Close</button>
            </div>
          </div>
        </div>
      </div>
      )}


    </AdminLayout>
  );
}

export default Products;
