import { HomeIcon, LogOutIcon, Search, ShoppingCartIcon, UserRoundPen } from 'lucide-react'
import Logo from '../assets/amazon.png'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../Global/Axios'


function NavBar() {
    const navigate = useNavigate()
    async function Logout() {
        const log = await api.get('/user/Logout')
        console.log(log);
        
        localStorage.removeItem('user')
        navigate('/')


    }


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
                <button onClick={()=>Logout()}>
                    <NavLink to='/'>
                        <LogOutIcon size={36} />
                    </NavLink>
                </button>

            </div>
        </nav>
    )
}

export default NavBar