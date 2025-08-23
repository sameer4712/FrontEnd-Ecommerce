import { HomeIcon, LogOutIcon, Search, ShoppingCartIcon, UserRoundPen,X } from 'lucide-react'
import Logo from '../assets/amazon.png'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../Global/Axios'
import { useEffect, useState } from 'react'


function NavBar() {
    const [session, setsession] = useState(null)
    const [searchitem, setsearchitem] = useState('')
    const [results, setResults] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        Session()
    }, [])

    async function Session() {
        try {
            const sess = await api.get('/user/SessionCheck');
            setsession(sess.data)
            console.log(sess.data);
        }
        catch (err) {
            console.error(err)
        }
    }

    async function Logout() {
        const log = await api.get('/user/Logout')
        console.log(log);
        localStorage.removeItem('user')
        setsession({ loggedin: false, user: null })
        alert("Logouted as user")
        navigate('/')


    }

    async function SearchedItem() {
        try{
            const SearchedProduct = await api.get(`/user/search/${searchitem}`)
            setResults(SearchedProduct.data)
        }
        catch(err)
        {
            setResults(err)
        }
    }


    return (
        <nav className='flex gap-20 items-center justify-between p-5 bg-gray-300 fixed w-full' >
            <img src={Logo} alt="Logo" className='w-[7rem] ml-5 mt-3' />
            <div className='flex '>
                <input type="text" placeholder='Search' onChange={(e) => setsearchitem(e.target.value)} className='w-[30rem] h-[2rem] p-5 rounded-l bg-white outline-none border-1 border-gray-300' />
                <Search className='bg-white w-[3rem] h-[2.6rem] p-1 rounded-l border-1 border-gray-300 cursor-pointer' onClick={() => SearchedItem()} />
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
                {session ? (
                    session.loggedin ? (
                        <>
                            <span className="font-bold text-xl mt-1">{session.user?.name}</span>
                            <button onClick={Logout} className="cursor-pointer">
                                <LogOutIcon size={36} />
                            </button>
                        </>
                    ) : (
                        <NavLink to='/user/login'>
                            <p className='mt-1 font-bold  text-xl'>Login</p>
                        </NavLink>
                    )
                ) : null}
            </div>

            {results.length > 0 && (
                <div className="bg-white shadow-md rounded-md mt-3 z-110">


                    <div className="flex justify-end">
                        <button
                            onClick={() => setResults([])}
                            className="text-gray-500 hover:text-black"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {results.length > 0 && (
                        <div className="bg-white shadow-md rounded-md mt-2 p-3 absolute left-1/2 transform -translate-x-1/2 w-96 max-h-80 overflow-y-auto z-200">
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => setResults([])}
                                    className="text-gray-500 hover:text-black"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {results.map((item) => (
                                <div
                                    onClick={() => { navigate(`/Product/${item._id}`) }}
                                    key={item._id}
                                    className="p-3 border-b last:border-none hover:bg-gray-100 cursor-pointer"
                                >
                                    <img src={`http://localhost:3000/${item.image}`} alt="" />
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-sm font-bold text-green-700">₹{item.price}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            )}
        </nav>
    )
}

export default NavBar