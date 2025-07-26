import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import Swal from "sweetalert2";

const ManagePayment = () => {
  const axiosApi = UseAxiosSecureAPI();
  const queryClient = useQueryClient();

  // Fetch payment statuses
  const { data: paymentStatuses = [], isLoading, isError } = useQuery({
    queryKey: ["paymentStatuses"],
    queryFn: async () => {
      const res = await axiosApi.get("/paymentStatus");
      return res.data;
    },
  });

  // Fetch acceptance statuses
  const { data: acceptanceStatuses = [] } = useQuery({
    queryKey: ["acceptanceStatuses"],
    queryFn: async () => {
      const res = await axiosApi.get("/acceptanceStatus");
      return res.data;
    },
  });
  console.log(paymentStatuses)
  console.log(acceptanceStatuses)

  // Mutation to accept payment
  const handleAcceptPayment = useMutation({
    mutationFn: async (id) => {
      const res = await axiosApi.patch(`/acceptanceStatus/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", data.message, "success");
      queryClient.invalidateQueries(["acceptanceStatuses"]);
    },
    onError: (error) => {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    },
  });

  // Format ISO date
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

  if (isLoading) return <p className="text-center text-xl">Loading...</p>;
  if (isError) return <p className="text-center text-red-600">Failed to load payment data.</p>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-bold text-[#080c3b]">Manage Payments</h2>
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra w-full border border-gray-300">
          <thead className="bg-[#DED3C4] text-[#080c3b] text-2xl text-center">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Payment Status</th>
              <th>Added On</th>
              {/* <th>Acceptance Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentStatuses.map((status, index) => {
              // Match email with acceptanceStatuses
              const acceptance = acceptanceStatuses.find(a => a.email === status.email);
              const acceptanceStatus = acceptance?.acceptance_status || "Pending";
              const id = acceptance?._id;
              // console.log(acceptance)
              // console.log(acceptanceStatus)
              // console.log(id)

              return (
                <tr key={status._id} className="text-[#080c3b] text-2xl text-center">
                  <td>{index + 1}</td>
                  <td>{status.email || "N/A"}</td>
                  <td className={status.payment_status === "Paid" ? "text-[#080c3b] font-extrabold" : "text-[#555879] font-extrabold"}>
                    {status.payment_status}
                  </td>
                  <td>{status.added_at ? formatDate(status.added_at) : "Not Paid Yet"}</td>
                  {/* <td className="font-bold">{acceptanceStatus}</td> */}
                  <td>
                    {acceptanceStatus === "Accepted" & status.payment_status === "Paid" ? (
                        <button
                        className="btn text-[#080c3b] text-xl font-bold bg-[#DED3C4] cursor-not-allowed"
                        disabled
                        >
                        Already Accepted
                        </button>
                    ) : status.payment_status === "Pending" ? (
                        <button
                        className="btn text-[#080c3b] text-xl font-bold bg-[#DED3C4] cursor-not-allowed"
                        disabled
                        >
                        Yet to be Paid
                        </button>
                    ) : (
                        <button
                        onClick={() => handleAcceptPayment.mutate(id)}
                        className="btn text-[#080c3b] text-xl font-bold bg-[#DED3C4]"
                        >
                        Accept Payment
                        </button>
                    )}
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayment;
