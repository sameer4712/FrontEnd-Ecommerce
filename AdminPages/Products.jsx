import { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import api from "../Global/Axios";

function Products() {
  const [Product, setProduct] = useState([]);

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
      <div className=" m-8 shadow-2xl rounded-lg ">
        <table className="min-w-full bg-[#FAF7F3] border border-gray-300">
          <thead className="bg-[#819067]">
            <tr>
              <th className="py-3 px-4 border">_id</th>
              <th className="py-3 px-4 border">Image</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Price</th>
              <th className="py-3 px-4 border">Stock</th>
              <th className="py-3 px-4 border">Category</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
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
                <td className="py-3 px-4 border">{item.category}</td>
                <td className="py-3 px-4 border text-sm max-w-[250px] truncate">
                  {item.description}
                </td>
                <td className="py-3 px-4 border flex flex-col gap-2">
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
    </AdminLayout>
  );
}

export default Products;
