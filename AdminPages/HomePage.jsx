import { useEffect, useState } from "react"
import AdminLayout from "../Layout/AdminLayout"
import api from "../Global/Axios"

function HomePage() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        categories: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/admin/count");
                console.log("API Response:", res.data);
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);
    return (

        <AdminLayout>
            <div className="w-full p-6 mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 cursor-pointer">

                    <div className="bg-blue-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300  border-1 border-gray-400">
                        <h2 className="text-lg font-semibold">Total Products</h2>
                        <p className="text-3xl font-bold mt-2">{stats.products}</p>
                    </div>

                    <div className="bg-green-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300  border-1 border-gray-400">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-3xl font-bold mt-2">{stats.users}</p>
                    </div>

                    <div className="bg-purple-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300  border-1 border-gray-400">
                        <h2 className="text-lg font-semibold">Total Categories</h2>
                        <p className="text-3xl font-bold mt-2">{stats.categories}</p>
                    </div>

                    <div className="bg-pink-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300  border-1 border-gray-400">
                        <h2 className="text-lg font-semibold">Total Orders</h2>
                        <p className="text-3xl font-bold mt-2">{stats.orders}</p>
                    </div>

                </div>
            </div>



        </AdminLayout>





    )
}

export default HomePage