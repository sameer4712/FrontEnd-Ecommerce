
import { Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from '../AdminPages/HomePage'
import Products from '../AdminPages/Products'
import AdminUsers from '../AdminPages/AdminUsers'
import Categories from '../AdminPages/Categories'
import OrderList from '../AdminPages/OrderList'
import AdminLogin from '../AdminPages/AdminLogin'

function App() {


  return (
    <Routes>
      <Route path='/AdminLogin' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<HomePage/>}/>
      <Route path='/admin/products' element={<Products/>}/>
      <Route path='/admin/users' element={<AdminUsers/>}/>
      <Route path='/admin/category' element={<Categories/>}/>
      <Route path='/admin/orderlist' element={<OrderList/>}/>
    </Routes>
  )
}

export default App
