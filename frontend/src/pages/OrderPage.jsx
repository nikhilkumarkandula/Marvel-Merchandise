import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { useOrderStore } from "../store/useOrderStore";
import { useAuthStore } from "../store/useAuthStore";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const { orders, getOrders } = useOrderStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getOrders();
    }
  }, [authUser]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6 mb-10">

      {/* Header with fonts */}
      <h2
        className="text-4xl font-extrabold tracking-tight mb-8 text-center text-red-700 drop-shadow-md"
        style={{
          fontFamily: `"Times New Roman", Calibri, sans-serif`,
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <ShoppingBag className="size-8" /> 
          Your Orders
        </div>
      </h2>

      <div className="space-y-6">
        {orders?.length > 0 ? (
          orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <OrderCard order={order} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No previous orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
