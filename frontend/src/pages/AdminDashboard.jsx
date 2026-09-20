import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State to hold all form inputs
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
    category: '',
    countInStock: '',
    description: '',
    rating: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convert number fields properly
      [name]: value
    }));
  };

  // Submit the new product to the backend
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productDataToSend = {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        rating: Number(formData.rating)
      };

      await axiosInstance.post('/api/products', productDataToSend);
      alert('Product successfully added to the store!');
      navigate('/'); // Redirect to home to see the new product
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product. Ensure you are logged in as an Admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Add New Product</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6 font-medium">{error}</div>}

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Sony WH-1000XM5" />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Stock Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Count In Stock</label>
            <input type="number" name="countInStock" required min="0" value={formData.countInStock} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
            <input type="number" name="rating" required min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <input type="text" name="brand" required value={formData.brand} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select name="category" required value={formData.category} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="" disabled>Select a category...</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Beauty and Makeup">Beauty and Makeup</option>
              <option value="Hardware">Hardware</option>
              <option value="Gaming">Gaming</option>
              <option value="Furniture">Furniture</option>
              <option value="Interior">Interior</option>
              <option value="Medicine">Medicine</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input type="url" name="image" required value={formData.image} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://images.unsplash.com/..." />
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <img src={formData.image} alt="Preview" className="h-32 rounded object-cover shadow-sm" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50">
          {loading ? 'Adding Product...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;