import React, { useContext,useState,useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminAdd from './components/AdminAdd';
import AdminList from './components/AdminList';
import AdminOrders from './components/AdminOrders';
import { ShopContext } from './context/ShopContext';
import SideBar from './components/SideBar';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setUserRole(localStorage.getItem('role'));  
}, []);
  

  return (
   <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
  <ToastContainer />
  <Navbar />
  <SearchBar />
  <Routes>
    {/* Public Routes (Accessible to Everyone) */}
    <Route path='/' element={<Home />} />
    <Route path='/collection' element={<Collection />} />
    <Route path='/about' element={<About />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/product/:productId' element={<Product />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/login' element={<Login />} />

    {/* User Routes (Only for Users) */}
    {token && userRole !== 'admin' ? (
      <>
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOrder />} />
      </>
    ) : null}

    {/* Admin Routes (Only for Admins) */}
    {token && userRole === 'admin' ? (
      <>
        <Route path='/admin/*' element={<SideBar token={token} />} />
        <Route path='/add' element={<AdminAdd token={token} />} />
        <Route path='/list' element={<AdminList token={token} />} />
        <Route path='/orders' element={<AdminOrders token={token} />} />
      </>
    ) : null}

    {/* Redirect unauthorized users */}
    {!token && <Route path='*' element={<Navigate to='/login' />} />}
  </Routes>
  <Footer />
</div>

  );
};

export default App;
