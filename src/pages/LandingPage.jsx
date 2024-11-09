import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Icons
import { DiAndroid } from "react-icons/di";
import { FaApple } from "react-icons/fa";

// Import Images
import AstraImage from "../assets/logo-astrapay.png";
import ShopeeImage from "../assets/shopee-pay-logo.png";
import OvoImage from "../assets/logo-ovo.png";
import LinkajaImage from "../assets/logo-linkaja.png";
import JeniusImage from "../assets/ewallet_jenius-pay.png";
import illustration from "../assets/illustration-2.png";

// Import Swiper Styles
import "swiper/css";
import "swiper/swiper-bundle.css";

const LandingPage = () => {
  // Variasi animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Logo partner
  const partnerLogos = [
    AstraImage,
    ShopeeImage,
    OvoImage,
    LinkajaImage,
    JeniusImage,
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 overflow-hidden"
    >
      <div className="container max-w-screen-xl mx-auto px-4 pt-24 lg:pt-48">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={itemVariants}
            className="text-center lg:text-left space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-medium text-[#00AA55] tracking-wide"
            >
              Hello Event Maker!
            </motion.h3>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              Welcome to{" "}
              <span className="text-[#00AA55] block mt-2">Evenity</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              From Planning to Perfection, Let's Create Unforgettable
              Experiences, Together!
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/download/android"
                className="
                  flex items-center 
                  px-6 py-3 
                  bg-[#00AA55] 
                  text-white 
                  rounded-full 
                  shadow-xl 
                  hover:shadow-2xl 
                  transition-all 
                  duration-300"
              >
                <DiAndroid className="text-2xl mr-2" />
                Android
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/download/ios"
                className="
                  flex items-center 
                  px-6 py-3 
                  border-2 
                  border-[#00AA55] 
                  text-[#00AA55] 
                  rounded-full 
                  shadow-xl 
                  hover:bg-[#00AA55] 
                  hover:text-white 
                  transition-all 
                  duration-300"
              >
                <FaApple className="text-2xl mr-2" />
                iOS
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
              }}
              src={illustration}
              alt="Evenity Illustration"
              className="w-full max-w-lg object-contain"
            />
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 py-10 bg-white/50 backdrop-blur-sm rounded-2xl"
        >
          <h2 className="text-center text-xl font-semibold text-gray-600 mb-8">
            Trusted By Leading Brands
          </h2>

          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {partnerLogos.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity">
                  <img
                    src={logo}
                    alt={`Partner Logo ${index + 1}`}
                    className="max-h-16 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
