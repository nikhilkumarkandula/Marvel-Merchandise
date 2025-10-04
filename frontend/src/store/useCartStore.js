import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// You can later change this value easily
const TAX_PERCENT = 2;

export const useCartStore = create((set, get) => ({
  isCartLoading: false,
  cartItems: [],
  totalCost: 0,
  tax: 0,

  getCartItems: async (userId) => {
    set({ isCartLoading: true });
    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      const items = res.data.items;

      const totalCost = items.reduce((sum, item) => sum + item.price, 0);
      const tax = (TAX_PERCENT / 100) * totalCost;

      set({
        cartItems: items,
        totalCost,
        tax,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch cart items");
    } finally {
      set({ isCartLoading: false });
    }
  },

  addCartItem: async (item) => {
    const { cartItems } = get();
    try {
      const res = await axiosInstance.post("/cart/addToCart", item);
      const updatedItems = [...cartItems, res.data];

      const totalCost = updatedItems.reduce((sum, item) => sum + item.price, 0);
      const tax = (TAX_PERCENT / 100) * totalCost;

      set({
        cartItems: updatedItems,
        totalCost,
        tax,
      });

      toast.success("Item added to cart successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add item");
    }
  },

  increaseItem: async (itemId) => {
    const { cartItems } = get();
    const item = cartItems.find((item) => item._id === itemId);
    if (!item) return;

    const updatedQuantity = item.quantity + 1;

    try {
      await axiosInstance.put(`/cart/update/${itemId}`, {
        quantity: updatedQuantity,
      });

      const updatedItems = cartItems.map((item) => {
        if (item._id === itemId) {
          const newQuantity = item.quantity + 1;
          const unitPrice = item.price / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            price: unitPrice * newQuantity,
          };
        }
        return item;
      });

      const totalCost = updatedItems.reduce((sum, item) => sum + item.price, 0);
      const tax = (TAX_PERCENT / 100) * totalCost;

      set({
        cartItems: updatedItems,
        totalCost,
        tax,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update item");
    }
  },

  decreaseOrDeleteItem: async (itemId) => {
    const { cartItems } = get();
    const item = cartItems.find((item) => item._id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      // Delete item
      try {
        await axiosInstance.post(`/cart/delete/${itemId}`);
        const updatedItems = cartItems.filter((item) => item._id !== itemId);

        const totalCost = updatedItems.reduce((sum, item) => sum + item.price, 0);
        const tax = (TAX_PERCENT / 100) * totalCost;

        set({
          cartItems: updatedItems,
          totalCost,
          tax,
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete item");
      }
    } else {
      // Decrease quantity
      const updatedQuantity = item.quantity - 1;

      try {
        await axiosInstance.put(`/cart/update/${itemId}`, {
          quantity: updatedQuantity,
        });

        const updatedItems = cartItems.map((item) => {
          if (item._id === itemId) {
            const newQuantity = item.quantity - 1;
            const unitPrice = item.price / item.quantity;
            return {
              ...item,
              quantity: newQuantity,
              price: unitPrice * newQuantity,
            };
          }
          return item;
        });

        const totalCost = updatedItems.reduce((sum, item) => sum + item.price, 0);
        const tax = (TAX_PERCENT / 100) * totalCost;

        set({
          cartItems: updatedItems,
          totalCost,
          tax,
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update item");
      }
    }
  },

  deleteCartItem: async (itemId) => {
    const { cartItems } = get();

    try {
      await axiosInstance.post(`/cart/delete/${itemId}`);
      const updatedItems = cartItems.filter((item) => item._id !== itemId);

      const totalCost = updatedItems.reduce((sum, item) => sum + item.price, 0);
      const tax = (TAX_PERCENT / 100) * totalCost;

      set({
        cartItems: updatedItems,
        totalCost,
        tax,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete item");
    }
  },
  
  clearCart: () => {
    set({ cartItems: [], totalCost: 0, tax: 0 });
  } 

}));
