import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  image: { // 1. Fixed: Changed from 'images' to 'image'
    type: String,
    required: true,
  },
  countInStock: { // 2. Fixed: Changed from 'stock' to 'countInStock'
    type: Number,
    required: [true, 'Please add stock quantity'],
    default: 0,
    min: 0,
  },
  brand: { // 3. Fixed: Added the brand field
    type: String,
    required: [true, 'Please add a brand']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;