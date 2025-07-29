import React, { useContext, useState } from "react";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthContext";
import { FaEye, FaCartPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import "./Shop.css";
import { ReTitleProvider } from 're-title';


const Shop = () => {
  const axiosApi = UseAxiosSecureAPI();

  const { user } = useContext(AuthContext);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(0);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"

  const [searchText , setSearchText] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  const {
    data,
    isLoading,
    isError: error,
  } = useQuery({
    queryKey: ["allMedicines", currentPage, itemsPerPage, sortBy, sortOrder , searchTrigger],
    queryFn: async () => {
      const res = await axiosApi.get(
        `/medicinePagination?page=${currentPage}&items=${itemsPerPage}&sortBy=${sortBy}&order=${sortOrder}&search=${searchTrigger}`
      );
      return res.data;
    },
  });
  // console.log(allMedicines);

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
      console.log(res.data);
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
  const formateDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const allMedicines = data?.result || [];
  const total = data?.total || 0;

  const numberOfPages = Math.ceil(total / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Something went wrong!</p>
  );



  return (
    <ReTitleProvider defaultTitle="Shop">
      <div className="p-5">
        <h2 className="mt-15 text-5xl font-bold mb-4 text-center text-[#080c3b]">
          Available Medicine(s): {allMedicines.length}
        </h2>

        <div className="flex justify-between items-center mx-20">
          <div className="mt-10 flex gap-4 items-center mb-6">
            <label className="text-2xl text-[#080c3b] whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(0); // reset pagination
              }}
              className="select border text-xl"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="discount">Discount</option>
              <option value="added_at">Date Added</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(0);
              }}
              className="select border text-xl"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="mt-10 flex gap-3 mb-4 items-center">
            <label className="text-2xl text-[#080c3b] whitespace-nowrap">Search Medicine:</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
              className="input text-2xl input-bordered w-full max-w-xs"
            />

            <button
              className="btn text-2xl font-bold bg-[#DED3C4] hover:bg-[#c7bbaf]"
              onClick={() => {
                setSearchTrigger(searchText); // triggers search
                setCurrentPage(0); // reset to first page
              }}
            >
              Search
            </button>
          </div>
        </div>

        {
          isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : data?.result?.length === 0 ? (
            <p className="mt-20 mb-20 text-center text-[#080c3b] text-3xl font-semibold">
              No medicines found with the name "{searchTrigger}"
            </p>
          ) :

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
                    <td>{currentPage * itemsPerPage + index + 1}</td>
                    <td>{medicine.sellerEmail}</td>
                    <td>{medicine.name}</td>
                    <td>{medicine.company}</td>
                    <td>{formateDate(medicine.added_at)}</td>
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
        }

        <div>
          <div className="pagination">
            {/* <h4 className="text-2xl">Current Page : {currentPage}</h4> */}
            <button onClick={handlePrevPage}>Prev</button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "selected" : ""}
              >
                {page+1}
              </button>
            ))}
            <button onClick={handleNextPage}>Next</button>
            <select
              value={itemsPerPage}
              name=""
              id="dropDown"
              onChange={handleItemsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
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
    </ReTitleProvider>
  );
};

export default Shop;
