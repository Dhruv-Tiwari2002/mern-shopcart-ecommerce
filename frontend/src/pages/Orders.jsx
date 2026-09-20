import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        // Change this URL if your backend route is named differently!
        const { data } = await axiosInstance.get('/api/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600 mb-4">You have no orders yet.</p>
          <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Delivery Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900">
                      {order._id}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {/* Formats the MongoDB timestamp into a clean date */}
                      {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900">
                      ₹{order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="p-4 text-sm">
                      {/* Dynamic color styling based on the exact enum strings in your database */}
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.paymentStatus === 'completed' || order.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : order.paymentStatus === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.orderStatus === 'delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.orderStatus === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {/* Passes the dynamic Order ID into the URL so the next page knows what to fetch */}
                      <Link 
                        to={`/order/${order._id}`} 
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;