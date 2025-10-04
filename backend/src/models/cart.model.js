import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
        price: {
            type: Number,
            required:true
        },
        imageUrl:{
            type: String,
            required: true
        }
    },
    { timestamps: true}
)

const Cart = mongoose.model("Cart_Items", cartSchema)

export default Cart;