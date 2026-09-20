import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Relationship linking back to the User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Snapshot of the products bought
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // Storing price here prevents historic orders from changing if product prices update later
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentStatus: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order