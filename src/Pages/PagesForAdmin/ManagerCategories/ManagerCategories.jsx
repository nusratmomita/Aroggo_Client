import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaPlus, FaThList } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosSecureAPI from '../../../CustomHooks/UseAxiosSecureAPI';


const ManageCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryImage , setCategoryImage] = useState('');
  
  const { register, handleSubmit, reset , formState:{errors} } = useForm();
  const axiosApi = UseAxiosSecureAPI();
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosApi.get("/categories");
      console.log(res.data)
      return res.data;
    },
  });

  // Mutation to add category
  const addCategory = useMutation({
    mutationFn: async (newCategory) => {
      const res = await axiosApi.post("/categories", newCategory);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Category added", "success");
      queryClient.invalidateQueries(["categories"]);
      reset();
      setShowModal(false);
    },
    onError: () => {
      Swal.fire("Error", "Could not add category", "error");
    },
  });

  const handlePhotoUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image" , image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key_api}`;

    const res = await axiosApi.post(imageUploadUrl,formData);
    setCategoryImage(res.data.data.url);
  };

  const onSubmit = async (data) => {
    console.log(data)
    const newCategory = {
      categoryName: data.name,
      categoryImage: categoryImage,
      added_at: new Date().toISOString(),
    };
    console.log(newCategory)
    addCategory.mutate(newCategory);
  };

  return (
    <div className="p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">Manage Categories</h2>
        <button onClick={() => setShowModal(true)} className="btn bg-[#98A1BC] text-[#080c3b] text-2xl  hover:bg-[#7f89a4]">
          <FaPlus /> Add Category
        </button>
      </div>

      {
        categories.length === 0 ?
        <p className="text-xl text-gray-600">
          You haven't added any categories yet. Click “Add Medicine” to get started.
        </p>
        :
      <div className="mt-20 overflow-x-auto">
        <table className="table table-zebra w-full border text-2xl">
          <thead>
            <tr className="bg-[#DED3C4] text-[#080c3b] text-2xl">
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Added At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id} className='text-2xl'>
                <td>{index + 1}</td>
                <td>{cat.categoryName}</td>
                <td>
                  <img src={cat.categoryImage} alt={cat.category_name} className="w-12 h-12 rounded" />
                </td>
                <td>{new Date(cat.added_at).toLocaleDateString()}</td>
                <td>
                    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }

      {/* Modal */}
      {showModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4 text-[#080c3b]">Add Category</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Category Name"
                className="input input-bordered w-full text-xl"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-700">Category Name is required</p>
              )}
              <input
                type="file"
                {...register("image", { required: true })}
                onChange={handlePhotoUpload}
                placeholder="Image URL"
                className="input input-bordered w-full text-xl"
              />
              {errors.image?.type === "required" && (
                <p className="text-red-700">Category Image is required</p>
              )}
              <div className="modal-action">
                <button type="submit" className="btn bg-[#98A1BC] text-[#080c3b] text-xl hover:bg-gray-300 border-none">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn bg-[#98A1BC] text-[#080c3b] text-xl hover:bg-gray-300 border-none"
                  onClick={() => {
                    reset();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCategories;
