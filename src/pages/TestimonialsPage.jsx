import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialGroups = [
  {
    category: "Vendor Partners",
    testimonials: [
      {
        imgSrc:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2547&amp;q=80",
        name: "Andi Irawan",
        title: "Owner Andi Sound Horeg",
        quote:
          "Partnering with Evenity has been a fantastic experience! Their attention to detail and commitment to excellence helped us reach a wider audience and showcase our services seamlessly.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Teddy Joko",
        title: "Owner Joko Catering",
        quote:
          "Working with Evenity was a game-changer for our business. Their team is professional, organized, and always goes the extra mile to ensure every event runs smoothly.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Teddy Joko",
        title: "Owner Joko Catering",
        quote:
          "Working with Evenity was a game-changer for our business. Their team is professional, organized, and always goes the extra mile to ensure every event runs smoothly.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Teddy Joko",
        title: "Owner Joko Catering",
        quote:
          "Working with Evenity was a game-changer for our business. Their team is professional, organized, and always goes the extra mile to ensure every event runs smoothly.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Teddy Joko",
        title: "Owner Joko Catering",
        quote:
          "Working with Evenity was a game-changer for our business. Their team is professional, organized, and always goes the extra mile to ensure every event runs smoothly.",
      },
    ],
  },
  {
    category: "User Experiences",
    testimonials: [
      {
        imgSrc:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1700&q=80",
        name: "Rezki Pratama",
        title: "Event Attendee",
        quote:
          "From start to finish, Evenity was exceptional. They understood exactly what we wanted and brought it all together seamlessly.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Lenia Wijaya",
        title: "Event Organizer",
        quote:
          "Choosing Evenity was the best decision we made for our event! They took care of every detail, making the experience stress-free and enjoyable.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Lenia Wijaya",
        title: "Event Organizer",
        quote:
          "Choosing Evenity was the best decision we made for our event! They took care of every detail, making the experience stress-free and enjoyable.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Lenia Wijaya",
        title: "Event Organizer",
        quote:
          "Choosing Evenity was the best decision we made for our event! They took care of every detail, making the experience stress-free and enjoyable.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Lenia Wijaya",
        title: "Event Organizer",
        quote:
          "Choosing Evenity was the best decision we made for our event! They took care of every detail, making the experience stress-free and enjoyable.",
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80",
        name: "Lenia Wijaya",
        title: "Event Organizer",
        quote:
          "Choosing Evenity was the best decision we made for our event! They took care of every detail, making the experience stress-free and enjoyable.",
      },
    ],
  },
];

function TestimonialCard({ imgSrc, name, title, quote }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col"
    >
      <div className="flex items-center mb-6">
        <img
          src={imgSrc}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-[#00AA55]/20"
        />
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <blockquote className="text-gray-600 italic flex-grow">
        "{quote}"
      </blockquote>
      <div className="mt-4 flex justify-end">
        <span className="text-[#00AA55] text-2xl">"</span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 py-20 min-h-screen flex items-center justify-center pt-28">
      <div className="container mx-auto px-4 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#00AA55] font-medium tracking-wide uppercase">
            Trusted by Incredible Partners
          </p>
        </motion.div>

        {testimonialGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
              {group.category}
            </h3>

            <Swiper
              spaceBetween={30}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass:
                  "swiper-pagination-bullet-active bg-[#00AA55]",
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Autoplay, Pagination]}
              className="testimonial-swiper"
            >
              {group.testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard
                    imgSrc={testimonial.imgSrc}
                    name={testimonial.name}
                    title={testimonial.title}
                    quote={testimonial.quote}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
}
