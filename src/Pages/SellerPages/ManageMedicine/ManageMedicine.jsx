import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../../Authentication/AuthContext";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ManageMedicine = () => {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [medicineImage, setMedicineImage] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const [currentPage, setCurrentPage] = useState(0);

  const axiosApi = UseAxiosSecureAPI();

  const handlePhotoUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_key_api
    }`;

    const res = await axiosApi.post(imageUploadUrl, formData);
    setMedicineImage(res.data.data.url);
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const form = e.target;

    const medicineInfo = {
      sellerEmail: user?.email,
      name: form.name.value,
      description: form.description.value,
      image: medicineImage,
      category: form.category.value,
      generic: form.generic.value,
      company: form.company.value,
      unit: form.unit.value,
      price: parseFloat(form.price.value),
      discount: parseFloat(form.discount.value || 0),
      added_at: new Date().toISOString(),
    };
    console.log(medicineInfo);
    const res = await axiosApi.post("/medicines", medicineInfo);
    console.log(res.data);
    if (res.data.insertedId) {
      toast.success("New medicine added successfully!");

      await queryClient.invalidateQueries({
        queryKey: ["myMedicines", user?.email],
      });
      form.reset();
      setMedicineImage("");
      showModal(false);
    } else {
      toast.error(
        "There are some error adding this medicine. Please try again."
      );
    }
  };

  // to load data per email
  const { data, isLoading } = useQuery({
    queryKey: ["myMedicines", user?.email, currentPage, itemsPerPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosApi.get(
        `/medicines/emailPagination?email=${user?.email}&page=${currentPage}&items=${itemsPerPage}`
      );
      return res.data;
    },
  });

  // to get all categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosApi.get("/categories");
      console.log(res.data);
      return res.data;
    },
  });

  // console.log(categories);

  const medicines = data?.result || [];
  const total = data?.total || 0;
  const numberOfPages = Math.ceil(total / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#080c3b]">
          Manage Your Medicines
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-[#98A1BC] text-[#080c3b] text-2xl hover:bg-[#7f89a4]"
        >
          <FaPlus /> Add Medicine
        </button>
      </div>

      {medicines.length === 0 ? (
        <p className="text-xl text-gray-600">
          You haven't added any medicines yet. Click “Add Medicine” to get
          started.
        </p>
      ) : (
        <div className="overflow-x-auto mt-20">
          <table className="table table-zebra w-full border  text-center">
            <thead className="bg-[#DED3C4] text-[#080c3b]">
              <tr className="text-2xl">
                <th>#</th>
                {/* <th>Seller email</th> */}
                <th>Name</th>
                <th>Category</th>
                <th>Generic</th>
                <th>Company</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, i) => (
                <tr className="text-2xl" key={med._id}>
                  <td>{i + 1}</td>
                  {/* <td>{med.seller_email}</td> */}
                  <td>{med.name}</td>
                  <td>{med.category}</td>
                  <td>{med.generic}</td>
                  <td>{med.company}</td>
                  <td>{med.unit}</td>
                  <td>৳{med.price.toFixed(2)}</td>
                  <td>{med.discount.toLocaleString()}%</td>
                  <td>
                    <img
                      src={med.image}
                      alt="med"
                      className="w-12 h-12 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination text-center mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="btn mx-1 cursor-pointer"
          disabled={currentPage === 0}
        >
          Prev
        </button>

        {[...Array(numberOfPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn mx-1 ${currentPage === page ? "bg-[#DED3C4]" : ""}`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev + 1 < numberOfPages ? prev + 1 : prev
            )
          }
          className="btn mx-1 cursor-pointer"
          disabled={currentPage >= numberOfPages - 1}
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(0); // reset page
          }}
          className="select ml-4 border"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>


      {/* Modal */}
      {showModal && (
        <dialog id="add_medicine_modal" className="modal modal-open">
          <div className="mt-10  modal-box bg-[#555879] text-[#F4EBD3] max-w-2xl">
            <form onSubmit={handleAddMedicine} className="space-y-4 text-lg">
              <h2 className="text-3xl font-semibold mb-4">Add New Medicine</h2>
              <input
                name="name"
                required
                placeholder="Medicine Name"
                className="text-xl input input-bordered w-full text-black"
              />
              <textarea
                name="description"
                required
                placeholder="Short Description"
                className="text-xl textarea textarea-bordered w-full text-black"
              />
              <input
                type="file"
                required
                className="text-black text-xl file-input file-input-bordered w-full"
                onChange={handlePhotoUpload}
              />
              <select
                name="category"
                required
                className="text-xl select select-bordered w-full text-black"
              >
                <option defaultValue={true}>Select Category</option>
                {categories.map((cat, index) => 
                  <option key={index}>{cat.categoryName}</option>
                )}
              </select>
              <select
                name="generic"
                required
                className="text-xl select select-bordered w-full text-black"
              >
                <option defaultValue={true}>Select Generic</option>
                <option>Paracetamol</option>
                <option>Ciprofloxacin</option>
                <option>Azithromycin</option>
                <option>Metronidazole</option>
                <option>Esomeprazole</option>
                <option>Montelukast</option>
                <option>Amlodipine</option>
              </select>
              <select
                name="company"
                required
                className="text-xl select select-bordered w-full text-black"
              >
                <option defaultValue={true}>Select Company</option>
                <option>Square</option>
                <option>Beximco</option>
                <option>ACI</option>
                <option>Opsonin Pharma Ltd</option>
                <option>Beacon Pharmaceuticals Ltd</option>
                <option>Renata Limited</option>
                <option>Aristopharma Ltd</option>
              </select>

              <label htmlFor="unit" className="font-bold text-2xl">
                Item Mass Unit
              </label>
              <input
                name="unit"
                type="number"
                required
                placeholder="Item Mass Unit(ML or MG)"
                className="text-xl input input-bordered w-full text-black"
              />

              <label htmlFor="price" className="font-bold text-2xl">
                Per Unit Price
              </label>
              <input
                name="price"
                type="number"
                min="0"
                required
                placeholder="Per Unit Price"
                className="text-xl input input-bordered w-full text-black"
              />

              <label htmlFor="discount" className="font-bold text-2xl">
                Add Discount(if any)
              </label>
              <input
                name="discount"
                type="number"
                defaultValue={0}
                min="0"
                max="50"
                placeholder="Discount (%)"
                className="text-xl input input-bordered w-full text-black"
              />

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-[#98A1BC] text-[#080c3b] text-xl hover:bg-gray-300 border-none"
                >
                  Add Medicine
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn bg-[#98A1BC] text-[#080c3b] text-xl hover:bg-gray-300 border-none"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageMedicine;

