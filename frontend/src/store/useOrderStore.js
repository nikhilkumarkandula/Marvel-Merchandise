import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast"

export const useOrderStore = create((set, get) => ({
    orders: [],

    getOrders: async () => {
        const {orders} = get();
        console.log(orders);
        try{
            const res = await axiosInstance.get(`/orders/viewOrders`,);

            set({orders:res.data.items})

        } catch (err) {
            toast.error(err.response.message || "Failed to get orders")
        }
    },

    createOrder: async (orderData) => {
        try {
            console.log("route before call")
            console.log(orderData)
            const res = await axiosInstance.post("/orders/checkOut", orderData);
            console.log("route after call")
            const {orders} = get();

            set({orders: [...orders, res.data]})

            toast.success("Order placed successfully");
        } catch(err) {
            toast.error(err.response.message || "Failed to place order") 
        }
    },
}))