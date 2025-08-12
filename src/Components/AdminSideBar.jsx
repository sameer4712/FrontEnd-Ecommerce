import { ChartBarStacked, HousePlus, ListOrdered, LucideBadgeEuro, PackageSearch, Users } from "lucide-react"
import { NavLink } from "react-router-dom"


function AdminSideBar() {
    const menu = [
        { icon: < HousePlus size={38} />, Label: 'Home', path: "/admin/dashboard" },
        { icon: < PackageSearch size={38} />, Label: 'Product', path: "/admin/products" },
        { icon: < Users size={38} />, Label: 'UserList', path: "/admin/users" },
        { icon: < ChartBarStacked size={38} />, Label: 'Category', path: "/admin/categories" },
        { icon: < ListOrdered size={38} />, Label: 'OrderList', path: "/admin/orderlist" },

    ]
    return (
        <div className="py-12  w-[12rem] bg-[#a7d9fd] hover:w-[13rem] transition-all duration-200 ease-in-out shadow-l shadow-black hover:bg-[#99d4ff]">
            <div className="flex flex-col gap-10 p-7">
                {menu.map((item) => (
                    <NavLink to={item.path}>
                        <div className="flex gap-4 justify-center items-center hover:scale-125">
                            {item.icon}
                            <div className="text-l font-bold hover:underline transition-all duration-150 ease-in-out ">
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