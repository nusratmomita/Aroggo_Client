import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { Link } from "react-router";


const Categories = () => {
  const axiosApi = UseAxiosSecureAPI();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["medicineCategories"],
    queryFn: async () => {
      const res = await axiosApi.get("/category");
      return res.data;
    }
  });
  console.log(categories)

  if (isLoading) return <p className="text-center text-2xl">Loading Categories...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load categories.</p>;

  return (
      <div className="p-6">
        <h1 className="text-4xl font-bold text-[#080c3b] mb-10 text-center">Top Medicine Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
          <Link to={`/category/${cat.categoryName}`}>
            <div
              key={index}
              className="card bg-base-100 shadow-xl border border-[#DED3C4] hover:shadow-2xl transition-all"
            >
              <figure className="h-48 bg-[#F4EBD3]">
                <img
                  src={cat.categoryImage || "https://i.ibb.co/WpYzJMz/healthcare.jpg"}
                  alt={cat.categoryName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center text-[#080c3b]">
                <h2 className="card-title text-2xl capitalize">{cat.categoryName}</h2>
                <p className="text-lg">{cat.count} Medicines Available</p>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
  );
};

export default Categories;
