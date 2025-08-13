import { ChartBarStacked, HousePlus, ListOrdered, LucideBadgeEuro, PackageSearch, Users } from "lucide-react"
import { NavLink } from "react-router-dom"


function AdminSideBar() {
    const menu = [
        { icon: < HousePlus size={38} />, Label: 'Home', path: "/admin/dashboard" },
        { icon: < PackageSearch size={38} />, Label: 'Product', path: "/admin/products" },
        { icon: < Users size={38} />, Label: 'UserList', path: "/admin/users" },
        { icon: < ChartBarStacked size={38} />, Label: 'Category', path: "/admin/category" },
        { icon: < ListOrdered size={38} />, Label: 'OrderList', path: "/admin/orderlist" },

    ]
    return (
        <div className="py-12  w-[12rem] bg-[#a7d9fd] hover:w-[14rem] transition-all duration-200 ease-in-out shadow-l shadow-black hover:bg-[#99d4ff]">
            <div className="flex flex-col gap-10 p-7 text-gray-700">
                {menu.map((item,index) => (
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

        </div>
    )
}

export default AdminSideBar