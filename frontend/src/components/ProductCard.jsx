import { useState } from "react";
import { useCartStore } from "../store/useCartStore";

const sizes = ["S", "M", "L", "XL"];

const ProductCard = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const addCartItem = useCartStore((state) => state.addCartItem);

  const handleAdd = (e) => {
    e.preventDefault();

    addCartItem({
      ...item,
      size:selectedSize,
      quantity,
      price:item.discountPrice,
    });
    
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden p-4 text-center border border-gray-200">
      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-60 object-contain mb-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
      />

      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">{item.costumeName}</h2>

      {/* Price */}
      <p className="mb-2">
        <span className="line-through text-gray-400 mr-2">Rs {item.originalPrice}</span>
        <span className="text-xl font-bold text-red-500">Rs {item.discountPrice}</span>
      </p>

      {/* Size Selector */}
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="font-medium">Size:</span>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {sizes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Quantity Input */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="font-medium">Qty:</span>
        <input
          type="number"
          min="1"
          max="5"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>

      {/* Button */}
      <button
        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>

  );
};

export default ProductCard;
