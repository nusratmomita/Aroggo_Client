import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { AuthContext } from "../../Authentication/AuthContext";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const axiosApi = UseAxiosSecureAPI();

  const {
    data: cartItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email, // wait until user is available
    queryFn: async () => {
      const res = await axiosApi.get(`/myCart?email=${user.email}`);
      return res.data;
    },
  });

  // to formate date
    const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-US', options);
    };

  return (
    <div className="p-8">
      <h2 className="text-4xl text-[#080c3b] font-bold mb-6">Your Cart</h2>

      {isLoading ? (
        <p className="text-xl">Loading your cart...</p>
      ) : isError ? (
        <p className="text-xl text-red-600">Failed to load cart.</p>
      ) : cartItems.length === 0 ? (
        <p className="text-xl text-gray-600">No items in cart</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 bg-[#F4EBD3] rounded-xl shadow"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[#080c3b]">Medicine Name: {item.name}</h3>
                <p className="text-xl font-semibold text-[#080c3b]">Company: {item.company}</p>
                <p className="text-2xl font-bold">Price per unit: ৳{item.price}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-left">Quantity: {item.quantity}</p>
                <p className="mt-5 text-2xl font-bold text-[#080c3b]">Added On: {formatDate(item.added_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
