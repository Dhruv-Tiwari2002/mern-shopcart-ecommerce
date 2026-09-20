import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { clearCart } from '../redux/cartSlice'; // Make sure this exists in your slice!

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  // Calculate totals
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50; 
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2)); 
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const [shippingAddress, setShippingAddress] = useState({
    address: '', city: '', postalCode: '', country: '',
  });

  // Loading and Error state for the payment simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Format the data exactly how your backend OrderModel expects it
      const orderData = {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: 'Credit Card / UPI', // Dummy data until real gateway is added
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      };

      // 2. Send the POST request to your Express backend to save to MongoDB
      // (Assuming your route is /api/orders. Adjust if yours is different!)
      const { data } = await axiosInstance.post('/api/orders', orderData);

      // 3. If successful, clear the Redux cart
      dispatch(clearCart());

      // 4. Redirect the user to their orders page to see their new purchase
      navigate('/orders');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Shipping Form Section */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200">Shipping Address</h2>
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text" name="address" required
                  value={shippingAddress.address} onChange={handleChange}
                  placeholder="123 Main St, Apartment 4B"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text" name="city" required
                    value={shippingAddress.city} onChange={handleChange}
                    placeholder="New Delhi"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text" name="postalCode" required
                    value={shippingAddress.postalCode} onChange={handleChange}
                    placeholder="110001"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text" name="country" required
                  value={shippingAddress.country} onChange={handleChange}
                  placeholder="India"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4 flex justify-center items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  'Place Order & Pay'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-20">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
            
            {cartItems.length === 0 ? (
              <div className="text-gray-500 text-center py-4">Your cart is empty</div>
            ) : (
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="w-32">
                        <p className="font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-gray-200 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST 18%)</span>
                <span>₹{taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Order Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/cart" className="block text-center text-blue-600 hover:underline mt-6 text-sm font-medium">
              &larr; Edit Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;