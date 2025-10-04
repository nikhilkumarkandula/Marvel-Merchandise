import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        items: [
            {
                costumeName: { 
                    type: String, 
                    required: true 
                },
                size: {
                    type: String, 
                    required: true 
                },
                quantity: {
                    type: Number, 
                    default: 1 
                },
                imageUrl:{
                    type: String,
                    required: true
                }
            }
        ],
        totalPrice: { 
            type: Number
        },
    },
    { timestamps: true}
)

const Order = mongoose.model("Order", orderSchema)

export default Order;