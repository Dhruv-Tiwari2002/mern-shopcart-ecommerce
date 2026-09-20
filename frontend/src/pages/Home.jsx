import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Updated to include a balanced 6-item grid featuring your new categories
  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80' },
    { name: 'Clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80' },
    { name: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Furniture', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Beauty and Makeup', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION - Upgraded with professional gradients and modern typography */}
      <section className="relative bg-gray-900 text-white rounded-3xl overflow-hidden shadow-2xl mx-4 sm:mx-8 mt-6 border border-gray-800">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80')` }}
        ></div>
        {/* Deep gradient overlay ensures text is always readable regardless of the background image */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent"></div>
        
        <div className="relative container mx-auto px-8 py-32 sm:py-40 flex flex-col items-start justify-center max-w-3xl">
          <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            New Season Arrival
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
            Discover Quality <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Gear & Style</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-light">
            Shop the latest trends across electronics, fashion, sports, and beauty with unbeatable prices and lightning-fast delivery.
          </p>
          <Link 
            to="/products" 
            className="group flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-1"
          >
            Shop All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION - Upgraded to modern app-style overlay cards */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Shop By Category</h2>
            <p className="text-gray-500 mt-2 text-lg">Explore our curated collections</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors">
            View All Categories &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />
              {/* Dark gradient at the bottom makes the white text pop */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-bold text-white text-xl sm:text-2xl tracking-wide">{cat.name}</h3>
                <p className="text-blue-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Shop Now &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Featured Products</h2>
            <p className="text-gray-500 mt-2 text-lg">Handpicked favorites from our top inventory</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors">
            Browse Catalog &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="transform transition duration-300 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. TRUST BADGES - Upgraded from Emojis to sleek SVG icons */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="bg-white border border-gray-100 py-12 rounded-3xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-6">
            
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Fast & Free Shipping</h4>
                <p className="text-gray-500">On all orders above ₹999 across the country.</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Secure Payments</h4>
                <p className="text-gray-500">100% secure checkout with industry-standard encryption.</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10h-1.26A8 8 0 109 20h9a2 2 0 002-2v-6a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">24/7 Support</h4>
                <p className="text-gray-500">Dedicated engineering and support team ready to assist you.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;