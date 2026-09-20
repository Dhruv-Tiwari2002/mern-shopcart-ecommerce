import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    // Add the product to Redux state with a default quantity of 1
    dispatch(addToCart({ ...product, qty: 1 }));
    //alert(`${product.name} was added to your cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
      {/* Clickable Image */}
      <Link to={`/products/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover hover:opacity-80 transition-opacity" 
        />
      </Link>
      
      <div className="p-4 flex flex-col grow">
        {/* ADDED: Product Name (Clickable) */}
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price and Rating */}
        <div className="flex justify-between items-center mb-4 mt-auto">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm font-medium text-yellow-500">★ {product.rating}</span>
        </div>

        {/* FIXED: Functional Add to Cart Button */}
        <button 
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          className="w-full bg-blue-900 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;