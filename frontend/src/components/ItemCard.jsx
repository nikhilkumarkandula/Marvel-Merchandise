import { useEffect } from 'react'
import { useCartStore } from '../store/useCartStore';
import {Minus, Plus, Trash2} from "lucide-react"


const ItemCard = ({item}) => {
    const {
        decreaseOrDeleteItem,
        increaseItem,
        deleteCartItem,
    } = useCartStore();

    
  return (
    <div className="grid grid-cols-2 gap-4 items-center bg-white p-4 rounded-xl shadow-sm">
        <img
            src={item.imageUrl}
            alt={item.costumeName}
            className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold text-gray-800">{item.costumeName}</h2>
            <p className="text-lg text-rose-600 font-semibold">₹{item.price}</p>
            <p className="text-sm text-gray-500">Size: <span className="font-medium text-gray-700">{item.size}</span></p>

            <div className="flex items-center space-x-2 mt-2">
                <button
                onClick={() => decreaseOrDeleteItem(item._id)}
                className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                >
                <Minus size={16} />
                </button>
                <span className="text-base font-semibold px-2">{item.quantity}</span>
                <button
                onClick={() => increaseItem(item._id)}
                className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                >
                <Plus size={16} />
                </button>
                <button
                onClick={() => deleteCartItem(item._id)}
                className="text-red-500 hover:text-red-600 transition cursor-pointer"
                >
                <Trash2 size={18} />
                </button>
            </div>
        </div>
    </div>
  )
}

export default ItemCard