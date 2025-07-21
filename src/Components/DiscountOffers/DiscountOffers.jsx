import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router';

// Static product data
const discountProducts = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    image: 'https://i.ibb.co/0RcJCSKd/download.jpg',
    originalPrice: 10,
    discountedPrice: 7,
    discountPercent: 30,
  },
  {
    id: 2,
    name: 'Vitamin C Tablets',
    image: 'https://i.ibb.co/QFZsF3mS/download.jpg',
    originalPrice: 15,
    discountedPrice: 12,
    discountPercent: 20,
  },
  {
    id: 3,
    name: 'Ibuprofen 200mg',
    image: 'https://i.ibb.co/0jLJ2hcr/download.jpg',
    originalPrice: 12,
    discountedPrice: 9,
    discountPercent: 25,
  },
  {
    id: 4,
    name: 'Cough Syrup',
    image: 'https://i.ibb.co/QFt6RVsk/download.jpg',
    originalPrice: 8,
    discountedPrice: 6,
    discountPercent: 25,
  },
  {
    id: 5,
    name: 'Antacid Tablets',
    image: 'https://i.ibb.co/qYZhtrDY/download.jpg',
    originalPrice: 9,
    discountedPrice: 6.5,
    discountPercent: 28,
  },
];

const DiscountOffers = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="py-10 px-5 md:px-20 relative">
      <h2 className="text-6xl font-bold mb-15 text-center text-[#080c3b]">Discount Offers</h2>

      {/* Navigation Arrows */}
      <div ref={prevRef} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full p-2 shadow  transition hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#080c3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div ref={nextRef} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full p-2 shadow  transition hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#080c3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
      >
        {discountProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className=" shadow-md rounded-lg overflow-hidden p-4 hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover mb-3 rounded"
              />
              <div>
                <h3 className="text-xl font-semibold text-[#080c3b]">{product.name}</h3>
                <p className="text-xl text-gray-500 line-through">৳{product.originalPrice.toFixed(2)}</p>
                <p className="text-[#080c3b] font-bold text-2xl">৳{product.discountedPrice.toFixed(2)}</p>
                <p className="text-xl text-[red-500]">{product.discountPercent}% Off</p>
              </div>
              <Link to="/shop">
                <button className="mt-4 bg-[#98A1BC] cursor-pointer text-2xl font-bold text-[#080c3b] py-2 px-4 rounded transition w-full">
                  Buy Now
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountOffers;
