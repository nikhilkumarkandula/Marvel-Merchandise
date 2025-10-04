import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white pt-24 pb-12 px-6 md:px-16">
      <h1 className="text-5xl font-extrabold text-center text-red-600 mb-12">
        About Us
      </h1>

      {/* Welcome Section */}
      <motion.div
        className="bg-[#161B22] p-6 rounded-2xl shadow-lg mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-lg">
          Welcome to{" "}
          <span className="text-red-500 font-semibold">Marvel Merchandise</span>! 
          We are your one-stop shop for everything Marvel—offering a wide array of apparel and merchandise 
          inspired by your favorite heroes and villains.
        </p>
      </motion.div>

      {/* Mission and Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <motion.div
          className="bg-[#161B22] p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl text-red-500 font-semibold mb-2">Our Mission</h2>
          <p>
            To bring Marvel fans closer to the worlds they love by delivering high-quality, 
            officially licensed merchandise. Whether you're a Stark tech enthusiast or a Wakandan 
            warrior at heart, we’ve got something for you.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#161B22] p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl text-red-500 font-semibold mb-2">Our Vision</h2>
          <p>
            To create a community where fans can celebrate their Marvel fandom with unique, 
            high-quality products that make them feel like the heroes they adore. 
            We aim to inspire and empower, one superhero at a time.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <motion.div
        className="bg-[#161B22] p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl text-red-500 font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Exclusive Marvel-themed costumes and apparel.</li>
          <li>High-quality designs approved for fans of all ages.</li>
          <li>Fast, reliable shipping to assemble your merch quickly.</li>
          <li>Outstanding customer service—your satisfaction is our priority.</li>
        </ul>
      </motion.div>

      {/* Join Us Section */}
      <motion.div
        className="bg-[#161B22] p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center mt-10 "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl text-red-500 font-semibold mb-2">Join Us</h2>
          <p className="text-base text-white max-w-xl">
            Whether you’re shopping for a Spidey fan or upgrading your own collection, 
            we’re here to make it memorable. Connect with us on social media, 
            join our Marvel family, and gear up for the ultimate superhero experience.
          </p>
        </div>

        <div className="flex space-x-4 text-white text-2xl mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </motion.div>
      
    </div>
  );
};

export default AboutPage;
