import React from "react";
import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa6";
import { GiCycle } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { TbBrandFunimation } from "react-icons/tb";
import { MdAlignHorizontalLeft } from "react-icons/md";

export default function Landing() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <main className="bg-gray-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: "75vh" }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <span className="w-full h-full absolute opacity-75 bg-[#00AA55]/70"></span>
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="items-center flex flex-wrap"
          >
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white font-semibold text-5xl mb-6"
                >
                  About Evenity
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-4 text-lg text-white text-opacity-90 text-justify"
                >
                  Evenity is an innovative online event organizer based in East
                  Java, specializing in creating seamless, memorable experiences
                  for all kinds of events. With a focus on connecting clients
                  with top-tier vendors, services, and venues, Evenity
                  simplifies the event planning process by offering a platform
                  that combines expertise with convenience.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-50 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </motion.div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pb-20 bg-gray-50 -mt-24"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {[
              {
                icon: <FaAward className="text-white" />,
                bgColor: "bg-[#00AA55]",
                title: "Awarded Agency",
                description:
                  "Evenity's expertise has earned industry recognition for creating memorable events.",
              },
              {
                icon: <GiCycle className="text-white" />,
                bgColor: "bg-[#00AA55]/90",
                title: "Free Revisions",
                description:
                  "We value your feedback and offer free revisions to align with your vision.",
              },
              {
                icon: <MdVerified className="text-white" />,
                bgColor: "bg-[#00AA55]/80",
                title: "Verified Partners",
                description:
                  "We work with trusted vendors to guarantee the highest quality for your event.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 group">
                  <div className="px-6 py-8 flex-auto">
                    <div
                      className={`${feature.bgColor} p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h6 className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </h6>
                    <p className="mt-3 mb-4 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center mt-32"
          >
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mb-20">
              <div className="text-[#00AA55] p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-[#00AA55]/10">
                <TbBrandFunimation className="text-3xl" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Working with us is a pleasure
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                We aim to build long-lasting relationships by ensuring that
                working with Evenity is an enjoyable and stress-free experience.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                Our platform simplifies event management, letting you focus on
                creating great memories while we handle the details.
              </p>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mb-20">
              <div className="text-[#00AA55] p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-[#00AA55]/10">
                <MdAlignHorizontalLeft className="text-3xl" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Tailored Solutions
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                We understand that every event is unique. Our team works closely
                with you to tailor solutions that meet your specific needs and
                preferences.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                From intimate gatherings to large-scale events, we ensure that
                every detail is meticulously planned and executed.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
