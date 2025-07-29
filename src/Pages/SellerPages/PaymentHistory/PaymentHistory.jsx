import React from 'react';
import { ReTitleProvider } from 're-title';
import UseAxiosSecureAPI from '../../../CustomHooks/UseAxiosSecureAPI';
import { useQuery } from '@tanstack/react-query';


const PaymentHistory = () => {
    const axiosApi = UseAxiosSecureAPI();

    // Fetch payment statuses
    const { data: paymentStatuses = []} = useQuery({
        queryKey: ["paymentStatuses"],
        queryFn: async () => {
        const res = await axiosApi.get("/paymentStatus");
        return res.data;
        },
    });

     // Fetch acceptance statuses
    // const { data: acceptanceStatuses = [] } = useQuery({
    //     queryKey: ["acceptanceStatuses"],
    //     queryFn: async () => {
    //     const res = await axiosApi.get("/acceptanceStatus");
    //     return res.data;
    //     },
    // });

    // Format ISO date
    const formateDate = (isoString) => {
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
        <ReTitleProvider defaultTitle='Payment History'>
                  <div className="mt-10 px-4 py-6">
        <h2 className="text-4xl font-bold text-[#080c3b]">Manage Payments</h2>
        <div className="overflow-x-auto mt-10">
          <table className="table table-zebra w-full border border-gray-300">
            <thead className="bg-[#DED3C4] text-[#080c3b] text-2xl text-center">
              <tr>
                <th>#</th>
                <th>Buyer Email</th>
                <th>Payment Status</th>
                <th>Added On</th>
              </tr>
            </thead>
            <tbody>
              {paymentStatuses.map((status, index) => {
                // Match email with acceptanceStatuses
                // const acceptance = acceptanceStatuses.find(a => a.email === status.email);
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
                    <td>{status.added_at ? formateDate(status.added_at) : "Not Paid Yet"}</td>
                    {/* <td className="font-bold">{acceptanceStatus}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
        </ReTitleProvider>
    );
};

export default PaymentHistory;