import React from 'react'
import NavBar from '../src/Components/NavBar'

function UserLayout({ children }) {
    return (
        <div className="flex flex-col ">
            <NavBar />
            <div className="flex-1 min-h-screen bg-gray-100">
                {children}
            </div>
        </div>
    )
}
export default UserLayout