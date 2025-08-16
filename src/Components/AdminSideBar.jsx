import { ChartBarStacked, HousePlus, ListOrdered, LogOut, PackageSearch, Users } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import api from "../../Global/Axios"


function AdminSideBar() {
    const navigate = useNavigate()
    async function handlelogout() {
        try {
            console.log("logouted");
            await api.post('/admin/Logout')
            localStorage.removeItem('admin')
            navigate('/admin/login')
            console.log("after");
        }
        catch(err){
            console.log(err)
        }

        
        
    }
    const menu = [
        { icon: < HousePlus size={38} />, Label: 'Home', path: "/admin/dashboard" },
        { icon: < PackageSearch size={38} />, Label: 'Product', path: "/admin/products" },
        { icon: < Users size={38} />, Label: 'UserList', path: "/admin/users" },
        { icon: < ChartBarStacked size={38} />, Label: 'Category', path: "/admin/category" },
        { icon: < ListOrdered size={38} />, Label: 'OrderList', path: "/admin/orderlist" },

    ]
    return (
        <div className="py-12 flex flex-col justify-between w-[12rem] bg-[#a7d9fd] hover:w-[14rem] transition-all duration-200 ease-in-out shadow-l shadow-black hover:bg-[#99d4ff] ">
            <div className="flex flex-col gap-10 p-7 text-gray-700">
                {menu.map((item, index) => (
                    <NavLink to={item.path}>
                        <div key={index} className="flex gap-4 p-2 hover:text-xl items-center hover:scale-125 hover:bg-green-400 hover:text-white rounded-xl transition-all duration-150 ease-in-out">
                            {item.icon}
                            <div className="text-lg  font-bold transition-all duration-150 ease-in-out ">
                                {item.Label}
                            </div>
                        </div>
                    </NavLink >
                ))}
            </div>
            <div onClick={handlelogout} className="ml-9 text-gray-700 cursor-pointer">
                < LogOut size={30} className="inline " />
                <span className="text-xl font-bold text-gray-700">Log Out</span>
            </div>

        </div>
    )
}

export default AdminSideBar