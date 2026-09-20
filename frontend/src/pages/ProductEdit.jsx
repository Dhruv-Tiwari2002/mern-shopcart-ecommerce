import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', price: '', image: '', brand: '', category: '', countInStock: '', description: '', rating: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/products/${id}`);
        setFormData({
          name: data.name,
          price: data.price,
          image: data.image,
          brand: data.brand,
          category: data.category,
          countInStock: data.countInStock,
          description: data.description,
          rating: data.rating
        });
      } catch (err) {
        setError('Failed to fetch product details.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

      await axiosInstance.put(`/api/products/${id}`, productDataToSend);
      alert('Product successfully updated!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>
      </div>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6 font-medium">{error}</div>}

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
            <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Count In Stock</label>
            <input type="number" name="countInStock" required min="0" value={formData.countInStock} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <input type="text" name="brand" required value={formData.brand} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          
          {/* UPDATED: Added new options to the category select dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select name="category" required value={formData.category} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2">
              <option value="" disabled>Select...</option>
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
            <input type="number" name="rating" required min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input type="url" name="image" required value={formData.image} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2" />
            {formData.image && <img src={formData.image} alt="Preview" className="h-32 rounded object-cover shadow-sm mt-4" />}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"></textarea>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors">
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;