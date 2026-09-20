import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout');
  };

  // Dispatch the delete action
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 border-b border-gray-200 shadow-sm rounded-lg mb-4">
              <div className="flex items-center space-x-4">
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link to={`/products/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                  {item.name}
                </Link>
              </div>

              <div className="text-lg font-bold text-gray-900">₹{item.price}</div>

              <div className="flex items-center space-x-4">
                {/* 3. Dropdown triggers addToCart with the new quantity */}
                <select
                  value={item.qty}
                  onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded p-1 w-16"
                >
                  {[...Array(item.countInStock > 5 ? 5 : item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>

                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Items:</span>
              <span className="font-semibold">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
            </div>

            <div className="flex justify-between mb-6 pb-4 border-b text-lg">
              <span className="font-bold text-gray-800">Subtotal:</span>
              <span className="font-bold text-gray-900">
                ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              disabled={cartItems.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;