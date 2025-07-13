// register page
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Authentication/AuthContext";
import { toast } from "react-toastify";
import UseCommonAxiosSecureAPI from "../../CustomeHooks/UseCommonAxiosSecureAPI";

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {handleRegister , handleGoogleAuth , handleUpdateProfile } = useContext(AuthContext);

  const axiosApi = UseCommonAxiosSecureAPI();


  const navigate = useNavigate();

  const [profileImage , setProfileImage] = useState('');

  const handleRegisterForm = async (data) => {
  const { email, password, role, name } = data;

  try {
    await handleRegister(email, password);

    const userInfo = {
      email,
      role,
      created_at: new Date().toISOString(),
    };

    const res = await axiosApi.post("/users", userInfo);

    if (res.data.insertedId) {
      const updatedProfile = {
        displayName: name,
        photoURL: profileImage,
      };
      await handleUpdateProfile(updatedProfile);
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  } 
  catch (err) {
    console.log(err)
    toast.error("You have put invalid credentials. Please try again.");
    }
  };


  const handleGoogle = () => {
    handleGoogleAuth()
    .then(async (result)=>{
      const user = result.user;
      // console.log(user);

      const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString()
      }
    
      try{
        const res = await axiosApi.post("/users", userInfo);
        console.log(res.data);

        if(res.data.insertedId){
          toast.error("You have created a Google account successfully!")
          setTimeout(()=>{
            navigate('/');
          },1500)
      
        }
      }
      catch(err){
        console.log(err)
        toast.error("Something went wrong.Please try again.");
      }
  })
    .catch((error)=>{
      console.log(error)
      toast.error("Google sign-in failed. Please try again.")
    })
  }
    
  const handlePhotoUpload = async(e) => {
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.append("image" , image);
    
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key_api}`;
    // console.log(imageUploadUrl)

    const res = await axiosApi.post(imageUploadUrl,formData);
    setProfileImage(res.data.data.url);
  }


  return (
    <div className="hero min-h-screen">
      <div className="hero-content w-full rounded-3xl mt-20 p-25  flex-col justify-evenly lg:flex-row">
        <div className="p-2 rounded-2xl w-full max-w-lg shrink-0 shadow-2xl">
          <div className="p-6 flex flex-col max-w-lg rounded-2xl sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-[#080c3b] text-4xl  font-bold underline">Register</h1>
              <p className="text-lg text-[#080c3b] dark:text-gray-600">
                Create an Account to Continue
              </p>
              <div className="mt-5 border-b-2 border-dashed border-black"></div>
            </div>
            <form
              className="space-y-12 "
              onSubmit={handleSubmit(handleRegisterForm)}
            >
              <div className="space-y-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                <div>
                  <label htmlFor="name" className="block mb-2 text-3xl">
                    Name
                  </label>
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-700">Password is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-3xl">
                    Enter Email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-700">Password is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="photo" className="block mb-2 text-3xl">
                    Photo URL
                  </label>
                  <input
                  {...register("photo" ,{required: true})}
                    onChange={handlePhotoUpload}
                    type="file"
                    name="photo"
                    id="photoURL"
                    placeholder="photo URL"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.photo?.type === "required" && (
                    <p className="text-red-700">Photo is required</p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-3xl">
                      Enter Password
                    </label>
                  </div>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                        message: "Password must contain at least one uppercase and one lowercase letter"
                      }
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-700">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-700">
                      Password must be 6 characters long!
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-700">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2 lg:col-span-1">
                    <label className="block mb-2 text-3xl">Select a Role</label>
                    <div className="flex gap-6 text-2xl text-[#080c3b]">
                        <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="user"
                            {...register("role", { required: true })}
                            className="radio radio-accent"
                        />
                        User
                        </label>
                        <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="seller"
                            {...register("role", { required: true })}
                            className="radio radio-accent"
                        />
                        Seller
                        </label>
                    </div>
                    {errors.role && (
                        <p className="text-red-700 mt-2">Please select a role</p>
                    )}
                    </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full px-8 py-3 text-3xl font-semibold rounded-md bg-[#98A1BC] text-[#080c3b]"
                  >
                    Register
                  </button>
                </div>
                <h1 className="text-center text-2xl font-bold">Or</h1>
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="btn whitespace-nowrap w-full bg-white text-black text-xl border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="25"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Register with Google
                </button>
                <div className="divider"></div>
                <p className="whitespace-nowrap px-6 text-xl text-center dark:text-gray-600">
                  Already Have An Account?
                  <NavLink className="underline text-[#080c3b]" to="/login">
                    {" "}
                    Login here
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
