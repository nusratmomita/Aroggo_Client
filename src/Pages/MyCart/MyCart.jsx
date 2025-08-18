import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { AuthContext } from "../../Authentication/AuthContext";
import Swal from "sweetalert2";
import { FaPlus, FaMinus, FaTrash, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router";
import { ReTitleProvider } from 're-title';


const CartPage = () => {
  const { user } = useContext(AuthContext);

  const axiosApi = UseAxiosSecureAPI();

  const queryClient = useQueryClient();

  // to show myCart
  const { data: cartItems = [],isLoading,isError } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosApi.get(`/myCart?email=${user.email}`);
      return res.data;
    },
  });

  // console.log(cartItems)

  // to update the quantity
  const { mutateAsync: changeQuantity } = useMutation({
    mutationFn: async ({ id, change }) => {
      return await axiosApi.patch(`/myCart/ChangeQuantity/${id}`, { change });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCart", user?.email]);
    },
  });

  // to remove a single item form the cart
  const { mutateAsync: removeItem } = useMutation({
    mutationFn: async (id) => {
      return await axiosApi.delete(`/myCart/singleItem/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCart", user?.email]);
    },
  });

  // to clear the whole cart
  const { mutateAsync: clearCart } = useMutation({
    mutationFn: async () => {
      return await axiosApi.delete(`/myCart/remove?email=${user?.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCart", user?.email]);
    },
  });

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  

  // to handle removing an item
  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id);
        Swal.fire("Removed!", "The item has been removed.", "success");
      }
    });
  };

  // to handle clear the cart
  const handleClearCart = () =>{
    Swal.fire({
      title: "Clear entire cart?",
      text: "This will remove all items from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, clear it",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Cleared!", "Your cart is now empty.", "success");
      }
    });
  }



  // to formate date
  const formateDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
        timeZone: "UTC",
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
  };
  // console.log(cartItems)

  return (
    <ReTitleProvider defaultTitle="My Cart">
      <div className="p-8">
        {isLoading ? (
          <p className="text-xl">Loading your cart...</p>
        ) : isError ? (
          <p className="text-xl text-red-600">Failed to load cart.</p>
        ) : (
          <div className="p-8">
            <h2 className="text-4xl font-bold text-[#080c3b] mb-6 mt-50">Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className=" flex flex-col gap-5 items-center justify-center text-center">
                <p className="text-[#080c3b] text-4xl">No items in cart</p>
                <Link to="/shop">
                  <button className="btn text-[#080c3b] text-3xl font-bold bg-[#98A1BC] btn-lg hover:opacity-90">
                      <FaCartPlus></FaCartPlus>Add Medicines to Cart
                  </button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white rounded-lg shadow">
                  <thead className="bg-[#DED3C4] text-[#080c3b] text-center text-2xl">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Added On</th>
                      <th>Price (৳)</th>
                      <th>Quantity</th>
                      <th>Total (৳)</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item._id} className="text-[#080c3b] text-center text-2xl">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.company}</td>
                        <td>{formateDate(item.added_at)}</td>
                        <td>{item.price}</td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              className="btn btn-sm"
                              onClick={()=> item.quantity > 1 && changeQuantity({id: item._id,change: -1})}
                            >
                              <FaMinus />
                            </button>
                            {item.quantity}
                            <button 
                              className="btn btn-sm"
                              onClick={()=> changeQuantity({id: item._id,change: 1})}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td>৳{item.quantity * item.price}</td>
                        <td>
                          <span
                            className={`px-10 py-1 rounded-full text-2xl font-semibold 
                              ${item.payment_status === 'Paid' 
                                ? 'bg-green-100 text-green-700 border border-green-400' 
                                : 'bg-yellow-100 text-yellow-700 border border-yellow-400'}
                            `}
                          >
                            {item.payment_status.charAt(0).toUpperCase() + item.payment_status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <button className="btn text-[#080c3b] text-2xl font-bold bg-[#98A1BC] btn-lg" onClick={() => handleRemoveItem(item._id)}><FaTrash></FaTrash>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-5">
                <div className="text-3xl font-bold text-[#080c3b]">
                    Your Total: <span className="italic">৳{calculateTotal()}</span>
                </div>
                <button
                    onClick={handleClearCart}
                    className="btn text-[#080c3b] text-3xl font-bold bg-[#98A1BC] btn-lg hover:opacity-90"
                  >
                    Clear Cart
                </button>
                {
                  cartItems.some(medicine => medicine.payment_status !== "Paid") ? (
                    <Link to="/payment">
                      <button className="whitespace-nowrap btn text-[#080c3b] text-3xl font-bold bg-[#98A1BC] btn-lg hover:opacity-90">
                        Proceed to Checkout
                      </button>
                    </Link>
                  ) : (
                    <button className="btn text-[#080c3b] text-3xl font-bold bg-[#98A1BC] btn-lg hover:opacity-90">
                      You already paid
                    </button>
                  )
                }
              </div>
            )}
              </div>
            )}
      </div>
    </ReTitleProvider>
  );
};

export default CartPage;
