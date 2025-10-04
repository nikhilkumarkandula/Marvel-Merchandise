import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import CartItemsSkeleton from "./skeletons/CartItemSkeleton";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import ItemCard from "./ItemCard";
import OrderSummary from "./OrderSummary";

const CartItems = () => {
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const { authUser } = useAuthStore();
  const {
    getCartItems,
    isCartLoading,
    cartItems,
  } = useCartStore();

  useEffect(() => {
    if (authUser?._id) {
      getCartItems(authUser._id);
    }
  }, [authUser]);

  useEffect(() => {
    let timer;

    if (authUser?._id && !isCartLoading && cartItems.length === 0) {
      timer = setTimeout(() => {
        setShowEmptyMessage(true);
      }, 1500);
    } else {
      setShowEmptyMessage(false); // Reset if user logs out or cart is refilled
    }

    return () => clearTimeout(timer);
  }, [authUser, cartItems, isCartLoading]);

  if (isCartLoading || (!showEmptyMessage && cartItems.length === 0)) {
    return <CartItemsSkeleton />;
  }

  if (cartItems.length === 0 && showEmptyMessage) {
    return (
      <div className="flex items-center justify-center text-blue-gray-700 mt-10 text-lg text-center">
  <ShoppingCart className="size-8 mb-2" />
  <p>Your cart is empty.</p>
</div>

    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {/* Left Column: Cart Items */}
      <div className="md:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <motion.div
            key={item._id + item.size}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ItemCard item={item} />
          </motion.div>
        ))}
      </div>


      {/* Right Column: Summary */}
      <OrderSummary />
    </div>
  );
};

export default CartItems;