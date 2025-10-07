import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Authentication/AuthContext";
import { toast } from "react-toastify";
import UseCommonAxiosSecureAPI from "../../CustomHooks/UseCommonAxiosSecureAPI";
import {ArrowRight} from 'lucide-react';
import { FcGoogle } from "react-icons/fc";



const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {handleRegister , handleGoogleAuth , handleUpdateProfile , user } = useContext(AuthContext);

  const axiosApi = UseCommonAxiosSecureAPI();

  const navigate = useNavigate();

  const [profileImage , setProfileImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  if(user){
      user.getIdToken().then((token)=>{
          localStorage.setItem("AccessToken" , token)
      })
  }


  const handleRegisterForm = (data) => {
    setIsLoading(true);

    const email = data.email;
    const password = data.password;
    const role = data.role;
    
    handleRegister(email,password)
      .then(async()=>{
        const userInfo = {
          email : data.email,
          role : role,
          created_at : new Date().toISOString(),
        }

        const res = await axiosApi.post("/users" , userInfo);
        console.log(res.data);

        const updateProfile = {
          displayName:data.name,
          photoURL: profileImage
        }

        handleUpdateProfile(updateProfile)
        .then(() => {
          setTimeout(() => {
            toast.success('🎉 Registration successful! Welcome to Aroggo!');
            setIsLoading(false);
            navigate("/");
          }, 1500);
        });
      })
      .catch((err) => {
      console.log(err);
      toast.error("Registration failed. Please use another email.");
      setIsLoading(false);
    });
    }

    const handleGoogleSignUp = () => {
    setIsLoadingGoogle(true);
    handleGoogleAuth()
    .then((result) => {
      const isNewUser = result?._tokenResponse?.isNewUser;
      if (isNewUser) {
        toast.success("🎉 Registration successful! Welcome to Aroggo!");
      } else {
        toast.info("👋 Welcome back! You already have an account.");
      }
      setTimeout(() => {
        toast.success('🎉 Registration successful! Welcome to Aroggo!');
        setIsLoadingGoogle(false);
        navigate("/");
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 'auth/account-exists-with-different-credential') {
        toast.error("This email is already associated with another account. Try signing in using that method.");
      } 
      else {
        toast.error("Google sign up failed. Please try again.");
      }
      setIsLoadingGoogle(false);
    });
  };
    
    const handlePhotoUpload = async(e) => {
      const image = e.target.files[0];

      const formData = new FormData();
      formData.append("image" , image);
      
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key_api}`;

      const res = await axiosApi.post(imageUploadUrl,formData);
      setProfileImage(res.data.data.url);
    }


  return (
    <div className="min-h-screen mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-[#DED3C4]">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#555879] to-[#080c3b] px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <svg className="w-8 h-8 text-[#555879]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Join Us Today</h1>
            <p className="text-[#DED3C4] text-lg">Create your account and get started</p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-10">
            <form className="space-y-6" onSubmit={handleSubmit(handleRegisterForm)}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm lg:text-2xl font-semibold text-[#080c3b] mb-2">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  className="lg:text-2xl w-full px-4 py-3 border-2 border-[#DED3C4] rounded-lg focus:ring-2 focus:ring-[#555879] focus:border-transparent transition duration-200 text-[#080c3b] placeholder-gray-400"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Name is required
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm lg:text-2xl font-semibold text-[#080c3b] mb-2">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  className="lg:text-2xl w-full px-4 py-3 border-2 border-[#DED3C4] rounded-lg focus:ring-2 focus:ring-[#555879] focus:border-transparent transition duration-200 text-[#080c3b] placeholder-gray-400"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Email is required
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm lg:text-2xl font-semibold text-[#080c3b] mb-2">
                  Password
                </label>
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
                  placeholder="Create a strong password"
                  className="lg:text-2xl  w-full px-4 py-3 border-2 border-[#DED3C4] rounded-lg focus:ring-2 focus:ring-[#555879] focus:border-transparent transition duration-200 text-[#080c3b] placeholder-gray-400"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Photo Upload Field */}
              <div>
                <label htmlFor="photo" className="block text-sm lg:text-2xl font-semibold text-[#080c3b] mb-2">
                  Profile Photo
                </label>
                <div className="relative">
                  <input
                    {...register("photo", { required: true })}
                    onChange={handlePhotoUpload}
                    type="file"
                    name="photo"
                    id="photoURL"
                    accept="image/*"
                    className="lg:text-2xl  w-full px-4 py-3 border-2 border-[#DED3C4] rounded-lg focus:ring-2 focus:ring-[#555879] focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F4EBD3] file:text-[#080c3b] hover:file:bg-[#DED3C4]"
                  />
                </div>
                {errors.photo?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Photo is required
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm lg:text-2xl font-semibold text-[#080c3b] mb-3">
                  Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex items-center justify-center px-4 py-3 border-2 border-[#DED3C4] rounded-lg cursor-pointer hover:bg-[#F4EBD3] hover:border-[#555879] transition duration-200">
                    <input
                      type="radio"
                      value="user"
                      {...register("role", { required: true })}
                      className="sr-only peer"
                    />
                    <div className="flex items-center gap-3 text-[#080c3b] peer-checked:text-[#555879]">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium lg:text-2xl =">User</span>
                    </div>
                    <div className="absolute inset-0 border-2 border-[#555879] rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </label>
                  <label className="relative flex items-center justify-center px-4 py-3 border-2 border-[#DED3C4] rounded-lg cursor-pointer hover:bg-[#F4EBD3] hover:border-[#555879] transition duration-200">
                    <input
                      type="radio"
                      value="seller"
                      {...register("role", { required: true })}
                      className="sr-only peer"
                    />
                    <div className="flex items-center gap-3 text-[#080c3b] peer-checked:text-[#555879]">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="font-medium lg:text-2xl">Seller</span>
                    </div>
                    <div className="absolute inset-0 border-2 border-[#555879] rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Please select a role
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="lg:text-2xl flex justify-center items-center cursor-pointer w-full bg-[#98A1BC] text-[#080c3b] font-semibold py-4 px-6 rounded-lg hover:bg-[#555879] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#98A1BC] transform hover:scale-[1.02] transition duration-200 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DED3C4]"></div>
                </div>
                <div className="relative flex justify-center text-lg">
                  <span className="px-4 bg-white text-[#555879] font-medium">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="lg:text-2xl cursor-pointer w-full flex items-center justify-center gap-3 bg-white border-2 border-[#DED3C4] text-[#080c3b] font-semibold py-4 px-6 rounded-lg hover:bg-[#F4EBD3] hover:border-[#555879] focus:outline-none focus:ring-4 focus:ring-[#DED3C4] transition duration-200"
              >
                
                {isLoadingGoogle ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Google Sign Up
                    <FcGoogle className="w-6 h-6" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-[#555879] mt-6">
                Already have an account?{" "}
                <NavLink to="/login" className="text-[#080c3b] font-semibold hover:text-[#555879] hover:underline transition duration-200">
                  Sign in here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;