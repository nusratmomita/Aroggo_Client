import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";

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

  if (isLoading) return <div className="text-2xl text-center font-bold">Loading slider ads...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <Swiper
       modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {sliderAds.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative w-full h-[420px] bg-opacity-80  rounded-xl overflow-hidden shadow-lg bg-white animate-fade-in">
              {/* Medicine image */}
              <img
                src={ad.image}
                alt={ad.itemName}
                className="w-full h-full object-cover opacity-80"
              />

              {/* Overlay content */}
              <div className="absolute inset-0 bg-opacity-80 flex flex-col justify-center items-center text-center px-6">
                {/* Discount badge */}
                {ad.discount && (
                  <div className="absolute top-5 right-5 bg-blue-200 text-[#080c3b] px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    {ad.discount}% OFF
                  </div>
                )}

                {/* Item name & message */}
                <h3 className="text-[#080c3b] text-4xl font-bold mb-2 drop-shadow-lg">
                  {ad.itemName}
                </h3>
                <div className="flex gap-3">
                    <h3 className="line-through text-[#080c3b] text-2xl font-bold mb-2 drop-shadow-lg">৳{ad.previousPrice}</h3>
                    <h3 className="text-[#080c3b] text-2xl font-bold mb-2 drop-shadow-lg">৳{Math.floor((ad.previousPrice*(ad.discount)/100))}</h3>
                </div>
                <p className="text-[#080c3b] text-xl max-w-xl mb-4 drop-shadow-sm">
                  {ad.message}
                </p>

                {/* Shop now button */}
                <Link to="/shop">
                    <button className="flex gap-2 items-center mt-2 bg-[#98A1BC] cursor-pointer text-2xl font-bold text-[#080c3b] py-2 px-4 rounded transition">
                        <FaShoppingCart />
                        Shop Now
                    </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
