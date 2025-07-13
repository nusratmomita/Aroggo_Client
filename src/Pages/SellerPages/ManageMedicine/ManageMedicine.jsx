import React from "react";
import { FaPlus } from "react-icons/fa";

const ManageMedicine = () => {


  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const form = e.target;

    const medicine = {
    //   sellerEmail: user.email,
      name: form.name.value,
      generic: form.generic.value,
      description: form.description.value,
    //   image: imageURL,
      category: form.category.value,
      company: form.company.value,
      unit: form.unit.value,
      price: parseFloat(form.price.value),
      discount: parseFloat(form.discount.value || 0),
      added_at: new Date().toISOString(),
    };
  };

  return (
    <>
        <h1>Hi</h1>
    </>
    // <div className="p-6">
    //   <div className="flex justify-between items-center mb-6">
    //     <h1 className="text-4xl font-bold text-[#080c3b]">Manage Your Medicines</h1>
    //     <button
    //     //   onClick={() => setShowModal(true)}
    //       className="flex items-center gap-2 px-4 py-2 bg-[#98A1BC] text-white rounded-xl hover:bg-[#7f89a4]"
    //     >
    //       <FaPlus /> Add Medicine
    //     </button>
    //   </div>

    //   {/* {medicines.length === 0 ? (
    //     <p className="text-xl text-gray-600">
    //       You haven't added any medicines yet. Click “Add Medicine” to get started.
    //     </p>
    //   ) : (
    //     <div className="overflow-x-auto">
    //       <table className="table w-full border">
    //         <thead className="bg-gray-100 text-[#080c3b]">
    //           <tr>
    //             <th>#</th>
    //             <th>Name</th>
    //             <th>Generic</th>
    //             <th>Company</th>
    //             <th>Unit</th>
    //             <th>Price</th>
    //             <th>Discount</th>
    //             <th>Image</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {medicines.map((med, i) => (
    //             <tr key={med._id}>
    //               <td>{i + 1}</td>
    //               <td>{med.name}</td>
    //               <td>{med.generic}</td>
    //               <td>{med.company}</td>
    //               <td>{med.unit}</td>
    //               <td>${med.price.toFixed(2)}</td>
    //               <td>{med.discount}%</td>
    //               <td>
    //                 <img src={med.image} alt="med" className="w-12 h-12 rounded" />
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   )}

    //   {/* Modal */}
    //   {showModal && (
    //     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    //       <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
    //         <button
    //           onClick={() => setShowModal(false)}
    //           className="absolute right-4 top-3 text-xl"
    //         >
    //           ✖
    //         </button>
    //         <h2 className="text-2xl font-semibold mb-4 text-[#080c3b]">Add New Medicine</h2>
    //         <form onSubmit={handleAddMedicine} className="space-y-4">
    //           <input name="name" required placeholder="Item Name" className="input input-bordered w-full" />
    //           <input name="generic" required placeholder="Generic Name" className="input input-bordered w-full" />
    //           <textarea name="description" required placeholder="Short Description" className="textarea textarea-bordered w-full" />
    //           <input type="file" required onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
    //           <select name="category" required className="select select-bordered w-full">
    //             <option disabled selected>Select Category</option>
    //             <option>Tablet</option>
    //             <option>Syrup</option>
    //             <option>Injection</option>
    //           </select>
    //           <select name="company" required className="select select-bordered w-full">
    //             <option disabled selected>Select Company</option>
    //             <option>Square</option>
    //             <option>Beximco</option>
    //             <option>ACI</option>
    //           </select>
    //           <select name="unit" required className="select select-bordered w-full">
    //             <option>MG</option>
    //             <option>ML</option>
    //           </select>
    //           <input name="price" type="number" min="0" required placeholder="Per Unit Price" className="input input-bordered w-full" />
    //           <input name="discount" type="number" defaultValue={0} min="0" max="100" placeholder="Discount (%)" className="input input-bordered w-full" />
    //           <button type="submit" className="btn w-full bg-[#98A1BC] text-white">Submit</button>
    //         </form>
    //       </div>
    //     </div>
    //   )} */}
    // </div>
  );
};

export default ManageMedicine;
