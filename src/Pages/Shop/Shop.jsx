import React, { useContext, useState } from "react";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthContext";
import { FaEye, FaCartPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";

const Shop = () => {
  const axiosApi = UseAxiosSecureAPI();

  const { user } = useContext(AuthContext);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const {
    data: allMedicines = [],
    isLoading,
    isError: error,
  } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => {
      const res = await axiosApi.get("/medicines");
      return res.data;
    },
  });
  console.log(allMedicines)

  const handleAddToCart = async (medicine) => {
    if (!user?.email) {
      return Swal.fire(
        "Please Login",
        "You must be logged in to add items to the cart.",
        "warning"
      );
    }

    const cartItem = {
      medicineId: medicine._id,
      name: medicine.name,
      company: medicine.company,
      price: medicine.price,
      quantity: 1,
      payment_status: "Pending",
      email: user.email,
    //  sellerEmail: medicine.sellerEmail,
    };

    try {
      const res = await axiosApi.post("/myCart", cartItem);
      console.log(res.data)
      if (res.data.insertedId) {
        Swal.fire("Added!", "Medicine added to cart", "success");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire(
          "Already in Cart",
          "This medicine is already added to your cart.Want to change quantity? Go to My Cart Page then!",
          "info"
        );
      } else {
        Swal.fire("Error", "Failed to add to cart.", "error");
      }
    }
  };

  // to formate date
  const formatDate = (isoString) => {
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

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Something went wrong!</p>
    );
  return (
    <div className="p-5">
      <h2 className="mt-15 text-5xl font-bold mb-4 text-center text-[#080c3b]">
        Available Medicine(s): {allMedicines.length}
      </h2>

      <div className="mt-20 overflow-x-auto">
        <table className="table table-zebra w-full border text-2xl text-center">
          <thead className="bg-[#F4EBD3] text-[#080c3b] ">
            <tr className="text-2xl">
              <th>#</th>
              <th>Seller Email</th>
              <th>Medicine Name</th>
              <th>Company</th>
              <th>Added On</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allMedicines.map((medicine, index) => (
              <tr key={medicine._id} className="hover">
                <td>{index + 1}</td>
                <td>{medicine.sellerEmail}</td>
                <td>{medicine.name}</td>
                <td>{medicine.company}</td>
                <td>{formatDate(medicine.added_at)}</td>
                <td>৳{medicine.price}</td>
                <td className="flex gap-3 justify-center items-center">
                  <button
                    onClick={() => setSelectedMedicine(medicine)}
                    className="btn btn-sm text-xl bg-[#98A1BC] hover:bg-[#7f89a4]"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="btn btn-sm text-xl bg-[#98A1BC] hover:bg-[#7f89a4]"
                  >
                    <BsFillCartCheckFill></BsFillCartCheckFill>Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedMedicine && (
        <dialog id="medicine_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-[#080c3b]">
              {selectedMedicine.name}
            </h3>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="w-52 mx-auto my-4 rounded"
            />
            <p>
              <strong>Company:</strong> {selectedMedicine.company}
            </p>
            <p>
              <strong>Price:</strong> ৳{selectedMedicine.price}
            </p>
            <p className="mt-2">{selectedMedicine.description}</p>

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => setSelectedMedicine(null)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Shop;
