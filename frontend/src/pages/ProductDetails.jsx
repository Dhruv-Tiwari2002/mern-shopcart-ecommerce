import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axiosInstance from '../utils/axiosInstance';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Added for redirection after deletion
  const [qty, setQty] = useState(1);
  
  // State for the API data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  // Added Delete Logic
  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await axiosInstance.delete(`/api/products/${id}`);
        alert('Product deleted successfully');
        navigate('/products'); // Redirect back to catalog
      } catch (error) {
        alert(error?.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600 font-bold">{error}</div>;

  return (
    <div>
      <Link to="/products" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mb-6 transition-colors">
        &larr; Go Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg object-cover" />
        </div>

        <div className="md:col-span-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center text-yellow-500 mb-4 border-b pb-4">
            <span className="text-lg font-medium">★ {product.rating} Rating</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600">Price:</span>
              <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            </div>

            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Qty:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded p-2 w-20"
                >
                  {[...Array(product.countInStock > 5 ? 5 : product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <button 
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="w-full bg-blue-800 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Add To Cart
            </button>

            {/* Admin Action Buttons */}
            {userInfo && userInfo.role === 'admin' && (
              <div className="mt-4 space-y-3">
                <Link 
                  to={`/admin/product/${id}/edit`}
                  className="w-full block text-center bg-green-800 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                  Edit Product
                </Link>
                <button 
                  onClick={deleteHandler}
                  className="w-full bg-red-800 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                  Delete Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;