import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { FaShoppingCart } from "react-icons/fa";

const Slider = () => {
  const axiosApi= UseAxiosSecureAPI();

  const { data: sliderAds = [], isLoading } = useQuery({
    queryKey: ["sliderAds"],
    queryFn: async () => {
      const res = await axiosApi.get("/approvedAds");
      return res.data;
    },
  });
  console.log(sliderAds)
  console.log("Slider ad image URLs:", sliderAds.map(ad => ad.image));

  if (isLoading) return <div className="text-center font-bold">Loading slider ads...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {sliderAds.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg bg-white animate-fade-in">
              {/* Medicine image */}
              <img
                src={ad.image}
                alt={ad.itemName}
                className="w-full h-full object-cover opacity-80"
              />

              {/* Overlay content */}
              <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center px-6">
                {/* Discount badge */}
                {ad.discount && (
                  <div className="absolute top-5 right-5 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    {ad.discount}% OFF
                  </div>
                )}

                {/* Item name & message */}
                <h3 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">
                  {ad.itemName}
                </h3>
                <p className="text-white text-lg max-w-xl mb-4 drop-shadow-sm">
                  {ad.message}
                </p>

                {/* Shop now button */}
                <button className="mt-2 bg-[#080c3b] hover:bg-[#555879] text-white font-semibold py-2 px-6 rounded-full transition duration-300 flex items-center gap-2">
                  <FaShoppingCart />
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
