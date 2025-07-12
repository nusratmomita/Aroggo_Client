import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: 'Dr. Rezaul Karim',
    role: 'Pharmacist, Dhaka',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    review:
      "Excellent platform. Fast delivery and reliable medicine sources. Great for both professionals and patients.",
  },
  {
    id: 2,
    name: 'Tanvir Hasan',
    role: 'Customer, Chittagong',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 4,
    review:
      "I’ve saved a lot on regular medicines with their discounts. Easy to use and very trustworthy service.",
  },
  {
    id: 3,
    name: 'Mahmudul Hasan',
    role: 'Father & Customer',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    review:
      "Buying medicine for my parents is now hassle-free. The app is smooth, and delivery is always on time.",
  },
];

const CustomerReview = () => {
  return (
    <div className="py-16 px-6 md:px-20 text-center">
      <h2 className="text-6xl font-bold mb-15 text-center text-[#080c3b]">What Our Customers Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#DED3C4] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-[#080c3b]"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4 border-4 border-[#98A1BC] object-cover"
            />
            <h3 className="text-xl font-semibold">{review.name}</h3>
            <p className="text-lg text-[#555879] mb-2">{review.role}</p>
            <div className="flex justify-center mb-3 text-[#555879]">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="h-6 w-6" />
              ))}
            </div>
            <p className="text-xl font-bold text-[#080c3b]">"{review.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReview;
