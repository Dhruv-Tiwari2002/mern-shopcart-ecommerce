import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Importing all pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminDashboard from './pages/AdminDashboard';
import ProductEdit from './pages/ProductEdit';
import AdminRoute from './components/AdminRoute';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside this block will share the Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/about" element={<About />} />

          {/* Admin Route */}
          <Route path="" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/product/:id/edit" element={<ProductEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;