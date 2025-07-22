import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import Swal from "sweetalert2";

const ManagePayment = () => {
  const axiosApi = UseAxiosSecureAPI();

  // Fetch payment statuses
  const { data: paymentStatuses = [], isLoading, isError } = useQuery({
    queryKey: ["paymentStatuses"],
    queryFn: async () => {
      const res = await axiosApi.get("/paymentStatus");
      return res.data;
    },
  });


   // Fetch acceptance statuses
  const { data: acceptanceStatuses = []} = useQuery({
    queryKey: ["acceptanceStatuses"],
    queryFn: async () => {
      const res = await axiosApi.get("/acceptanceStatus");
      return res.data;
    },
  });

  console.log(acceptanceStatuses);

const queryClient = useQueryClient();

const handleAcceptPayment = useMutation({
  mutationFn: async (transactionId) => {
    const res = await axiosApi.patch(`/acceptanceStatus/${transactionId}`);
    return res.data;
  },
  onSuccess: (data) => {
    Swal.fire("Success", data.message, "success");
    queryClient.invalidateQueries(["acceptanceStatuses"]);
  },
  onError: (error) => {
    Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
  }
});

  if (isLoading) return <p className="text-center text-xl">Loading...</p>;
  if (isError) return <p className="text-center text-red-600">Failed to load payment data.</p>;

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-bold text-[#080c3b]">Manage Payments</h2>
      <div className="overflow-x-auto mt-10 ">
        <table className="table table-zebra w-full border border-gray-300">
          <thead className="bg-[#DED3C4] text-[#080c3b] text-2xl text-center">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Payment Status</th>
              <th>Paid At</th>
              <th>Acceptance Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentStatuses.map((status, index) => (
              <tr key={status._id} className="text-[#080c3b] text-2xl text-center">
                <td>{index + 1}</td>
                <td>{status.email || "N/A"}</td>
                <td className={status.payment_status === "Paid" ? "text-[#080c3b] font-extrabold" : "text-[#555879] font-extrabold"}>
                  {status.payment_status}
                </td>
                <td>{formatDate(status.added_at) || "Not Paid Yet"}</td>
                <td className="text-[#080c3b] font-bold">
                   {
                        acceptanceStatuses.find(
                        (a) => a.email === status.email
                        )?.acceptance_status || "Pending"
                   }
                </td>
                <td>
                    <button
                        onClick={handleAcceptPayment}
                        className="whitespace-nowrap btn bg-[#080c3b] text-xl font-bold text-[#DED3C4]">
                    Accept Payment
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayment;
