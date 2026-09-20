import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const categories = [
    'Electronics', 'Clothing', 'Sports', 'Beauty and Makeup', 'Accessories', 
    'Hardware', 'Gaming', 'Furniture', 'Interior', 'Medicine'
  ];

  const logoutHandler = () => {
    dispatch(logout()); 
    setIsProfileOpen(false); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wider flex items-center gap-2 hover:text-blue-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          ShopCart
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
          <Link to="/products" className="hover:text-gray-300 transition-colors">Products</Link>
          
          {/* Categories Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsProfileOpen(false);
              }}
              className="flex items-center gap-1 hover:text-gray-300 transition-colors focus:outline-none"
            >
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 text-gray-800">
                {categories.map((cat) => (
                  <Link 
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          
          
          {/* Conditional Auth Rendering */}
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsCategoryOpen(false);
                }}
                className="flex items-center gap-1 font-medium hover:text-gray-300 focus:outline-none"
              >
                {userInfo.name}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 text-gray-800">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </Link>
                  
                  {/* Checking role for Admin */}
                  {userInfo.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition-colors font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button 
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t mt-1 pt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium">
                Register
              </Link>
            </>
          )}

          <Link to="/cart" className="hover:text-gray-300 transition-colors flex items-center gap-1 mr-4">
            Cart
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;