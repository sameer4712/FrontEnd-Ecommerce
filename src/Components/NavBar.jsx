import { HomeIcon, LogOutIcon, Search, ShoppingCartIcon, UserRoundPen } from 'lucide-react'
import Logo from '../assets/amazon.png'
import { NavLink } from 'react-router-dom'


function NavBar() {
    return (
        <nav className='flex gap-20 items-center justify-between p-5 bg-gray-300 fixed w-full' >
            <img src={Logo} alt="Logo" className='w-[7rem] ml-5 mt-3' />
            <div className='flex '>
                <input type="text" placeholder='Search' className='w-[30rem] h-[2rem] p-5 rounded-l bg-white outline-none border-1 border-gray-300' />
                <Search className='bg-white w-[3rem] h-[2.6rem] p-1 rounded-l border-1 border-gray-300' />
            </div>
            <div className='flex gap-10'>

                <NavLink to='/'>
                    <HomeIcon size={36} />
                </NavLink>

                <NavLink to='/user/cart'>
                    <ShoppingCartIcon size={36} />
                </NavLink>

                <NavLink to='/user/profile'>
                    <UserRoundPen size={36} />
                </NavLink>

                <NavLink to='/user/login'>
                    <LogOutIcon size={36} />
                </NavLink>

            </div>
        </nav>
    )
}

export default NavBar