import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        require: [true, 'Please add a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                require: true,
                default: 1,
                min: 1
            }
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;