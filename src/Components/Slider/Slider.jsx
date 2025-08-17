import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";

const Slider = () => {
  const axiosApi = UseAxiosSecureAPI();

  const { data: sliderAds = [], isLoading } = useQuery({
    queryKey: ["sliderAds"],
    queryFn: async () => {
      const res = await axiosApi.get("/approvedAds");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-2xl text-center font-bold">Loading slider ads...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto mt-32 mb-10 px-4">
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
            <div className="mt-20 w-full flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#f0f4ff] to-[#e6ecfa] border border-blue-200 rounded-2xl shadow-2xl p-6 lg:p-10 h-full transition-all duration-300">
              {/* Text Content */}
              <div className="flex-1 text-left space-y-4">
                {ad.discount && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-blue-300">
                    {ad.discount}% OFF
                  </span>
                )}

                <h2 className="text-4xl font-bold text-[#0f172a]">{ad.itemName}</h2>

                <div className="flex gap-4 items-center">
                  <span className="line-through text-xl text-gray-500">৳{ad.previousPrice}</span>
                  <span className="text-2xl font-bold text-green-700">
                    ৳{Math.floor(ad.previousPrice - (ad.previousPrice * ad.discount) / 100)}
                  </span>
                </div>

                <p className="text-[#334155] max-w-lg leading-relaxed">{ad.message==="N/A" ? "" : ad.message}</p>

                <Link to="/shop">
                  <button className="flex gap-2 items-center mt-4 cursor-pointer bg-[#475569] hover:bg-[#334155] transition-colors text-white py-2 px-6 rounded-full font-semibold text-lg shadow-md">
                    <FaShoppingCart />
                    Shop Now
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1 w-full h-full">
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-300">
                  <img
                    src={ad.image}
                    alt={ad.itemName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
