import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import UseAxiosSecureAPI from "../../CustomHooks/UseAxiosSecureAPI";
import { toast } from "react-toastify";
import { AuthContext } from "../../Authentication/AuthContext";
import { BsFillCartCheckFill } from "react-icons/bs";
import '../Shop/Shop.css';
import { ReTitleProvider } from 're-title';


const CategoryDetails = () => {
  const { categoryName } = useParams();
  const axiosApi = UseAxiosSecureAPI();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [itemsPerPage , setItemsPerPage] = useState(5);

  const [currentPage , setCurrentPage] = useState(0);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"

  const [searchText , setSearchText] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  const {user} = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["categoryMedicines", categoryName, currentPage, itemsPerPage, sortBy, sortOrder, searchTrigger ],
    queryFn: async () => {
      const res = await axiosApi.get(
        `/categoryPagination?category=${categoryName}&page=${currentPage}&items=${itemsPerPage}&sortBy=${sortBy}&order=${sortOrder}&search=${searchTrigger}`
      );
      return res.data;
    },
    enabled: !!categoryName,
  });
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async (medicine) => {
      const addToCart = {
        email: user.email,
        medicineId: medicine._id,
        name: medicine.name,
        company: medicine.company,
        price: medicine.price,
        payment_status: "Pending",
        quantity: 1
      };

      const res = await axiosApi.post("/myCart", addToCart);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Medicine added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.warning("Already in cart");
      } else {
        toast.error("Failed to add to cart");
      }
    }
  });

  // const { data: totalCount = 0 } = useQuery({
  //   queryKey: ["categoryCount", categoryName, searchTrigger],
  //   queryFn: async () => {
  //     const res = await axiosApi.get(`/categoryPagination?category=${categoryName}&search=${searchTrigger}`);
  //     return res.data.total; // not .count
  //   },
  // });
  // // console.log(count);

  const medicines = data?.result || [];
  const totalCount = data?.total || [];

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  console.log(pages);

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


  return (
    <ReTitleProvider defaultTitle="Category Medicine">
      <div className="p-6 mt-10">
        <h1 className="mb-20 text-4xl font-bold text-[#080c3b]">
          Medicines in "{decodeURIComponent(categoryName)}"
        </h1>

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
              <option value="unit">Unit</option>
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

        {isLoading ? (
          <p>Loading...</p>
        ) : medicines.length === 0 ? (
          <p className="text-xl text-gray-600">No medicines found in this category.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border text-[#080c3b]">
              <thead className="bg-gray-100 text-lg">
                <tr className="text-2xl text-center text-[#080c3b]">
                  <th>#</th>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Generic</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med, i) => (
                  <tr key={med._id} className="text-2xl text-center">
                    <td>{currentPage * itemsPerPage + i + 1}</td>
                    <td>
                      <img src={med.image} alt="med" className="w-12 h-12 rounded" />
                    </td>
                    <td>{med.name}</td>
                    <td>{med.generic}</td>
                    <td>{med.company}</td>
                    <td>৳{med.price.toFixed(2)}</td>
                    <td>{med.unit}</td>
                    <td>
                      <label
                        htmlFor="medicine-view-modal"
                        className="btn btn-sm text-xl bg-[#98A1BC] hover:bg-[#7f89a4]"
                        onClick={() => {
                          setSelectedMedicine(med);
                          setShowModal(true);
                        }}
                      >
                        <FaEye /> View
                      </label>
                      <button
                        className="ml-5 btn btn-sm text-xl bg-[#98A1BC] hover:bg-[#7f89a4]"
                        onClick={() => addToCartMutation.mutate(med)}
                      >
                        <BsFillCartCheckFill></BsFillCartCheckFill>Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

        {/* DaisyUI Modal */}
        {showModal && selectedMedicine && (
          <>
            <input type="checkbox" id="medicine-view-modal" className="modal-toggle" checked readOnly />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box bg-white text-[#080c3b] relative">
                <label
                  htmlFor="medicine-view-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </label>
                <h3 className="font-bold text-3xl mb-4">{selectedMedicine.name}</h3>
                <img src={selectedMedicine.image} alt="medicine" className="w-40 h-40 rounded mx-auto mb-4" />
                <div className="space-y-2 text-xl">
                  <p><strong>Generic:</strong> {selectedMedicine.generic}</p>
                  <p><strong>Company:</strong> {selectedMedicine.company}</p>
                  <p><strong>Category:</strong> {selectedMedicine.category}</p>
                  <p><strong>Unit:</strong> {selectedMedicine.unit}</p>
                  <p><strong>Price:</strong> ৳{selectedMedicine.price.toFixed(2)}</p>
                  <p><strong>Discount:</strong> {selectedMedicine.discount || 0}%</p>
                  <p><strong>Description:</strong> {selectedMedicine.description}</p>
                  <p><strong>Added On:</strong> {new Date(selectedMedicine.added_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ReTitleProvider>
  );
};

export default CategoryDetails;
