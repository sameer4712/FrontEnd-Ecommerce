import AdminSideBar from "../src/Components/AdminSideBar"


function AdminLayout({children}) {
    return (
        <div className="flex ">
            <AdminSideBar />
            <div className="flex-1 min-h-screen bg-gray-100">{children}</div>
        </div>

    )
}

export default AdminLayout