import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pull userInfo from Redux to check for admin privileges
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  // The Admin Handler to update the database
  const updateStatusHandler = async (newStatus) => {
    try {
      // Calls your backend PUT route
      const { data } = await axiosInstance.put(`/api/orders/${id}`, { orderStatus: newStatus });
      // Update local state instantly so the UI reflects the change without refreshing
      setOrder({ ...order, orderStatus: data.orderStatus || newStatus });
      alert(`Order marked as ${newStatus}!`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold text-gray-600">Loading Order Details...</div>;
  if (error) return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
  if (!order) return <div className="text-center py-20 text-gray-600">Order not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6 flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Details</h1>
          <p className="text-gray-500 text-sm">Order ID: <span className="font-mono text-gray-700">{order._id}</span></p>
          <p className="text-gray-500 text-sm">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <Link to="/orders" className="text-blue-600 hover:underline text-sm font-medium">
          &larr; Back to My Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <h2 className="bg-gray-50 px-6 py-4 border-b font-bold text-gray-800">Items in this Order</h2>
            <div className="px-6">
              {order.products.map((item, index) => (
                <div key={index} className="flex items-center py-4 border-b border-gray-100 last:border-0">
                  <img 
                    src={item.product?.image || 'https://via.placeholder.com/150'} 
                    alt={item.product?.name || 'Product'} 
                    className="w-20 h-20 object-cover rounded-md border border-gray-200" 
                  />
                  <div className="ml-4 flex-1">
                    <Link to={`/products/${item.product?._id || item.product}`} className="font-semibold text-blue-600 hover:underline text-lg">
                      {item.product?.name || 'Product Name'}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-gray-900 text-lg">
                    ₹{item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">Order Status</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Payment</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                order.paymentStatus === 'completed' || order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.paymentStatus}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Delivery</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.orderStatus}
              </span>
            </div>

            {/* ADMIN ONLY CONTROLS */}
            {userInfo && userInfo.role === 'admin' && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-bold mb-2 text-sm uppercase tracking-wide text-red-600">Admin Actions</h3>
                <label className="block text-sm text-gray-600 mb-1">Update Delivery Status</label>
                <select 
                  value={order.orderStatus}
                  onChange={(e) => updateStatusHandler(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}
          </div>

          {/* Shipping Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">Shipping Address</h2>
            <p className="text-gray-700">{order.shippingAddress?.address}</p>
            <p className="text-gray-700">{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
            <p className="text-gray-700">{order.shippingAddress?.country}</p>
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Items Total</span>
              <span className="font-medium">₹{order.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-bold text-gray-900 text-lg">Grand Total</span>
              <span className="font-bold text-blue-700 text-lg">₹{order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;