import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'All';

  const categories = [
    'All', 'Electronics', 'Clothing', 'Sports', 'Beauty and Makeup', 'Accessories',
    'Hardware', 'Gaming', 'Furniture', 'Interior', 'Medicine'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === currentCategory));
    }
  }, [currentCategory, products]);

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Explore Catalog</h1>
        <p className="text-gray-600 mt-2">Browse our complete inventory filtered by category.</p>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentCategory === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xl font-semibold text-gray-500">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-xl text-gray-600 font-medium">No products found in this category.</p>
          <button 
            onClick={() => handleCategoryChange('All')} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;