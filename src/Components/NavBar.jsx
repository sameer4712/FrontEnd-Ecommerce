import { LogOutIcon, Search, ShoppingCartIcon, UserRoundPen } from 'lucide-react'
import React from 'react'
import Logo from '../assets/logo.jpg'


function NavBar() {
    return (
        <nav>
            <img src={Logo} alt="Logo" />
            <div>
                <input type="text" placeholder='Search' />
                <Search />
            </div>
            <ShoppingCartIcon />
            <UserRoundPen />
            <LogOutIcon />
        </nav>
    )
}

export default NavBar