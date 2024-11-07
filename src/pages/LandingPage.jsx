import React from 'react'
import AstraImage from "../assets/logo-astrapay.png";
import ShopeeImage from "../assets/shopee-pay-logo.png";
import OvoImage from "../assets/logo-ovo.png";
import LinkajaImage from "../assets/logo-linkaja.png";
import JeniusImage from "../assets/ewallet_jenius-pay.png";
import illustration from "../assets/illustration-2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function LandingPage() {
  return (
    <div>
    <div className='container max-w-screen-xl mx-auto flex justify-center items-center'>
        <div>
            <h3 className='text-2xl font-semibold text-[#00AA55] mb-4'>Hello Event Maker!</h3>
            <h1 className='text-7xl font-bold w-1/2'>Welcome to <span className='text-[#00AA55]'>Evenity</span></h1>
            <p className='text-xl py-8 w-[90%]'>From Planning to Perfection, We’re Here for Every Detail.Let’s Create Unforgettable Experiences, Together!</p>
        </div>
        <div>
            <img src={illustration} alt="landingpage" />
        </div>
    </div>
    <div className='container max-w-screen-xl mx-auto'>
    <div className="w-full lg:-mt-16 pt-16 ">
            <h1 className="font-sans text-[20px] font-semibold pb-3 opacity-50 ms-3">
              CONNECT ON
            </h1>
            <div className="relative w-full lg:h-32 rounded-2xl">
              <div className="absolute inset-0 lg:bg-[#150E5E] lg:opacity-20 rounded-2xl"></div>
              <div className="relative flex lg:flex-row lg:justify-evenly lg:items-center h-full w-full text-center gap-5">
                <Swiper
                  spaceBetween={50}
                  loop={true}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  modules={[Autoplay, Pagination]}
                >
                  <SwiperSlide>
                    <div className="lg:w-48 w-full">
                      <img
                        src={AstraImage}
                        alt="Astra"
                        className="object-cover mx-auto"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="lg:w-48 w-full">
                      <img
                        src={ShopeeImage}
                        alt="Shopee"
                        className="mx-auto w-56"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="lg:w-48 w-full">
                      <img
                        src={OvoImage}
                        alt="OVO"
                        className="object-cover mx-auto"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="lg:w-48 w-full">
                      <img
                        src={LinkajaImage}
                        alt="LinkAja"
                        className="object-cover mx-auto"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="lg:w-48 w-full">
                      <img
                        src={JeniusImage}
                        alt="Jenius"
                        className="object-cover mx-auto"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
    </div>

  </div>
  )
}

export default LandingPage