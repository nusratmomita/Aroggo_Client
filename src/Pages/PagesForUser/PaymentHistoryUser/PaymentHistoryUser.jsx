import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../../../Authentication/AuthContext";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import { ReTitleProvider } from "re-title";

const PaymentHistoryUser = () => {
  const { user } = useContext(AuthContext); 

  const axiosApi = UseAxiosSecureAPI();

  const { data: paymentHistory = [], isLoading, isError } = useQuery({
    queryKey: ["paymentHistoryUser", user?.email],
    queryFn: async () => {
      const res = await axiosApi.get(`/paymentHistoryUser/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only fetch when user is loaded
  });

  // to formate date
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

  // console.log(user)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-5">
        Failed to load payment history. Please try again.
      </div>
    );
  }

  return (
    <div>
      <ReTitleProvider defaultTitle="Payment History">
      <div className="p-4 mt-10">
        <h2 className="text-4xl font-bold text-[#080c3b] mb-6">
          {user?.displayName ? user?.displayName : "My"} Payment History
        </h2>
        {paymentHistory.length === 0 ? (
          <div className="text-center text-gray-500">No payment records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-10 table table-zebra w-full shadow-lg rounded-lg">
              <thead className="bg-[#DED3C4] text-[#080c3b] text-center text-2xl">
                <tr>
                  <th>#</th>
                  <th>Transaction ID</th>
                  <th>Amount (৳)</th>
                  <th>Status</th>
                  <th>Paid At</th>
                  <th>Admin Accepted</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((item, index) => (
                  <tr key={index} className="text-2xl text-center text-[#080c3b]">
                    <td>{index + 1}</td>
                    <td className="text-2xl break-all whitespace-nowrap">{item.transactionId}</td>
                    <td>৳{item.amount/100}</td>
                    <td>
                      <span
                        className={`px-10 py-1 rounded-full text-2xl font-semibold ${
                          item.paymentStatus === 'Paid' 
                                  ? 'bg-green-100 text-green-700 border border-green-400' 
                                  : 'bg-yellow-100 text-yellow-700 border border-yellow-400'
                        }`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className=" whitespace-nowrap">{formateDate(item.paidAt) || "N/A"}</td>
                    <td className="font-extrabold">
                    {item.acceptance_status === "Accepted" ? "Accepted" : "Pay first"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </ReTitleProvider>
    </div>
  );
};

export default PaymentHistoryUser;
