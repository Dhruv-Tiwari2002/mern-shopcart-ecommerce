import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NEW: Mobile menu state
  
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
    setIsMobileMenuOpen(false); // Close mobile menu on logout
    navigate('/login'); 
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsCategoryOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" onClick={closeMenus} className="text-xl font-bold tracking-wider flex items-center gap-2 hover:text-blue-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          ShopCart
        </Link>

        {/* --- DESKTOP NAVIGATION (Hidden on mobile) --- */}
        <div className="hidden md:flex space-x-6 items-center">
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
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">My Profile</Link>
                  <Link to="/orders" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">My Orders</Link>
                  
                  {userInfo.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition-colors font-medium">Admin Dashboard</Link>
                  )}

                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t mt-1 pt-2">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium">Register</Link>
            </>
          )}
        </div>

        {/* --- MOBILE CONTROLS (Cart + Hamburger) --- */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Logo */}
        <Link to="/" onClick={closeMenus} className="text-xl font-bold tracking-wider flex items-center gap-2 hover:text-blue-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          ShopCart
        </Link>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 shadow-xl flex flex-col pb-4">
          <Link to="/" onClick={closeMenus} className="px-6 py-4 border-b border-gray-800 hover:bg-gray-800">Home</Link>
          <Link to="/about" onClick={closeMenus} className="px-6 py-4 border-b border-gray-800 hover:bg-gray-800">About</Link>
          <Link to="/products" onClick={closeMenus} className="px-6 py-4 border-b border-gray-800 hover:bg-gray-800">Products</Link>
          
          {/* Mobile Categories Accordion */}
          <div className="px-6 py-4 border-b border-gray-800">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex justify-between w-full items-center font-medium focus:outline-none"
            >
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCategoryOpen && (
              <div className="flex flex-col mt-4 pl-4 space-y-3 border-l-2 border-gray-700">
                {categories.map((cat) => (
                  <Link 
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={closeMenus}
                    className="text-gray-400 hover:text-white"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Auth Section */}
          <div className="px-6 pt-4 flex flex-col space-y-4">
            {userInfo ? (
              <>
                <div className="text-gray-400 text-sm mb-1">Logged in as {userInfo.name}</div>
                <Link to="/profile" onClick={closeMenus} className="text-white hover:text-blue-400">My Profile</Link>
                <Link to="/orders" onClick={closeMenus} className="text-white hover:text-blue-400">My Orders</Link>
                {userInfo.role === 'admin' && (
                  <Link to="/admin" onClick={closeMenus} className="text-yellow-500 hover:text-yellow-400">Admin Dashboard</Link>
                )}
                <button onClick={logoutHandler} className="text-left text-red-500 hover:text-red-400 mt-2">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={closeMenus} className="bg-gray-800 text-center py-2 rounded-md border border-gray-700">Login</Link>
                <Link to="/register" onClick={closeMenus} className="bg-blue-600 text-white text-center py-2 rounded-md">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
