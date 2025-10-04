import React from 'react'
import { useCartStore } from '../store/useCartStore'
import { useOrderStore } from '../store/useOrderStore'

const OrderSummary = () => {
    const { cartItems, totalCost, tax , clearCart} = useCartStore()
    const { createOrder } = useOrderStore();
    const makeOrder =async (e) => {
      e.preventDefault();
      
      await createOrder({
          selectedItems: cartItems,
          totalPrice: totalCost+tax,
        });

      // after success 

      clearCart();
    }
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 h-fit">
        <h2 className="text-xl font-bold border-b pb-2">Order Summary</h2>
        <div className="flex justify-between text-sm">
          <span>Total Cost:</span>
          <span>₹{totalCost}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax:</span>
          <span>₹{tax}</span>
        </div>
        <div className="border-t pt-2 font-semibold flex justify-between">
          <span>Grand Total:</span>
          <span>₹{Number(totalCost) + Number(tax)}</span>
        </div>
        <button
        onClick={makeOrder}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200 cursor-pointer"
        >
          Make Purchase
        </button>
      </div>
  )
}

export default OrderSummary