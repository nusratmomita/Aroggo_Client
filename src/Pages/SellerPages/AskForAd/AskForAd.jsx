import React, { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Authentication/AuthContext";
import { FaBullhorn } from "react-icons/fa";
import { toast } from "react-toastify";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import { ReTitleProvider } from 're-title';


const AskForAd = () => {
  const { user } = useContext(AuthContext);
  const axiosApi = UseAxiosSecureAPI();
  const queryClient = useQueryClient();

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [discountImage , setDiscountImage] = useState("");
  

  // to format the date
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

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["myMedicines", user?.email],
    queryFn: async () => {
      const res = await axiosApi.get(`/medicines/email?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleAdRequest = async (e) => {
    e.preventDefault();
    const form = e.target;

    const adRequest = {
      medicineId: selectedMedicine._id,
      sellerEmail: user.email,
      itemName: selectedMedicine.name,
      previousPrice: selectedMedicine.price,
      discount: parseFloat(form.discount.value),
      message: form.message.value,
      image: discountImage,
      status: "Pending",
      requestedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosApi.post("/adRequest", adRequest);
      if (res.data.insertedId) {
        toast.success("Ad request submitted! Admin will update the status.");
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["adRequests", user.email] });
      }
    } catch (err) {
        console.log(err)
        toast.error("Failed to request ad.");
    }
  };

  // Fetch ad requests of the current user
  const { data: adRequests = [] } = useQuery({
    queryKey: ["adRequests", user?.email],
    queryFn: async () => {
      const res = await axiosApi.get(`/adRequest/email?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const getAdStatus = (medicineId) => {
    const ad = adRequests.find(req => req.medicineId === medicineId);
    return ad?.status || "Not Requested";
  };

  const handlePhotoUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image" , image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key_api}`;

    const res = await axiosApi.post(imageUploadUrl,formData);
    setDiscountImage(res.data.data.url);
  }

  return (
    <ReTitleProvider defaultTitle="Ask For Add">
      <div className="p-6 mt-10">
        <h1 className="text-4xl font-bold text-[#080c3b] mb-6">Ask for Advertisement</h1>

        {isLoading ? (
          <p>Loading medicines...</p>
        ) : medicines.length === 0 ? (
          <p className="text-xl text-gray-600">You haven't added any medicines yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-20 table table-zebra w-full border text-[#080c3b]">
              <thead className="bg-gray-100 text-lg">
                <tr className="text-2xl text-center text-[#080c3b]">
                  <th>#</th>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Generic</th>
                  <th>Price</th>
                  <th>Added Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med, index) => (
                  <tr key={med._id} className="text-2xl text-center">
                    <td>{index + 1}</td>
                    <td>
                      <img src={med.image} alt="med" className="w-12 h-12 rounded" />
                    </td>
                    <td>{med.name}</td>
                    <td>{med.generic}</td>
                    <td>৳{med.price.toFixed(2)}</td>
                    <td>{formateDate(med.added_at)}</td>
                    <td>
                      <span
                        className={`p-2 whitespace-nowrap rounded-2xl text-white ${
                          getAdStatus(med._id) === "Pending"
                            ? "bg-yellow-500"
                            : getAdStatus(med._id) === "Accepted"
                            ? "bg-green-600"
                            : getAdStatus(med._id) === "Rejected"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {getAdStatus(med._id)}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedMedicine(med);
                          setShowModal(true);
                        }}
                        className="btn  p-2 whitespace-nowrap rounded-2xl bg-[#98A1BC] text-[#080c3b] hover:bg-[#7f89a4] text-2xl"
                      >
                        <FaBullhorn className="mr-1" />
                        Request Ad
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedMedicine && (
          <>
            <input type="checkbox" id="ad-modal" className="modal-toggle" checked readOnly />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box bg-white text-[#080c3b]">
                <h3 className="font-bold text-2xl mb-4">Request Ad for "{selectedMedicine.name}"</h3>
                <form onSubmit={handleAdRequest} className="space-y-4 text-lg">
                  <p>Previous Price: <strong>৳{selectedMedicine.price.toFixed(2)}</strong></p>
                  <label className="font-bold text-2xl mb-2">Ad Banner Image (optional but recommended):</label>
                  <input
                    type="file"
                    name="adImage"
                    accept="image/*"
                    className="file-input file-input-bordered w-full text-2xl"
                    onChange={handlePhotoUpload}
                  />
                  <input
                    name="discount"
                    type="number"
                    min="0"
                    max="80"
                    placeholder="New Discount (%)"
                    required
                    className="input input-bordered w-full text-2xl"
                  />
                  <textarea
                    name="message"
                    placeholder="Why should this be advertised? (optional)"
                    className="textarea textarea-bordered w-full text-2xl"
                  ></textarea>
                  <div className="modal-action">
                    <button type="submit" className="btn bg-[#98A1BC] text-[#080c3b] text-xl hover:bg-gray-300 border-none">Submit Request</button>
                    <button onClick={() => setShowModal(false)} className="btn bg-[#98A1BC] text-[#080c3b] text-xl hover:bg-gray-300 border-none">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </ReTitleProvider>
  );
};

export default AskForAd;
