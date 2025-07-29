import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import Swal from "sweetalert2";
import { ReTitleProvider } from "re-title";

const ManageUsers = () => {
  const axiosApi = UseAxiosSecureAPI();

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosApi.get("/users");
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosApi.patch(`users/role/${id}`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, newRole) => {
    const confirm = await Swal.fire({
      title: `Confirm role change to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    await updateRole({ id, role: newRole });
    Swal.fire("Success", `Role updated to ${newRole}`, "success");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-700"></div>
      </div>
    );
  }

  // Find if an admin already exists
  const currentAdmin = allUsers.find((user) => user.role === "admin");
  // console.log(allUsers)
  
  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <ReTitleProvider defaultTitle="Manage Users">
      <div className="p-6 mt-10">
        <div>
          <h1 className="text-4xl font-bold text-[#080c3b]">Manage All Users</h1>
          <h1 className="mt-4 text-2xl font-bold text-[#080c3b]">
            Currently <span className="italic">{allUsers.length}</span> user(s) are registered.
          </h1>
        </div>

        <div className="overflow-x-auto mt-10">
          <table className="table table-zebra w-full border text-center">
            <thead className="bg-[#DED3C4] text-[#080c3b] text-2xl">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Account created</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, i) => (
                <tr className="text-2xl text-[#080c3b]" key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.created_at)}</td>
                  <td className="font-bold capitalize">{user.role}</td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    {/* Admin control */}
                    <button
                      className="btn bg-[#080c3b] text-2xl font-bold text-black"
                      disabled={
                        user.role === "admin" || (currentAdmin && currentAdmin._id !== user._id)
                      }
                      onClick={() => handleRoleChange(user._id, "admin")}
                    >
                      {user.role === "admin" ? "Admin" : "Make Admin"}
                    </button>

                    {/* Seller control */}
                    {user.role !== "seller" && (
                      <button
                        className="btn bg-[#F4EBD3] text-[#555879] text-2xl font-bold"
                        onClick={() => handleRoleChange(user._id, "seller")}
                      >
                        Make Seller
                      </button>
                    )}

                    {/* Downgrade to user */}
                    {user.role !== "user" && (
                      <button
                        className="btn bg-[#DED3C4] text-[#555879] text-2xl font-bold"
                        onClick={() => handleRoleChange(user._id, "user")}
                      >
                        Downgrade to User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ReTitleProvider>
  );
};

export default ManageUsers;
