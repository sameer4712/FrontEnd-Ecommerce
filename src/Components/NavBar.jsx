import { HomeIcon, LogOutIcon, Search, ShoppingCartIcon, UserRoundPen, X } from 'lucide-react'
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
        try {
            const SearchedProduct = await api.get(`/user/search/${searchitem}`)
            setResults(SearchedProduct.data)

        }
        catch (err) {
            setResults(err)
        }
    }
    return (
        <nav className="flex gap-20 items-center justify-between p-5 bg-gray-300 fixed w-full z-50">
            <img src={Logo} alt="Logo" className="w-[7rem] ml-5 mt-3" />

            <div className="relative flex">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setsearchitem(e.target.value)}
                    className="w-[30rem] h-[2rem] p-5 rounded-l bg-white outline-none border border-gray-300"
                />
                <Search
                    className="bg-white w-[3rem] h-[2.6rem] p-1 border border-gray-300 cursor-pointer"
                    onClick={() => SearchedItem()}
                />

                {results.length > 0 && (
                    <div className="absolute top-[3rem] left-0 w-full bg-white border border-gray-300 shadow-2xl rounded-lg p-3 z-50">
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
                                onClick={() => {
                                    navigate(`/Product/${item._id}`);
                                    setResults([]);
                                }}
                                key={item._id}
                                className="flex items-center gap-4 p-3 border-b last:border-none hover:bg-gray-100 cursor-pointer rounded-md transition"
                            >
                                <img
                                    className="w-[4rem] h-[4rem] object-cover rounded-lg border"
                                    src={`http://localhost:3200/${item.image}`}
                                    alt={item.name}
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-sm font-bold text-green-700">₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex gap-10">
                <NavLink to="/">
                    <HomeIcon size={36} />
                </NavLink>
                <NavLink to="/user/cart">
                    <ShoppingCartIcon size={36} />
                </NavLink>



                {session ? (
                    session.loggedin ? (
                        <>
                            <span className="font-bold text-xl mt-1">{session.user?.name}</span>
                            <NavLink to="/user/profile">
                                <UserRoundPen size={36} />
                            </NavLink>
                            <button onClick={Logout} className="cursor-pointer">
                                <LogOutIcon size={36} />
                            </button>


                        </>
                    ) : (
                        <NavLink to="/user/login">
                            <p className="mt-1 font-bold text-xl">Login</p>
                        </NavLink>
                    )
                ) : null}
            </div>
        </nav>
    );
}

export default NavBar