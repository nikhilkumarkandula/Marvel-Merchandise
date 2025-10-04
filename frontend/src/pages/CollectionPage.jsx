import { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

import { useParams } from "react-router-dom";

const CollectionPage = () => {

  const {ctgry} = useParams()
  console.log(ctgry)

  const { hoodies } = useProductStore();
  const { tshirts } = useProductStore();
  const [category, setCategory] = useState(ctgry || "hoodies");

  const filtered = category === "hoodies" ? hoodies : tshirts;

  return (
    <div>
        <div className="flex justify-center gap-6 mt-15 mb-6 top-16 bg-white py-4 z-10">
            <button
                className={`px-6 py-2 rounded-md font-semibold border transition cursor-pointer
                ${category === "hoodies" 
                  ? "bg-rose-500 text-white hover:bg-rose-600" 
                  : "bg-white text-black border-black hover:bg-gray-100"
                }`}
                onClick={() => setCategory("hoodies")}
            >
                Hoodies
            </button>
            <button
                className={`px-6 py-2 rounded-md font-semibold border transition cursor-pointer
                ${category === "tshirts" 
                  ? "bg-rose-500 text-white hover:bg-rose-600" 
                  : "bg-white text-black border-black hover:bg-gray-100"
                }`
                }onClick={() => setCategory("tshirts")}
            >
                T-Shirts
            </button>
        </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filtered.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <ProductCard item={item} />
            </motion.div>
          ))}

      </div>
    </div>
  );
};

export default CollectionPage;
