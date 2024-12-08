
import mongoose from "mongoose"
const Schema = mongoose.Schema;


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    orderPrice: {
        type: String
    }
}, { timestamps: true }, { versionKey: false });
 const Order = mongoose.model("Order", orderSchema);
 export default Order;