import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 text-center text-7xl">
          Marvel Merchandise
        <p className="mt-4 text-lg opacity-90">
          Gear up with official Marvel Hoodies & T-Shirts.  
          <br /> Your heroes. Your style.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-6 py-2 text-2xl bg-red-600 text-white font-bold rounded-lg shadow-lg cursor-pointer"
        >
          Shop Collection
        </motion.button>
      </section>

      {/* New Arrivals */}
      <section className=" max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">🆕 New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Spider Man Hoodie", link:"hoodies", img: "/products/hoodies/hoodie9.jpg" },
            { name: "Stark Industries T-Shirt", link:"tshirts", img: "/products/t-shirts/tshirt6.jpg" },
            { name: "Marvel Hoodie", link:"hoodies", img: "/products/hoodies/hoodie4.jpg" },
          ].map((item, i) => (
             <Link key={i} to={`collection/${item.link}`}>
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="flex justify-center items-center pt-4 h-48 mb-4">
                  <img src={item.img} alt={item.name} className="w-56 h-56 object-cover" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                </motion.div>
              </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { title: "Hoodies", link:"hoodies", img: "/products/hoodies/hoodie5.jpg" },
            { title: "T-Shirts", link:"tshirts", img: "/products/t-shirts/tshirt1.jpg" },
            { title: "Avengers Collection", link:"hoodies", img: "avengers.jpg" },
          ].map((cat, i) => (
            <Link key={i} to={`collection/${cat.link}`}>
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden w-64 cursor-pointer"
                  >
                    <div className="flex justify-center items-center h-48">
                      <img src={cat.img} alt={cat.title} className="center w-42 h-46 object-cover" />
                    </div>
                    <div className="p-4 text-center font-semibold">{cat.title}</div>
                  </motion.div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
