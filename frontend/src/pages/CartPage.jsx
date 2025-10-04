import { motion } from "framer-motion"
import CartHeader from "../components/CartHeader"
import CartItems from "../components/CartItems"

const CartPage = () => {
  return (
    <motion.div
      className="bg-white min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CartHeader />
      <CartItems />
    </motion.div>
  )
}

export default CartPage