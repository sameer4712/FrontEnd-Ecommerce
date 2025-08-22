
import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from '../AdminPages/HomePage'
import Products from '../AdminPages/Products'
import AdminUsers from '../AdminPages/AdminUsers'
import Categories from '../AdminPages/Categories'
import OrderList from '../AdminPages/OrderList'
import AdminLogin from '../AdminPages/AdminLogin'
import  Protected from './Components/protected'
import UserLogin from '../UserPages/UserLogin'
import UserHomePage from '../UserPages/UserHomePage'
import Product from '../UserPages/Product'
import Cart from '../UserPages/Cart'
import Order from '../UserPages/Order'
import SignUp from '../UserPages/SignUp'
import Profile from '../UserPages/Profile'

function App() {


  return (
    <Routes>
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/dashboard' element={<Protected> <HomePage /></Protected>} />
      <Route path='/admin/products' element={<Protected><Products /></Protected>} />
      <Route path='/admin/users' element={<Protected><AdminUsers /></Protected>} />
      <Route path='/admin/category' element={<Protected><Categories /></Protected>} />
      <Route path='/admin/orderlist' element={<Protected><OrderList /></Protected>} />

      {/* User Routes */}

      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/' element={<UserHomePage />} />
      <Route path='/Product/:id' element={<Product />} />
      <Route path='/user/cart' element={<Cart />} />
      <Route path='/user/order' element={<Order />} />
      <Route path='/user/sign-up' element={<SignUp />} />
      <Route path='/user/profile' element={<Profile />} />

    </Routes>
  )
}

export default App
