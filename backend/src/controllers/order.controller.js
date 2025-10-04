import Order from "../models/orders.model.js"
import Cart from "../models/cart.model.js"

export const checkout = async (req, res) => {

    const userId = req.user._id;
    const email = req.user.email; // getting user details from protect route
    
    if(!userId){
        return res.status(400).json({message:"Login to checkout orders"})
    }

    const { selectedItems, totalPrice } = req.body; // an array of selected cart items id's (only id's) using check box

    if (!selectedItems || selectedItems.length === 0) {
        return res.status(400).json({ message: "No items selected for checkout" });
    }
    

    try {
        // retrieving cart items from the cart-items collections in databse.
        const cartItems = await Cart.find({ _id: { $in: selectedItems }, userId });

        // breakdown of above mongo db usage
        // Cart.find(...) is a MongoDB query using Mongoose.
        // { _id: { $in: selectedItems } }:
        // $in is a MongoDB operator that checks if _id exists in the selectedItems array.
        // It returns all documents where _id is one of the IDs in selectedItems.
        // userId: Ensures the query only fetches cart items belonging to the logged-in user.

        if (!cartItems.length) {
            return res.status(400).json({ message: "Selected items not found" });
        }
        const newOrder = new Order({
            userId,
            email,
            items: cartItems,
            totalPrice
        });

        if(newOrder) {
            await newOrder.save();
            res.status(201).json({
                userId: newOrder.userId,
                email: newOrder.email,
                items: newOrder.items,
                totalPrice: newOrder.totalPrice,
            })
        } else {
            return res.status(400).json({message: "Inavlid order item data"})
        }


        // Remove selected items from the cart after checkout
        await Cart.deleteMany({ _id: { $in: selectedItems } }); 

    } catch(err){
        console.log('error in checkout controller:', err);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const viewOrders = async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required to checkout" });
    }
    try{
        const items = await Order.find({userId});

        res.status(201).json({items});
    } catch(err){
        console.log('error in getItems:', err.message);
        res.status(500).json("Internal server error");
    }
}