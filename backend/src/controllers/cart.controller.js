import Cart from "../models/cart.model.js"

export const addCartItem = async (req, res) => {

    const userId = req.user._id;
    const email = req.user.email;

    if(!userId){
        return res.status(400).json({message:"Login to use add to cart"})
    }

    try{
        const { costumeName, size, quantity, imageUrl } = req.body;
        
        let { price } = req.body;
        
        const existingItem = await Cart.findOne({email, costumeName, size});

        if(existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            const unitPrice = existingItem.price / existingItem.quantity;
            const newPrice = unitPrice * newQuantity;

            existingItem.quantity = newQuantity;
            existingItem.price = newPrice;

            await existingItem.save();

            return res.status(200).json({
                message: "Cart item quantity updated",
                item: existingItem,
            });
        }


        price = price * quantity;

        const newItem = new Cart({
            userId,
            email, 
            costumeName,
            size,
            quantity,
            price,
            imageUrl,
        });

        if(newItem) {
            await newItem.save();
            res.status(201).json({
               message:"new item added",
               item: newItem
            })
        } else {
            return res.status(400).json({message: "Inavlid cart item data"})
        }

    } catch(err){
        console.log('error in add to cart controller:', err);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const getCartItems = async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required to retrive" });
    }
    try{
        const items = await Cart.find({userId});

        res.status(201).json({items});
    } catch(err){
        console.log('error in get Cart Items:', err.message);
        res.status(500).json("Internal server error");
    }
}

export const updateCartItem = async (req, res) => {
    const { itemId } = req.params;
  
    if (!itemId) {
      return res.status(400).json({ message: "Item id is required to update cart item" });
    }
  
    const { quantity } = req.body;
  
    try {
      // fetching the existing item to get the original unit price
      const existingItem = await Cart.findById(itemId);
      if (!existingItem) {
        return res.status(400).json({ message: "Cart Item not found" });
      }
  
      const unitPrice = existingItem.price / existingItem.quantity; // Derive unit price
      const newPrice = unitPrice * quantity;
  
      // Now update quantity and total price
      const updatedItem = await Cart.findByIdAndUpdate(
        itemId,
        {
          quantity,
          price: newPrice
        },
        { new: true }
      );
  
      res.status(200).json({ message: "Cart item updated successfully", updatedItem });
    } catch (err) {
      console.log('Error in update cart item:', err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const deleteCartItem = async (req, res) => {
    const { itemId } = req.params;
    
    if(!itemId) {
        return res.status(400).json({message:"Item id is required to delete cart item"});
    }

    try{
        const deletedItem = await Cart.findOneAndDelete({ _id: itemId })

        if(!deletedItem) {
            return res.status(400).json({message:"Cart Item not found"})
        }

        res.status(200).json({message: "Cart Item deleted Successfully"})
    } catch (err) {
        console.log('Error in delete cart item:', err);
        res.status(500).json({message:"Internal Server Errro"})
    }
}